import mongoose, { Schema } from "mongoose";

export interface RefreshTokenDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  tokenHash: string;
  expiresAt: Date;
  revokedAt?: Date;
}

const refreshTokenSchema = new Schema<RefreshTokenDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    tokenHash: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true, index: true },
    revokedAt: { type: Date },
  },
  { timestamps: true },
);

refreshTokenSchema.index({ userId: 1, revokedAt: 1 });

export const RefreshToken =
  (mongoose.models.RefreshToken as mongoose.Model<RefreshTokenDocument>) ||
  mongoose.model<RefreshTokenDocument>("RefreshToken", refreshTokenSchema);
