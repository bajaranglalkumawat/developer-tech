import type { UserDocument } from "../models/User";
import { RateLimit } from "../models/RateLimit";

export const SECURITY = {
  RESEND_COOLDOWN_SEC: 60,
  OTP_COOLDOWN_SEC: 60,
  MAX_VERIFICATION_ATTEMPTS: 5,
  MAX_FAILED_LOGINS: 5,
  MAX_RESEND_ABUSE: 10,
  LOCK_DURATION_MS: 30 * 60 * 1000,
  OTP_EXPIRES_MS: 12 * 60 * 1000,
} as const;

export type LockReason = "failed_login" | "failed_verification" | "resend_abuse" | "admin";

export function retryAfterSeconds(until: Date) {
  return Math.max(1, Math.ceil((until.getTime() - Date.now()) / 1000));
}

export function isAccountLocked(user: Pick<UserDocument, "lockedUntil">) {
  return Boolean(user.lockedUntil && user.lockedUntil > new Date());
}

export function accountLockResponse(user: Pick<UserDocument, "lockedUntil" | "lockReason">) {
  const retryAfterSec = user.lockedUntil ? retryAfterSeconds(user.lockedUntil) : 0;
  return {
    message: "Account is temporarily locked. Try again later or contact support.",
    code: "ACCOUNT_LOCKED" as const,
    lockReason: user.lockReason,
    retryAfterSec,
  };
}

export async function assertNotLocked(
  user: UserDocument,
  res: { status: (code: number) => { json: (body: unknown) => void } },
) {
  if (!isAccountLocked(user)) return true;

  res.status(423).json(accountLockResponse(user));
  return false;
}

export async function lockAccount(user: UserDocument, reason: LockReason) {
  user.lockedUntil = new Date(Date.now() + SECURITY.LOCK_DURATION_MS);
  user.lockReason = reason;
  await user.save();
}

export async function clearLockIfExpired(user: UserDocument) {
  if (user.lockedUntil && user.lockedUntil <= new Date()) {
    user.lockedUntil = undefined;
    user.lockReason = undefined;
    user.failedLoginCount = 0;
    user.failedVerificationCount = 0;
    user.resendAbuseCount = 0;
    await user.save();
  }
}

export async function recordFailedLogin(user: UserDocument) {
  await clearLockIfExpired(user);
  user.failedLoginCount = (user.failedLoginCount ?? 0) + 1;
  if (user.failedLoginCount >= SECURITY.MAX_FAILED_LOGINS) {
    await lockAccount(user, "failed_login");
    return;
  }
  await user.save();
}

export async function clearFailedLogin(user: UserDocument) {
  if (user.failedLoginCount) {
    user.failedLoginCount = 0;
    await user.save();
  }
}

export async function recordFailedVerification(user: UserDocument) {
  await clearLockIfExpired(user);
  user.failedVerificationCount = (user.failedVerificationCount ?? 0) + 1;
  if (user.failedVerificationCount >= SECURITY.MAX_VERIFICATION_ATTEMPTS) {
    user.emailVerificationTokenHash = undefined;
    user.emailVerificationExpires = undefined;
    user.emailVerificationAttemptCount = 0;
    await lockAccount(user, "failed_verification");
    return;
  }
  await user.save();
}

export async function resetVerificationAttempts(user: UserDocument) {
  user.failedVerificationCount = 0;
  user.emailVerificationAttemptCount = 0;
}

export function cooldownRetryAfterSec(until: Date | undefined) {
  if (!until || until <= new Date()) return null;
  return retryAfterSeconds(until);
}

export async function checkCooldown(
  until: Date | undefined,
  code: string,
  res: { status: (code: number) => { json: (body: unknown) => void } },
) {
  const retryAfterSec = cooldownRetryAfterSec(until);
  if (retryAfterSec === null) return true;

  res.status(429).json({
    message: `Please wait ${retryAfterSec} seconds before trying again.`,
    code,
    retryAfterSec,
  });
  return false;
}

export async function setUserCooldown(
  user: UserDocument,
  field: "resendVerificationAvailableAt" | "passwordResetAvailableAt",
  seconds: number,
) {
  user[field] = new Date(Date.now() + seconds * 1000);
  await user.save();
}

export async function rateLimitRetryAfterSec(key: string, action: string) {
  const existing = await RateLimit.findOne({ key, action });
  if (existing && existing.until > new Date()) {
    return retryAfterSeconds(existing.until);
  }
  return null;
}

export async function applyRateLimitKey(key: string, action: string, cooldownSec: number) {
  const until = new Date(Date.now() + cooldownSec * 1000);
  await RateLimit.findOneAndUpdate(
    { key, action },
    { until },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
}

export async function assertRateLimitKey(
  key: string,
  action: string,
  res: { status: (code: number) => { json: (body: unknown) => void } },
  errorCode: string,
) {
  const retryAfterSec = await rateLimitRetryAfterSec(key, action);
  if (retryAfterSec !== null) {
    res.status(429).json({
      message: `Please wait ${retryAfterSec} seconds before trying again.`,
      code: errorCode,
      retryAfterSec,
    });
    return false;
  }

  return true;
}

/** @deprecated Prefer assertRateLimitKey + applyRateLimitKey after a successful send. */
export async function checkRateLimitKey(
  key: string,
  action: string,
  cooldownSec: number,
  res: { status: (code: number) => { json: (body: unknown) => void } },
  errorCode: string,
) {
  if (!(await assertRateLimitKey(key, action, res, errorCode))) {
    return false;
  }

  await applyRateLimitKey(key, action, cooldownSec);
  return true;
}

export function clientIp(req: { ip?: string; headers: Record<string, unknown> }) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0]?.trim() ?? req.ip ?? "unknown";
  }
  return req.ip ?? "unknown";
}

export async function recordResendAbuse(user: UserDocument) {
  user.resendAbuseCount = (user.resendAbuseCount ?? 0) + 1;
  if (user.resendAbuseCount >= SECURITY.MAX_RESEND_ABUSE) {
    await lockAccount(user, "resend_abuse");
    return;
  }
  await user.save();
}
