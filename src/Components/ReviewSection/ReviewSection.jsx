import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/UseAuth/UseAuth";
import axiosSecure from "../../Api/AxiosSecure/AxiosSecure";
import axiosPublic from "../../Api/AxiosPublic/AxiosPublic";

const ReviewSection = ({ mealId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // 1. Fetch reviews using PUBLIC axios so guests can read them without 401 errors
  useEffect(() => {
    if (mealId) {
      axiosPublic
        .get(`/reviews/meal/${mealId}`)
        .then((res) => {
          // Sort so newest reviews appear at the top
          const sortedReviews = res.data.sort(
            (a, b) => new Date(b.date) - new Date(a.date),
          );
          setReviews(sortedReviews);
        })
        .catch((err) => console.error("Failed to load reviews:", err));
    }
  }, [mealId]);

  // 2. Submit new review (Requires Auth)
  const onSubmit = async (data) => {
    const reviewData = {
      foodId: mealId,
      reviewerName: user?.displayName || "Anonymous User",
      reviewerEmail: user?.email,
      reviewerImage:
        user?.photoURL ||
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      rating: Number(data.rating),
      comment: data.comment,
      date: new Date().toISOString(), // Add timestamp for sorting
    };

    try {
      const res = await axiosSecure.post("/reviews", reviewData);
      if (res.data.insertedId) {
        Swal.fire({ icon: "success", title: "Review submitted successfully!" });
        // Add new review to the top of the UI list immediately
        setReviews([reviewData, ...reviews]);
        reset();
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Failed to submit review" });
    }
  };

  return (
    <div className="mt-8">
      {/* --- FORM SECTION --- */}
      {user ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-base-100 dark:bg-gray-800 p-6 md:p-8 rounded-3xl mb-12 shadow-sm border border-base-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold text-base-content dark:text-white mb-6">
            Leave a Review
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Rating Input */}
            <div className="md:col-span-4 lg:col-span-3">
              <label className="block text-sm font-semibold text-base-content/80 dark:text-gray-300 mb-2">
                Rating (1-5)
              </label>
              <input
                type="number"
                placeholder="5"
                {...register("rating", { required: true, min: 1, max: 5 })}
                className={`input input-bordered w-full rounded-xl bg-base-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow ${errors.rating ? "border-error focus:ring-error/50" : "border-base-300 dark:border-gray-600"}`}
              />
              {errors.rating && (
                <span className="text-error text-xs mt-1.5 block font-medium">
                  Valid rating (1-5) required
                </span>
              )}
            </div>

            {/* Comment Input */}
            <div className="md:col-span-8 lg:col-span-9">
              <label className="block text-sm font-semibold text-base-content/80 dark:text-gray-300 mb-2">
                Your Experience
              </label>
              <textarea
                placeholder="Share your thoughts about this meal..."
                rows="3"
                {...register("comment", { required: true })}
                className={`textarea textarea-bordered w-full rounded-xl bg-base-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none ${errors.comment ? "border-error focus:ring-error/50" : "border-base-300 dark:border-gray-600"}`}
              ></textarea>
              {errors.comment && (
                <span className="text-error text-xs mt-1 block font-medium">
                  Comment is required
                </span>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button className="btn btn-primary rounded-xl px-8 font-bold text-white shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-transform">
              Post Review
            </button>
          </div>
        </form>
      ) : (
        /* Guest Login Prompt */
        <div className="bg-base-200/50 dark:bg-gray-800/50 p-8 rounded-3xl mb-12 border border-base-200 dark:border-gray-700 text-center">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-base-content dark:text-white mb-2">
            Have you tried this meal?
          </h3>
          <p className="text-base-content/60 dark:text-gray-400 mb-6">
            Log in to share your experience with the community.
          </p>
          <Link
            to="/login"
            className="btn btn-primary rounded-xl px-8 font-bold text-white shadow-sm"
          >
            Login to Review
          </Link>
        </div>
      )}

      {/* --- REVIEWS DISPLAY SECTION --- */}
      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div
              key={review._id || index}
              className="bg-base-100 dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-base-200 dark:border-gray-700 flex gap-4 sm:gap-6"
            >
              {/* Avatar */}
              <div className="shrink-0">
                <img
                  src={
                    review.reviewerImage ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  alt={review.reviewerName}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-base-200 dark:ring-gray-700"
                />
              </div>

              {/* Review Content */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                  <div>
                    <h4 className="font-bold text-base-content dark:text-white text-lg leading-none">
                      {review.reviewerName}
                    </h4>
                    <span className="text-xs text-base-content/50 dark:text-gray-400 font-medium">
                      {review.date
                        ? new Date(review.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Recently"}
                    </span>
                  </div>

                  {/* Star Rating Badge */}
                  <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-bold px-3 py-1 rounded-lg text-sm flex items-center gap-1 shadow-sm shrink-0 w-fit">
                    ⭐ {review.rating}/5
                  </div>
                </div>

                <p className="text-base-content/80 dark:text-gray-300 leading-relaxed mt-3">
                  {review.comment}
                </p>
              </div>
            </div>
          ))
        ) : (
          /* Empty State */
          <div className="text-center py-12 px-4 bg-base-100/50 dark:bg-gray-800/30 rounded-3xl border border-dashed border-base-300 dark:border-gray-700">
            <span className="text-4xl block mb-3 opacity-50">🍽️</span>
            <p className="text-base-content/60 dark:text-gray-400 font-medium">
              No reviews yet. Be the first to taste and review this meal!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
