import mongoose, { Schema } from "mongoose";

export interface PendingSignupDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  otpHash?: string;
  otpExpires?: Date;
  otpAttemptCount?: number;
  otpResendAvailableAt?: Date;
}

const pendingSignupSchema = new Schema<PendingSignupDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    otpHash: { type: String },
    otpExpires: { type: Date },
    otpAttemptCount: { type: Number, default: 0 },
    otpResendAvailableAt: { type: Date },
  },
  { timestamps: true },
);

pendingSignupSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

export const PendingSignup =
  (mongoose.models.PendingSignup as mongoose.Model<PendingSignupDocument>) ||
  mongoose.model<PendingSignupDocument>("PendingSignup", pendingSignupSchema);
