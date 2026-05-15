import mongoose, { Schema } from "mongoose";

export interface RateLimitDocument extends mongoose.Document {
  key: string;
  action: string;
  until: Date;
}

const rateLimitSchema = new Schema<RateLimitDocument>(
  {
    key: { type: String, required: true },
    action: { type: String, required: true },
    until: { type: Date, required: true },
  },
  { timestamps: true },
);

rateLimitSchema.index({ key: 1, action: 1 }, { unique: true });
rateLimitSchema.index({ until: 1 }, { expireAfterSeconds: 0 });

export const RateLimit =
  (mongoose.models.RateLimit as mongoose.Model<RateLimitDocument>) ||
  mongoose.model<RateLimitDocument>("RateLimit", rateLimitSchema);
