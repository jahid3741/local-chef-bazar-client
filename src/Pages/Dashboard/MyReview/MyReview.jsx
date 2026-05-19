import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/UseAuth/UseAuth";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";

const MyReview = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const [reviews, setReviews] = useState([]);

  const [editingReview, setEditingReview] = useState(null);

  const [updatedRating, setUpdatedRating] = useState("");

  const [updatedComment, setUpdatedComment] = useState("");

  // load reviews
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/reviews/user/${user.email}`)
        .then((res) => {
          setReviews(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [axiosSecure, user]);

  // delete review
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",

      text: "This review will be deleted",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/reviews/${id}`);

      if (res.data.deletedCount > 0) {
        Swal.fire({
          icon: "success",

          title: "Review deleted",
        });

        const remainingReviews = reviews.filter((review) => review._id !== id);

        setReviews(remainingReviews);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // open edit modal
  const handleEdit = (review) => {
    setEditingReview(review);

    setUpdatedRating(review.rating);

    setUpdatedComment(review.comment);
  };

  // update review
  const handleUpdate = async () => {
    try {
      const updatedData = {
        rating: updatedRating,

        comment: updatedComment,
      };

      const res = await axiosSecure.patch(
        `/reviews/${editingReview._id}`,
        updatedData,
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",

          title: "Review updated",
        });

        const updatedReviews = reviews.map((review) => {
          if (review._id === editingReview._id) {
            return {
              ...review,
              rating: updatedRating,
              comment: updatedComment,
            };
          }

          return review;
        });

        setReviews(updatedReviews);

        setEditingReview(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">My Reviews</h2>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>

              <th>Meal</th>

              <th>Rating</th>

              <th>Comment</th>

              <th>Date</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((review, index) => (
              <tr key={review._id}>
                <td>{index + 1}</td>

                <td>{review.mealName}</td>

                <td>⭐ {review.rating}</td>

                <td>{review.comment}</td>

                <td>{new Date(review.date).toLocaleDateString()}</td>

                <td className="space-x-2">
                  <button
                    onClick={() => handleEdit(review)}
                    className="btn btn-sm btn-primary"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(review._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* modal */}
      {editingReview && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-xl mb-5">Update Review</h3>

            <div className="space-y-4">
              <input
                type="number"
                min="1"
                max="5"
                value={updatedRating}
                onChange={(e) => setUpdatedRating(e.target.value)}
                className="input input-bordered w-full"
              />

              <textarea
                value={updatedComment}
                onChange={(e) => setUpdatedComment(e.target.value)}
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>

            <div className="modal-action">
              <button onClick={handleUpdate} className="btn btn-primary">
                Save
              </button>

              <button onClick={() => setEditingReview(null)} className="btn">
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyReview;
