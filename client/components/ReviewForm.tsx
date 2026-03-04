import { FormEvent, useState } from "react";
import { Star } from "lucide-react";
import { CreateReviewRequest } from "@shared/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { createReview } from "@/lib/reviews-api";

const initialForm: CreateReviewRequest = {
  clientName: "",
  clientImage: "",
  rating: 5,
  reviewMessage: "",
  companyName: "",
};

function StarRatingInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (rating: number) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="p-1 transition-transform hover:scale-110"
          aria-label={`Rate ${star} out of 5`}
        >
          <Star
            className={cn(
              "h-6 w-6",
              star <= value
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300 hover:text-yellow-300",
            )}
          />
        </button>
      ))}
    </div>
  );
}

export default function ReviewForm() {
  const [formData, setFormData] = useState<CreateReviewRequest>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(
    null,
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      await createReview(formData);
      setStatus({
        ok: true,
        text: "Thanks for your review. It has been submitted for approval.",
      });
      setFormData(initialForm);
    } catch (error) {
      setStatus({
        ok: false,
        text:
          error instanceof Error
            ? error.message
            : "Unable to submit review right now.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="review-form"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Leave a Review
          </h2>
          <p className="text-gray-600">
            Share your experience. Your review will appear after admin approval.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 sm:p-8 space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              value={formData.clientName}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, clientName: event.target.value }))
              }
              placeholder="Your name"
              minLength={2}
              required
            />
            <Input
              value={formData.companyName}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, companyName: event.target.value }))
              }
              placeholder="Company (optional)"
            />
          </div>

          <Input
            value={formData.clientImage}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, clientImage: event.target.value }))
            }
            placeholder="Image URL (optional)"
            type="url"
          />

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Rating</p>
            <StarRatingInput
              value={formData.rating}
              onChange={(rating) =>
                setFormData((prev) => ({ ...prev, rating }))
              }
            />
          </div>

          <Textarea
            value={formData.reviewMessage}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, reviewMessage: event.target.value }))
            }
            placeholder="Write your review..."
            className="min-h-32"
            minLength={10}
            required
          />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>

          {status && (
            <p
              className={cn(
                "text-sm font-medium",
                status.ok ? "text-green-600" : "text-red-600",
              )}
            >
              {status.text}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
