import { env } from "../config/env";

export type SendEmailResult = { ok: true } | { ok: false; error: string };

type SendEmailOptions = {
  toEmail: string;
  toName: string;
  subject: string;
  textContent: string;
};

function isDevEnvironment() {
  return env.NODE_ENV !== "production";
}

function isBrevoConfigured() {
  return Boolean(process.env.BREVO_API_KEY?.trim() && process.env.BREVO_SENDER_EMAIL?.trim());
}

function logDevVerificationLink(verifyUrl: string, reason: string) {
  console.info(`[email] ${reason}`);
  console.info(verifyUrl);
}

function logSignupOtp(toEmail: string, otp: string, reason?: string) {
  const detail = reason ? `${reason} — signup OTP for ${toEmail}: ${otp}` : `signup OTP for ${toEmail}: ${otp}`;
  console.info(`[email] ${detail}`);
}

export async function sendBrevoEmail(options: SendEmailOptions): Promise<SendEmailResult> {
  const apiKey = process.env.BREVO_API_KEY?.trim();
  const senderEmail = process.env.BREVO_SENDER_EMAIL?.trim();
  const senderName = process.env.BREVO_SENDER_NAME?.trim() || "Developer Tech";

  if (!apiKey || !senderEmail) {
    return {
      ok: false,
      error: "BREVO_API_KEY and BREVO_SENDER_EMAIL must be configured on the server.",
    };
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { email: senderEmail, name: senderName },
        to: [{ email: options.toEmail, name: options.toName }],
        subject: options.subject,
        textContent: options.textContent,
        htmlContent: options.textContent.replace(/\n/g, "<br>"),
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return { ok: false, error: `Brevo API failed (${response.status}): ${errorBody}` };
    }
  } catch (error) {
    return {
      ok: false,
      error: `Brevo request failed: ${error instanceof Error ? error.message : "unknown error"}`,
    };
  }

  return { ok: true };
}

export async function sendVerificationEmail(params: {
  toEmail: string;
  toName: string;
  verifyUrl: string;
}): Promise<SendEmailResult> {
  if (!isBrevoConfigured()) {
    logDevVerificationLink(
      params.verifyUrl,
      `Brevo not configured — verification link for ${params.toEmail}:`,
    );
    if (isDevEnvironment()) {
      return { ok: true };
    }
    return {
      ok: false,
      error: "Email service is not configured (BREVO_API_KEY, BREVO_SENDER_EMAIL).",
    };
  }

  const result = await sendBrevoEmail({
    toEmail: params.toEmail,
    toName: params.toName,
    subject: "Verify your Developer Tech account",
    textContent: `Hi ${params.toName},

Thanks for signing up. Please verify your email address by opening this link:

${params.verifyUrl}

This link expires in 24 hours. If you did not create an account, you can ignore this email.

Regards,
Developer Tech`,
  });

  if (result.ok === false) {
    logDevVerificationLink(
      params.verifyUrl,
      `Verification email not sent via Brevo (${result.error}). Use this link to verify:`,
    );
    if (isDevEnvironment()) {
      return { ok: true };
    }
    console.error("[email] Verification email failed:", result.error);
    return result;
  }

  return result;
}

export async function sendPasswordResetOtpEmail(params: {
  toEmail: string;
  toName: string;
  otp: string;
}): Promise<SendEmailResult> {
  if (!isBrevoConfigured()) {
    console.info(
      `[email] Brevo not configured — password reset OTP for ${params.toEmail}: ${params.otp}`,
    );
    if (isDevEnvironment()) {
      return { ok: true };
    }
    return {
      ok: false,
      error: "Email service is not configured (BREVO_API_KEY, BREVO_SENDER_EMAIL).",
    };
  }

  const result = await sendBrevoEmail({
    toEmail: params.toEmail,
    toName: params.toName,
    subject: "Your Developer Tech password reset code",
    textContent: `Hi ${params.toName},

Your password reset code is: ${params.otp}

This code expires in 12 minutes. If you did not request a reset, you can ignore this email.

Regards,
Developer Tech`,
  });

  if (result.ok === false) {
    console.info(`[email] Password reset OTP not sent via Brevo. Use this code: ${params.otp}`);
    if (isDevEnvironment()) {
      return { ok: true };
    }
    return result;
  }

  return result;
}

export async function sendSignupOtpEmail(params: {
  toEmail: string;
  toName: string;
  otp: string;
}): Promise<SendEmailResult> {
  if (!isBrevoConfigured()) {
    logSignupOtp(params.toEmail, params.otp, "Brevo not configured");
    if (isDevEnvironment()) {
      return { ok: true };
    }
    return {
      ok: false,
      error: "Email service is not configured (BREVO_API_KEY, BREVO_SENDER_EMAIL).",
    };
  }

  const result = await sendBrevoEmail({
    toEmail: params.toEmail,
    toName: params.toName,
    subject: "Your Developer Tech signup code",
    textContent: `Hi ${params.toName},

Your email verification code is: ${params.otp}

This code expires in 12 minutes. If you did not start creating an account, you can ignore this email.

Regards,
Developer Tech`,
  });

  if (result.ok === false) {
    logSignupOtp(params.toEmail, params.otp, `Brevo send failed (${result.error})`);
    if (isDevEnvironment()) {
      return { ok: true };
    }
    console.error("[email] Signup OTP email failed:", result.error);
    return result;
  }

  if (isDevEnvironment()) {
    logSignupOtp(params.toEmail, params.otp, "sent via Brevo (dev copy)");
  }

  return result;
}
