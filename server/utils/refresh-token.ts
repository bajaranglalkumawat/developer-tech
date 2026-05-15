import { createHash, randomBytes } from "node:crypto";
import type { Response } from "express";
import { RefreshToken } from "../models/RefreshToken";
import { User } from "../models/User";
import { env } from "../config/env";
import { signAccessToken } from "./jwt";

export const REFRESH_COOKIE_NAME = "dt_refresh";

const REFRESH_MS = parseDurationMs(env.JWT_REFRESH_EXPIRES_IN, 30 * 24 * 60 * 60 * 1000);

function parseDurationMs(value: string, fallback: number) {
  const match = /^(\d+)([smhd])$/.exec(value.trim());
  if (!match) return fallback;
  const amount = Number(match[1]);
  const unit = match[2];
  const multipliers: Record<string, number> = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };
  return amount * (multipliers[unit] ?? 1000);
}

export function hashRefreshToken(raw: string) {
  return createHash("sha256").update(raw).digest("hex");
}

export function createRefreshTokenRaw() {
  return randomBytes(48).toString("hex");
}

export function setRefreshCookie(res: Response, rawToken: string) {
  res.cookie(REFRESH_COOKIE_NAME, rawToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/user-auth",
    maxAge: REFRESH_MS,
  });
}

export function clearRefreshCookie(res: Response) {
  res.clearCookie(REFRESH_COOKIE_NAME, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/user-auth",
  });
}

export async function issueAuthTokens(
  res: Response,
  user: { _id: unknown; email: string },
) {
  const rawRefresh = createRefreshTokenRaw();
  const tokenHash = hashRefreshToken(rawRefresh);
  const expiresAt = new Date(Date.now() + REFRESH_MS);

  await RefreshToken.create({
    userId: user._id,
    tokenHash,
    expiresAt,
  });

  setRefreshCookie(res, rawRefresh);

  const accessToken = signAccessToken({
    userId: String(user._id),
    email: user.email,
    role: "user",
  });

  return { accessToken, token: accessToken };
}

export async function rotateRefreshToken(res: Response, rawToken: string) {
  const tokenHash = hashRefreshToken(rawToken);
  const existing = await RefreshToken.findOne({
    tokenHash,
    revokedAt: { $exists: false },
    expiresAt: { $gt: new Date() },
  });

  if (!existing) return null;

  const user = await User.findById(existing.userId);
  if (!user) return null;

  existing.revokedAt = new Date();
  await existing.save();

  const tokens = await issueAuthTokens(res, user);
  return { tokens, user };
}

export async function revokeRefreshToken(rawToken: string) {
  const tokenHash = hashRefreshToken(rawToken);
  await RefreshToken.updateOne(
    { tokenHash, revokedAt: { $exists: false } },
    { revokedAt: new Date() },
  );
}
