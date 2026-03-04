import { useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";
import { Review } from "@shared/api";
import { cn } from "@/lib/utils";
import { getApprovedReviews } from "@/lib/reviews-api";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "h-4 w-4",
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
          )}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadReviews() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getApprovedReviews();
        if (isMounted) {
          setReviews(data);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Failed to load testimonials.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) {
      return 0;
    }

    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Number((total / reviews.length).toFixed(1));
  }, [reviews]);

  return (
    <section
      id="testimonials"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Client Testimonials
          </h2>
          <p className="text-gray-600">
            Real feedback from clients who worked with us.
          </p>

          {!isLoading && !error && (
            <div className="mt-6 flex items-center justify-center gap-6 text-sm sm:text-base">
              <div className="font-semibold text-gray-800">
                Average Rating:{" "}
                <span className="text-yellow-500">{averageRating.toFixed(1)} / 5</span>
              </div>
              <div className="text-gray-600">Total Reviews: {reviews.length}</div>
            </div>
          )}
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-56 rounded-2xl bg-white border border-gray-200 shadow-sm animate-pulse"
              />
            ))}
          </div>
        )}

        {!isLoading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {!isLoading && !error && reviews.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-gray-600">
            No approved reviews yet. Be the first to submit one.
          </div>
        )}

        {!isLoading && !error && reviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <article
                key={review._id}
                className="group rounded-2xl bg-white border border-gray-200 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.clientImage || "/placeholder.svg"}
                    alt={review.clientName}
                    className="h-14 w-14 rounded-full object-cover border border-gray-200"
                  />

                  <div>
                    <p className="font-semibold text-gray-900">{review.clientName}</p>
                    <p className="text-sm text-gray-500">
                      {review.companyName || "Client"}
                    </p>
                  </div>
                </div>

                <div className="mb-3">
                  <StarRating rating={review.rating} />
                </div>

                <p className="text-gray-700 leading-relaxed">{review.reviewMessage}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
