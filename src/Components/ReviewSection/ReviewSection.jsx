import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/UseAuth/UseAuth";
import axiosSecure from "../../Api/AxiosSecure/AxiosSecure";

const ReviewSection = ({ mealId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (mealId) {
      axiosSecure.get(`/reviews/meal/${mealId}`).then((res) => {
        setReviews(res.data);
      });
    }
  }, [mealId]);

  const onSubmit = async (data) => {
    const reviewData = {
      foodId: mealId,
      reviewerName: user?.displayName,
      reviewerEmail: user?.email,
      reviewerImage: user?.photoURL,
      rating: Number(data.rating),
      comment: data.comment,
    };

    try {
      const res = await axiosSecure.post("/reviews", reviewData);
      if (res.data.insertedId) {
        Swal.fire({ icon: "success", title: "Review submitted!" });
        setReviews([
          { ...reviewData, date: new Date().toISOString() },
          ...reviews,
        ]);
        reset();
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Failed to submit review" });
    }
  };

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold mb-8">Reviews</h2>

      {/* 4. WRAP FORM WITH handleSubmit */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-base-200 p-6 rounded-xl mb-10"
      >
        <div className="mb-4">
          <label className="font-semibold">Rating</label>
          <input
            type="number"
            {...register("rating", { required: true, min: 1, max: 5 })}
            className="input input-bordered w-full mt-2"
          />
          {errors.rating && (
            <span className="text-error text-sm">
              Valid rating (1-5) is required
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="font-semibold">Comment</label>
          <textarea
            {...register("comment", { required: true })}
            className="textarea textarea-bordered w-full mt-2"
          ></textarea>
          {errors.comment && (
            <span className="text-error text-sm">Comment is required</span>
          )}
        </div>

        <button className="btn btn-primary">Give Review</button>
      </form>
    </div>
  );
};

export default ReviewSection;
