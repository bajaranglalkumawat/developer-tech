import mongoose, { InferSchemaType, Model } from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    clientImage: {
      type: String,
      trim: true,
      default: "",
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    reviewMessage: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      trim: true,
      default: "",
    },
    isApproved: {
      type: Boolean,
      default: false,
      index: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    versionKey: false,
  },
);

export type ReviewDocument = InferSchemaType<typeof reviewSchema>;

export const ReviewModel: Model<ReviewDocument> =
  mongoose.models.Review ||
  mongoose.model<ReviewDocument>("Review", reviewSchema);
