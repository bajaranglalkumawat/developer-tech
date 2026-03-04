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

async function fetchApprovedReviewsFromGoogleSheet() {
  const webhookUrl =
    process.env.REVIEW_GOOGLE_SHEETS_WEBHOOK_URL ||
    process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    return {
      ok: false as const,
      error:
        "REVIEW_GOOGLE_SHEETS_WEBHOOK_URL or GOOGLE_SHEETS_WEBHOOK_URL must be configured.",
    };
  }

  const url = new URL(webhookUrl);
  url.searchParams.set("type", "review");
  url.searchParams.set("approved", "true");

  const response = await fetch(url.toString(), { method: "GET" });
  if (!response.ok) {
    const errorBody = await response.text();
    return {
      ok: false as const,
      error: `Google Sheets read failed (${response.status}): ${errorBody}`,
    };
  }

  const data = (await response.json()) as {
    success?: boolean;
    message?: string;
    reviews?: Array<{
      _id?: string;
      clientName?: string;
      clientImage?: string;
      rating?: number;
      reviewMessage?: string;
      companyName?: string;
      isApproved?: boolean;
      createdAt?: string;
    }>;
  };

  if (data.success === false) {
    return {
      ok: false as const,
      error: data.message || "Google Sheets rejected review fetch request.",
    };
  }

  const reviews: Review[] = (data.reviews || [])
    .filter((item) => item && item.clientName && item.reviewMessage)
    .map((item, index) => ({
      _id: item._id || `sheet-review-${index}`,
      clientName: String(item.clientName),
      clientImage: item.clientImage || undefined,
      rating: Number(item.rating || 0),
      reviewMessage: String(item.reviewMessage),
      companyName: item.companyName || undefined,
      isApproved: item.isApproved === true,
      createdAt: item.createdAt || new Date().toISOString(),
    }))
    .filter((item) => item.isApproved && item.rating >= 1 && item.rating <= 5);

  return { ok: true as const, reviews };
}

async function appendReviewToGoogleSheet(payload: {
  clientName: string;
  clientImage?: string;
  rating: number;
  reviewMessage: string;
  companyName?: string;
}) {
  const webhookUrl =
    process.env.REVIEW_GOOGLE_SHEETS_WEBHOOK_URL ||
    process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    return {
      ok: false,
      error:
        "REVIEW_GOOGLE_SHEETS_WEBHOOK_URL or GOOGLE_SHEETS_WEBHOOK_URL must be configured.",
    };
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "review",
      createdAt: new Date().toISOString(),
      isApproved: false,
      ...payload,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    return {
      ok: false,
      error: `Google Sheets webhook failed (${response.status}): ${errorBody}`,
    };
  }

  return { ok: true };
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
    const payload = {
      clientName: parsed.data.clientName,
      clientImage: parsed.data.clientImage || undefined,
      rating: parsed.data.rating,
      reviewMessage: parsed.data.reviewMessage,
      companyName: parsed.data.companyName || undefined,
    };

    const sheetResult = await appendReviewToGoogleSheet(payload);

    if (!sheetResult.ok) {
      const response: CreateReviewResponse = {
        success: false,
        message: sheetResult.error || "Failed to store review in Google Sheets.",
      };
      res.status(502).json(response);
      return;
    }

    let reviewId = "";
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      const created = await ReviewModel.create({
        ...payload,
        isApproved: false,
      });
      reviewId = created._id.toString();
    }

    const response: CreateReviewResponse = {
      success: true,
      message:
        "Review submitted successfully and stored in Google Sheets. It is pending approval.",
      reviewId: reviewId || undefined,
    };
    res.status(201).json(response);
  } catch (error) {
    console.error("Create review error:", error);
    const message =
      error instanceof Error && error.message.includes("MONGODB_URI")
        ? "Server database is not configured. Please set MONGODB_URI."
        : "Unable to submit review right now.";

    const response: CreateReviewResponse = {
      success: false,
      message,
    };
    res.status(500).json(response);
  }
};

export const handleGetApprovedReviews: RequestHandler = async (_req, res) => {
  try {
    if (!process.env.MONGODB_URI) {
      const sheetResult = await fetchApprovedReviewsFromGoogleSheet();
      if (!sheetResult.ok) {
        const response: GetReviewsResponse = {
          success: false,
          reviews: [],
          message: sheetResult.error || "Unable to load reviews right now.",
        };
        res.status(502).json(response);
        return;
      }

      const response: GetReviewsResponse = {
        success: true,
        reviews: sheetResult.reviews,
      };
      res.status(200).json(response);
      return;
    }

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
    const message =
      error instanceof Error && error.message.includes("MONGODB_URI")
        ? "Server database is not configured. Please set MONGODB_URI."
        : "Unable to load reviews right now.";

    const response: GetReviewsResponse = {
      success: false,
      reviews: [],
      message,
    };
    res.status(500).json(response);
  }
};
