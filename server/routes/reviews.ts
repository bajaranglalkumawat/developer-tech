import { RequestHandler } from "express";
import { z } from "zod";
import {
  CreateReviewResponse,
  GetReviewsResponse,
  Review,
} from "@shared/api";
import { connectToDatabase } from "../lib/mongodb";
import { ReviewModel } from "../models/review";

const createReviewSchema = z.object({
  clientName: z.string().trim().min(2, "Client name is required"),
  clientImage: z
    .string()
    .trim()
    .max(500, "Client image URL is too long")
    .optional()
    .or(z.literal("")),
  rating: z.coerce
    .number()
    .int("Rating must be an integer")
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),
  reviewMessage: z
    .string()
    .trim()
    .min(10, "Review message is required")
    .max(2000, "Review message is too long"),
  companyName: z
    .string()
    .trim()
    .max(200, "Company name is too long")
    .optional()
    .or(z.literal("")),
});

function buildValidationMessage(error: z.ZodError) {
  return error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join(", ");
}

function mapReviewToApi(review: {
  _id: { toString(): string };
  clientName: string;
  clientImage?: string;
  rating: number;
  reviewMessage: string;
  companyName?: string;
  isApproved: boolean;
  createdAt: Date;
}): Review {
  return {
    _id: review._id.toString(),
    clientName: review.clientName,
    clientImage: review.clientImage || undefined,
    rating: review.rating,
    reviewMessage: review.reviewMessage,
    companyName: review.companyName || undefined,
    isApproved: review.isApproved,
    createdAt: review.createdAt.toISOString(),
  };
}

export const handleCreateReview: RequestHandler = async (req, res) => {
  const parsed = createReviewSchema.safeParse(req.body);

  if (!parsed.success) {
    const response: CreateReviewResponse = {
      success: false,
      message: buildValidationMessage(parsed.error) || "Invalid review data.",
    };
    res.status(400).json(response);
    return;
  }

  try {
    await connectToDatabase();

    const created = await ReviewModel.create({
      ...parsed.data,
      isApproved: false,
      clientImage: parsed.data.clientImage || undefined,
      companyName: parsed.data.companyName || undefined,
    });

    const response: CreateReviewResponse = {
      success: true,
      message: "Review submitted and pending admin approval.",
      reviewId: created._id.toString(),
    };
    res.status(201).json(response);
  } catch (error) {
    console.error("Create review error:", error);

    const response: CreateReviewResponse = {
      success: false,
      message: "Unable to submit review right now.",
    };
    res.status(500).json(response);
  }
};

export const handleGetApprovedReviews: RequestHandler = async (_req, res) => {
  try {
    await connectToDatabase();

    const reviews = await ReviewModel.find({ isApproved: true })
      .sort({ createdAt: -1 })
      .lean();

    const response: GetReviewsResponse = {
      success: true,
      reviews: reviews.map(mapReviewToApi),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Get approved reviews error:", error);

    const response: GetReviewsResponse = {
      success: false,
      reviews: [],
    };
    res.status(500).json(response);
  }
};
