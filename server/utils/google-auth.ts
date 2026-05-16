import { OAuth2Client } from "google-auth-library";
import { env } from "../config/env";

let client: OAuth2Client | null = null;
let clientIdForInstance: string | undefined;

export function getGoogleClientId(): string {
  return env.GOOGLE_CLIENT_ID?.trim() ?? "";
}

function getClient() {
  const clientId = getGoogleClientId();
  if (!clientId) return null;
  if (!client || clientIdForInstance !== clientId) {
    client = new OAuth2Client(clientId);
    clientIdForInstance = clientId;
  }
  return client;
}

function mapVerifyError(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  const lower = message.toLowerCase();

  if (lower.includes("audience") || lower.includes("recipient")) {
    return "Google sign-in could not be verified (client ID mismatch). Try again or use email and password.";
  }
  if (lower.includes("expired") || lower.includes("too late")) {
    return "Google sign-in expired. Please try again.";
  }
  if (lower.includes("used too early")) {
    return "Google sign-in is not valid yet. Check your device clock and try again.";
  }

  if (env.NODE_ENV === "development") {
    return `Invalid Google token: ${message}`;
  }
  return "Could not verify Google sign-in. Try again or use email and password.";
}

export async function verifyGoogleIdToken(idToken: string) {
  const clientId = getGoogleClientId();
  const oauth = getClient();
  if (!oauth || !clientId) {
    return { ok: false as const, error: "Google sign-in is not configured on the server" };
  }

  try {
    const ticket = await oauth.verifyIdToken({
      idToken,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    if (!payload?.sub || !payload.email) {
      return { ok: false as const, error: "Invalid Google token" };
    }

    return {
      ok: true as const,
      googleId: payload.sub,
      email: payload.email.toLowerCase(),
      name: payload.name ?? payload.email.split("@")[0] ?? "User",
      emailVerifiedByGoogle: payload.email_verified === true,
    };
  } catch (error) {
    return { ok: false as const, error: mapVerifyError(error) };
  }
}
