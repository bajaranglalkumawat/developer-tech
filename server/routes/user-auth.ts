import { Router } from "express";
import { randomBytes } from "node:crypto";
import { User, type UserDocument } from "../models/User";
import { PendingSignup } from "../models/PendingSignup";
import { requireAuth } from "../middleware/auth";
import { validateBody, z } from "../middleware/validate";
import { env } from "../config/env";
import { isDisposableEmail } from "../utils/disposable-email";
import { createVerificationToken, hashVerificationToken } from "../utils/verification";
import {
  sendVerificationEmail,
  sendPasswordResetOtpEmail,
  sendSignupOtpEmail,
} from "../utils/email";
import { createOtpCode, hashOtp } from "../utils/otp";
import { verifyGoogleIdToken } from "../utils/google-auth";
import type { Request } from "express";
import {
  SECURITY,
  assertNotLocked,
  applyRateLimitKey,
  assertRateLimitKey,
  checkCooldown,
  clearFailedLogin,
  clientIp,
  accountLockResponse,
  cooldownRetryAfterSec,
  isAccountLocked,
  clearLockIfExpired,
  rateLimitRetryAfterSec,
  recordFailedLogin,
  recordFailedVerification,
  recordResendAbuse,
  resetVerificationAttempts,
  setUserCooldown,
} from "../utils/account-security";
import {
  clearRefreshCookie,
  issueAuthTokens,
  REFRESH_COOKIE_NAME,
  revokeRefreshToken,
  rotateRefreshToken,
} from "../utils/refresh-token";

const router = Router();

const VERIFICATION_EXPIRES_MS = 24 * 60 * 60 * 1000;

const registerSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const resendSchema = z.object({
  email: z.string().email(),
});

const emailSchema = z.object({
  email: z.string().email(),
});

