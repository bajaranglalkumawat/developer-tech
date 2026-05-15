import { createHash, randomBytes } from "node:crypto";

export function createVerificationToken() {
  const raw = randomBytes(32).toString("hex");
  const hash = hashVerificationToken(raw);
  return { raw, hash };
}

export function hashVerificationToken(raw: string) {
  return createHash("sha256").update(raw).digest("hex");
}
