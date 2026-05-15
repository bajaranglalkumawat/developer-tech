import { OAuth2Client } from "google-auth-library";
import { env } from "../config/env";

let client: OAuth2Client | null = null;

function getClient() {
  if (!env.GOOGLE_CLIENT_ID) return null;
  if (!client) {
    client = new OAuth2Client(env.GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_SECRET);
  }
  return client;
}

export async function verifyGoogleIdToken(idToken: string) {
  const oauth = getClient();
  if (!oauth || !env.GOOGLE_CLIENT_ID) {
    return { ok: false as const, error: "Google sign-in is not configured" };
  }

  try {
    const ticket = await oauth.verifyIdToken({
      idToken,
      audience: env.GOOGLE_CLIENT_ID,
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
  } catch {
    return { ok: false as const, error: "Invalid Google token" };
  }
}
