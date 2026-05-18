import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import useAuth from "../../Hooks/UseAuth/UseAuth";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";

const ReviewSection = ({ mealId }) => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState("");

  const [comment, setComment] = useState("");

  // load reviews
  useEffect(() => {
    axiosSecure.get(`/reviews/meal/${mealId}`).then((res) => {
      setReviews(res.data);
    });
  }, [axiosSecure, mealId]);

  // add review
  const handleReview = async (e) => {
    e.preventDefault();

    const reviewData = {
      foodId: mealId,

      reviewerName: user?.displayName,

      reviewerEmail: user?.email,

      reviewerImage: user?.photoURL,

      rating,

      comment,
    };

    const res = await axiosSecure.post("/reviews", reviewData);

    if (res.data.insertedId) {
      Swal.fire({
        icon: "success",
        title: "Review submitted successfully!",
      });

      const newReview = {
        ...reviewData,
        date: new Date().toISOString(),
      };

      setReviews([newReview, ...reviews]);

      setRating("");

      setComment("");
    }
  };

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold mb-8">Reviews</h2>

      {/* form */}
      <form
        onSubmit={handleReview}
        className="bg-base-200 p-6 rounded-xl mb-10"
      >
        <div className="mb-4">
          <label className="font-semibold">Rating</label>

          <input
            type="number"
            min="1"
            max="5"
            required
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="input input-bordered w-full mt-2"
          />
        </div>

        <div className="mb-4">
          <label className="font-semibold">Comment</label>

          <textarea
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="textarea textarea-bordered w-full mt-2"
          ></textarea>
        </div>

        <button className="btn btn-primary">Give Review</button>
      </form>

      {/* reviews */}
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="border p-5 rounded-xl">
            <div className="flex items-center gap-4 mb-3">
              <img
                src={review.reviewerImage}
                alt=""
                className="w-14 h-14 rounded-full object-cover"
              />

              <div>
                <h3 className="font-bold text-lg">{review.reviewerName}</h3>

                <p className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            <p className="mb-2">⭐ {review.rating}/5</p>

            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
