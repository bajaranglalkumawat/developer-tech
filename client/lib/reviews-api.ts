import {
  CreateReviewRequest,
  CreateReviewResponse,
  GetReviewsResponse,
  Review,
} from "@shared/api";

export async function createReview(payload: CreateReviewRequest) {
  const response = await fetch("/api/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as CreateReviewResponse;

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to submit review.");
  }

  return data;
}

export async function getApprovedReviews(): Promise<Review[]> {
  const response = await fetch("/api/reviews");
  const data = (await response.json()) as GetReviewsResponse;

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Unable to load reviews.");
  }

  return data.reviews;
}
