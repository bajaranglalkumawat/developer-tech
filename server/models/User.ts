import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import type { LockReason } from "../utils/account-security";

export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  status: "active" | "disabled";
  authProvider?: "local" | "google";
  googleId?: string;
  emailVerified?: boolean;
  emailVerificationTokenHash?: string;
  emailVerificationExpires?: Date;
  emailVerificationAttemptCount?: number;
  failedLoginCount?: number;
  failedVerificationCount?: number;
  resendAbuseCount?: number;
  resendVerificationAvailableAt?: Date;
  passwordResetOtpHash?: string;
  passwordResetOtpExpires?: Date;
  passwordResetAvailableAt?: Date;
  lockedUntil?: Date;
  lockReason?: LockReason;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    status: { type: String, enum: ["active", "disabled"], default: "active" },
    authProvider: { type: String, enum: ["local", "google"], default: "local" },
    googleId: { type: String, sparse: true, unique: true },
    emailVerified: { type: Boolean, default: false },
    emailVerificationTokenHash: { type: String },
    emailVerificationExpires: { type: Date },
    emailVerificationAttemptCount: { type: Number, default: 0 },
    failedLoginCount: { type: Number, default: 0 },
    failedVerificationCount: { type: Number, default: 0 },
    resendAbuseCount: { type: Number, default: 0 },
    resendVerificationAvailableAt: { type: Date },
    passwordResetOtpHash: { type: String },
    passwordResetOtpExpires: { type: Date },
    passwordResetAvailableAt: { type: Date },
    lockedUntil: { type: Date },
    lockReason: {
      type: String,
      enum: ["failed_login", "failed_verification", "resend_abuse", "admin"],
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function comparePassword(password: string) {
  return bcrypt.compare(password, this.password);
};

export const User =
  (mongoose.models.User as mongoose.Model<UserDocument>) ||
  mongoose.model<UserDocument>("User", userSchema);