const resetPasswordSchema = z.object({
  email: z.string().email(),
  otp: z.string().regex(/^\d{6}$/, "OTP must be 6 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const googleSchema = z.object({
  idToken: z.string().min(10),
});

const signupVerifySchema = z.object({
  email: z.string().email(),
  otp: z.string().regex(/^\d{6}$/, "OTP must be 6 digits"),
});

function userResponse(user: {
  _id: unknown;
  email: string;
  name: string;
  status: string;
  emailVerified?: boolean;
}) {
  return {
    id: String(user._id),
    email: user.email,
    name: user.name,
    status: user.status,
    emailVerified: user.emailVerified === true,
  };
}

async function issueVerificationEmail(user: { _id: unknown; email: string; name: string }) {
  const { raw, hash } = createVerificationToken();
  const expires = new Date(Date.now() + VERIFICATION_EXPIRES_MS);

  await User.updateOne(
    { _id: user._id },
    {
      emailVerificationTokenHash: hash,
      emailVerificationExpires: expires,
      emailVerificationAttemptCount: 0,
      failedVerificationCount: 0,
    },
  );

  const verifyUrl = `${env.SITE_URL}/verify-email?token=${raw}`;
  return sendVerificationEmail({
    toEmail: user.email,
    toName: user.name,
    verifyUrl,
  });
}

type ResendVerificationResult =
  | { sent: true }
  | { sent: false; reason: "locked" }
  | { sent: false; reason: "cooldown"; retryAfterSec: number }
  | { sent: false; reason: "rate_limited"; retryAfterSec: number }
  | { sent: false; reason: "send_failed"; error: string };

async function tryResendVerificationForUser(
  user: UserDocument,
  req: Request,
): Promise<ResendVerificationResult> {

  await clearLockIfExpired(user);
  if (isAccountLocked(user)) {
    return { sent: false, reason: "locked" };
  }

  const userCooldownSec = cooldownRetryAfterSec(user.resendVerificationAvailableAt);
  if (userCooldownSec !== null) {
    return { sent: false, reason: "cooldown", retryAfterSec: userCooldownSec };
  }

  const ip = clientIp(req);
  const ipKey = `resend-ip:${ip}`;
  const ipCooldownSec = await rateLimitRetryAfterSec(ipKey, "resend-verification");
  if (ipCooldownSec !== null) {
    return { sent: false, reason: "rate_limited", retryAfterSec: ipCooldownSec };
  }

  const emailResult = await issueVerificationEmail(user);
  if (emailResult.ok === false) {
    return { sent: false, reason: "send_failed", error: emailResult.error };
  }

  await applyRateLimitKey(ipKey, "resend-verification", SECURITY.RESEND_COOLDOWN_SEC);
  await setUserCooldown(user, "resendVerificationAvailableAt", SECURITY.RESEND_COOLDOWN_SEC);
  await recordResendAbuse(user);

  return { sent: true };
}

function buildEmailNotVerifiedBody(user: { email: string }, resend: ResendVerificationResult) {
  let message =
    "Please verify your email before signing in. Check your inbox or resend the verification link.";
  let verificationEmailSent = false;
  let retryAfterSec: number | undefined;
  let sendError: string | undefined;

  if (resend.sent === true) {
    message =
      "Your email is not verified yet. We sent a new verification link — check your inbox (and spam folder).";
    verificationEmailSent = true;
  } else if (resend.sent === false && resend.reason === "send_failed") {
    message =
      "Please verify your email. We could not send a verification email right now — use Resend below or try again shortly.";
    if (env.NODE_ENV === "development") {
      sendError = resend.error;
    }
  } else if (
    resend.sent === false &&
    (resend.reason === "cooldown" || resend.reason === "rate_limited")
  ) {
    retryAfterSec = resend.retryAfterSec;
    message = `Please verify your email before signing in. You can request a new link in ${retryAfterSec} seconds.`;
  }

  return {
    message,
    code: "EMAIL_NOT_VERIFIED" as const,
    email: user.email,
    verificationEmailSent,
    retryAfterSec,
    sendError,
  };
}

router.post("/signup/send-otp", validateBody(registerSchema), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = email.toLowerCase();
    const ip = clientIp(req);

    if (isDisposableEmail(normalizedEmail)) {
      res.status(400).json({
        message: "Please use a permanent email address. Temporary or disposable emails are not allowed.",
        code: "DISPOSABLE_EMAIL",
      });
      return;
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser?.emailVerified === true) {
      res.status(409).json({ message: "Account already exists", code: "ACCOUNT_EXISTS" });
      return;
    }

    if (existingUser) {
      await User.deleteOne({ _id: existingUser._id });
    }

    const ipKey = `signup-otp-ip:${ip}`;
    if (!(await assertRateLimitKey(ipKey, "signup-send-otp", res, "OTP_COOLDOWN"))) {
      return;
    }

    const pending = await PendingSignup.findOne({ email: normalizedEmail });
    if (pending && !(await checkCooldown(pending.otpResendAvailableAt, "OTP_COOLDOWN", res))) {
      return;
    }

    const otp = createOtpCode();
    const otpHash = hashOtp(otp);
    const otpExpires = new Date(Date.now() + SECURITY.OTP_EXPIRES_MS);
    const resendAvailableAt = new Date(Date.now() + SECURITY.OTP_COOLDOWN_SEC * 1000);

    const emailResult = await sendSignupOtpEmail({
      toEmail: normalizedEmail,
      toName: name,
      otp,
    });

    if (emailResult.ok === false) {
      res.status(502).json({
        message: "Could not send verification code. Please try again later.",
        code: "EMAIL_SEND_FAILED",
        ...(env.NODE_ENV === "development" ? { sendError: emailResult.error } : {}),
      });
      return;
    }

    await PendingSignup.findOneAndUpdate(
      { email: normalizedEmail },
      {
        email: normalizedEmail,
        name,
        password,
        otpHash,
        otpExpires,
        otpAttemptCount: 0,
        otpResendAvailableAt: resendAvailableAt,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    await applyRateLimitKey(ipKey, "signup-send-otp", SECURITY.OTP_COOLDOWN_SEC);

    res.json({
      message: "Verification code sent. Check your inbox.",
      email: normalizedEmail,
      retryAfterSec: SECURITY.OTP_COOLDOWN_SEC,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/signup/verify-and-register", validateBody(signupVerifySchema), async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const normalizedEmail = email.toLowerCase();
    const pending = await PendingSignup.findOne({ email: normalizedEmail });

    if (!pending) {
      res.status(400).json({
        message: "Invalid or expired verification code. Start signup again.",
        code: "OTP_INVALID",
      });
      return;
    }

    const otpHash = hashOtp(otp);
    const otpValid =
      pending.otpHash &&
      pending.otpHash === otpHash &&
      pending.otpExpires &&
      pending.otpExpires > new Date();

    if (!otpValid) {
      pending.otpAttemptCount = (pending.otpAttemptCount ?? 0) + 1;

      if (pending.otpAttemptCount >= SECURITY.MAX_VERIFICATION_ATTEMPTS) {
        await PendingSignup.deleteOne({ _id: pending._id });
        res.status(400).json({
          message: "Too many failed attempts. Start signup again and request a new code.",
          code: "OTP_MAX_ATTEMPTS",
        });
        return;
      }

      await pending.save();
      res.status(400).json({
        message: "Invalid or expired verification code",
        code: "OTP_INVALID",
      });
      return;
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser?.emailVerified === true) {
      await PendingSignup.deleteOne({ _id: pending._id });
      res.status(409).json({ message: "Account already exists", code: "ACCOUNT_EXISTS" });
      return;
    }

    if (existingUser) {
      await User.deleteOne({ _id: existingUser._id });
    }

    const user = await User.create({
      name: pending.name,
      email: normalizedEmail,
      password: pending.password,
      authProvider: "local",
      emailVerified: true,
    });

    await PendingSignup.deleteOne({ _id: pending._id });

    const tokens = await issueAuthTokens(res, user);
    res.status(201).json({
      message: "Account created successfully",
      accessToken: tokens.accessToken,
      token: tokens.accessToken,
      user: userResponse(user),
    });
  } catch (error) {
    next(error);
  }
});

router.get("/verify-email", async (req, res, next) => {
  try {
    const token = typeof req.query.token === "string" ? req.query.token.trim() : "";

    if (!token) {
      res.status(400).json({
        message: "Verification token is required",
        verified: false,
        code: "TOKEN_REQUIRED",
      });
      return;
    }

    const tokenHash = hashVerificationToken(token);
    const user = await User.findOne({ emailVerificationTokenHash: tokenHash });

    if (!user) {
      res.status(400).json({
        message: "Invalid or expired verification link. Request a new one from the login page.",
        verified: false,
        code: "TOKEN_INVALID",
      });
      return;
    }

    await clearLockIfExpired(user);
    if (!(await assertNotLocked(user, res))) return;

    const expired =
      !user.emailVerificationExpires || user.emailVerificationExpires <= new Date();

    if (expired) {
      user.emailVerificationAttemptCount = (user.emailVerificationAttemptCount ?? 0) + 1;

      if (user.emailVerificationAttemptCount >= SECURITY.MAX_VERIFICATION_ATTEMPTS) {
        user.emailVerificationTokenHash = undefined;
        user.emailVerificationExpires = undefined;
        user.emailVerificationAttemptCount = 0;
        await recordFailedVerification(user);
        res.status(400).json({
          message:
            "Too many failed attempts. Request a new verification email from the login page.",
          verified: false,
          code: "VERIFICATION_MAX_ATTEMPTS",
        });
        return;
      }

      await user.save();
      res.status(400).json({
        message: "Invalid or expired verification link. Request a new one from the login page.",
        verified: false,
        code: "TOKEN_INVALID",
      });
      return;
    }

    user.emailVerified = true;
    user.emailVerificationTokenHash = undefined;
    user.emailVerificationExpires = undefined;
    user.emailVerificationAttemptCount = 0;
    await resetVerificationAttempts(user);
    await user.save();

    res.json({
      message: "Email verified successfully. You can now sign in.",
      verified: true,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/resend-verification", validateBody(resendSchema), async (req, res, next) => {
  try {
    const normalizedEmail = req.body.email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user || user.emailVerified) {
      res.json({
        message: "If an unverified account exists for this email, a verification link has been sent.",
      });
      return;
    }

    const resend = await tryResendVerificationForUser(user, req);

    if (resend.sent === false && resend.reason === "locked") {
      res.status(423).json(accountLockResponse(user));
      return;
    }

    if (
      resend.sent === false &&
      (resend.reason === "cooldown" || resend.reason === "rate_limited")
    ) {
      res.status(429).json({
        message: `Please wait ${resend.retryAfterSec} seconds before trying again.`,
        code: "RESEND_COOLDOWN",
        retryAfterSec: resend.retryAfterSec,
      });
      return;
    }

    if (resend.sent === false && resend.reason === "send_failed") {
      res.status(502).json({
        message: "Could not send verification email. Please try again later.",
        code: "EMAIL_SEND_FAILED",
        ...(env.NODE_ENV === "development" ? { sendError: resend.error } : {}),
      });
      return;
    }

    res.json({
      message: "Verification email sent. Please check your inbox (and spam folder).",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/forgot-password", validateBody(emailSchema), async (req, res, next) => {
  try {
    const normalizedEmail = req.body.email.toLowerCase();
    const ip = clientIp(req);

    const ipKey = `otp-ip:${ip}`;
    if (!(await assertRateLimitKey(ipKey, "forgot-password", res, "OTP_COOLDOWN"))) {
      return;
    }

    const user = await User.findOne({ email: normalizedEmail });

    if (!user || user.authProvider === "google") {
      res.json({
        message: "If an account exists for this email, a reset code has been sent.",
      });
      return;
    }

    await clearLockIfExpired(user);
    if (isAccountLocked(user)) {
      res.status(423).json(accountLockResponse(user));
      return;
    }

    if (!(await checkCooldown(user.passwordResetAvailableAt, "OTP_COOLDOWN", res))) {
      return;
    }

    const otp = createOtpCode();

    const emailResult = await sendPasswordResetOtpEmail({
      toEmail: user.email,
      toName: user.name,
      otp,
    });

    if (emailResult.ok === false) {
      res.status(502).json({
        message: "Could not send reset code. Please try again later.",
        code: "EMAIL_SEND_FAILED",
        ...(env.NODE_ENV === "development" ? { sendError: emailResult.error } : {}),
      });
      return;
    }

    user.passwordResetOtpHash = hashOtp(otp);
    user.passwordResetOtpExpires = new Date(Date.now() + SECURITY.OTP_EXPIRES_MS);
    await user.save();

    await applyRateLimitKey(ipKey, "forgot-password", SECURITY.OTP_COOLDOWN_SEC);
    await setUserCooldown(user, "passwordResetAvailableAt", SECURITY.OTP_COOLDOWN_SEC);

    res.json({
      message: "If an account exists for this email, a reset code has been sent.",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/reset-password", validateBody(resetPasswordSchema), async (req, res, next) => {
  try {
    const { email, otp, password } = req.body;
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user || user.authProvider === "google") {
      res.status(400).json({ message: "Invalid or expired reset code", code: "OTP_INVALID" });
      return;
    }

    await clearLockIfExpired(user);
    if (!(await assertNotLocked(user, res))) return;

    const otpHash = hashOtp(otp);
    if (
      !user.passwordResetOtpHash ||
      user.passwordResetOtpHash !== otpHash ||
      !user.passwordResetOtpExpires ||
      user.passwordResetOtpExpires <= new Date()
    ) {
      res.status(400).json({ message: "Invalid or expired reset code", code: "OTP_INVALID" });
      return;
    }

    user.password = password;
    user.passwordResetOtpHash = undefined;
    user.passwordResetOtpExpires = undefined;
    user.failedLoginCount = 0;
    await user.save();

    const tokens = await issueAuthTokens(res, user);
    res.json({
      message: "Password updated successfully",
      accessToken: tokens.accessToken,
      token: tokens.accessToken,
      user: userResponse(user),
    });
  } catch (error) {
    next(error);
  }
});

router.post("/google", validateBody(googleSchema), async (req, res, next) => {
  try {
    const verified = await verifyGoogleIdToken(req.body.idToken);
    if (!verified.ok) {
      res.status(400).json({ message: verified.error, code: "GOOGLE_AUTH_FAILED" });
      return;
    }

    let user = await User.findOne({
      $or: [{ googleId: verified.googleId }, { email: verified.email }],
    });

    if (user) {
      await clearLockIfExpired(user);
      if (!(await assertNotLocked(user, res))) return;

      if (user.status !== "active") {
        res.status(403).json({ message: "Account is disabled", code: "ACCOUNT_DISABLED" });
        return;
      }

      if (user.googleId && user.googleId !== verified.googleId) {
        res.status(409).json({
          message: "This email is linked to a different Google account.",
          code: "GOOGLE_ACCOUNT_MISMATCH",
        });
        return;
      }

      if (!user.googleId) {
        user.googleId = verified.googleId;
      }

      if (verified.emailVerifiedByGoogle) {
        user.emailVerified = true;
        user.emailVerificationTokenHash = undefined;
        user.emailVerificationExpires = undefined;
      }

      await clearFailedLogin(user);
      await user.save();
    } else {
      if (isDisposableEmail(verified.email)) {
        res.status(400).json({
          message: "Please use a permanent email address. Temporary or disposable emails are not allowed.",
          code: "DISPOSABLE_EMAIL",
        });
        return;
      }

      user = await User.create({
        email: verified.email,
        name: verified.name,
        password: randomBytes(32).toString("hex"),
        authProvider: "google",
        googleId: verified.googleId,
        emailVerified: verified.emailVerifiedByGoogle,
        status: "active",
      });
    }

    const tokens = await issueAuthTokens(res, user);
    res.json({
      accessToken: tokens.accessToken,
      token: tokens.accessToken,
      user: userResponse(user),
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", validateBody(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      res.status(401).json({ message: "Invalid credentials", code: "INVALID_CREDENTIALS" });
      return;
    }

    await clearLockIfExpired(user);
    if (isAccountLocked(user)) {
      res.status(423).json(accountLockResponse(user));
      return;
    }

    if (!(await user.comparePassword(password))) {
      await recordFailedLogin(user);
      if (isAccountLocked(user)) {
        res.status(423).json(accountLockResponse(user));
        return;
      }
      res.status(401).json({ message: "Invalid credentials", code: "INVALID_CREDENTIALS" });
      return;
    }

    if (user.status !== "active") {
      res.status(403).json({ message: "Account is disabled", code: "ACCOUNT_DISABLED" });
      return;
    }

    if (!user.emailVerified) {
      const resend = await tryResendVerificationForUser(user, req);

      if (resend.sent === false && resend.reason === "locked") {
        res.status(423).json(accountLockResponse(user));
        return;
      }

      res.status(403).json(buildEmailNotVerifiedBody(user, resend));
      return;
    }

    await clearFailedLogin(user);
    const tokens = await issueAuthTokens(res, user);
    res.json({
      accessToken: tokens.accessToken,
      token: tokens.accessToken,
      user: userResponse(user),
    });
  } catch (error) {
    next(error);
  }
});

router.post("/refresh", async (req, res, next) => {
  try {
    const rawToken = req.cookies?.[REFRESH_COOKIE_NAME];
    if (!rawToken || typeof rawToken !== "string") {
      res.status(401).json({ message: "Refresh token required", code: "REFRESH_REQUIRED" });
      return;
    }

    const rotated = await rotateRefreshToken(res, rawToken);
    if (!rotated) {
      clearRefreshCookie(res);
      res.status(401).json({ message: "Invalid or expired refresh token", code: "REFRESH_INVALID" });
      return;
    }

    const { user, tokens } = rotated;
    await clearLockIfExpired(user);

    if (user.status !== "active") {
      clearRefreshCookie(res);
      res.status(403).json({ message: "Account is disabled", code: "ACCOUNT_DISABLED" });
      return;
    }

    if (isAccountLocked(user)) {
      clearRefreshCookie(res);
      res.status(423).json(accountLockResponse(user));
      return;
    }

    res.json({
      accessToken: tokens.accessToken,
      token: tokens.accessToken,
      user: userResponse(user),
    });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", async (req, res, next) => {
  try {
    const rawToken = req.cookies?.[REFRESH_COOKIE_NAME];
    if (rawToken && typeof rawToken === "string") {
      await revokeRefreshToken(rawToken);
    }
    clearRefreshCookie(res);
    res.json({ message: "Logged out" });
  } catch (error) {
    next(error);
  }
});

router.get("/me", requireAuth, async (req, res, next) => {
  try {
    if (req.user?.role !== "user") {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    await clearLockIfExpired(user);
    if (isAccountLocked(user)) {
      res.status(423).json(accountLockResponse(user));
      return;
    }

    res.json({ user: userResponse(user) });
  } catch (error) {
    next(error);
  }
});

export default router;
