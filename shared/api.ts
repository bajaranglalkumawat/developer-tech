/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export interface QuerySubmitRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface QuerySubmitResponse {
  success: boolean;
  message: string;
}

export interface Review {
  _id: string;
  clientName: string;
  clientImage?: string;
  rating: number;
  reviewMessage: string;
  companyName?: string;
  isApproved: boolean;
  createdAt: string;
}

export interface CreateReviewRequest {
  clientName: string;
  clientImage?: string;
  rating: number;
  reviewMessage: string;
  companyName?: string;
}

export interface CreateReviewResponse {
  success: boolean;
  message: string;
  reviewId?: string;
}

export interface GetReviewsResponse {
  success: boolean;
  reviews: Review[];
}
