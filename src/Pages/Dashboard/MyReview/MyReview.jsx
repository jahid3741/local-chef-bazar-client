import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiEdit,
  FiTrash2,
  FiStar,
  FiMessageSquare,
  FiCalendar,
  FiX,
  FiFileText,
} from "react-icons/fi";
import useAuth from "../../../Hooks/UseAuth/UseAuth";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";

const MyReview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [updatedRating, setUpdatedRating] = useState("");
  const [updatedComment, setUpdatedComment] = useState("");

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

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/reviews/${id}`);

      if (res.data.deletedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Review deleted",
          confirmButtonColor: "#3b82f6",
        });

        const remainingReviews = reviews.filter((review) => review._id !== id);
        setReviews(remainingReviews);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setUpdatedRating(review.rating);
    setUpdatedComment(review.comment);
  };

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
          title: "Review updated successfully",
          confirmButtonColor: "#3b82f6",
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

  const tableVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-3xl font-extrabold text-base-content">
            My Reviews
          </h2>
          <p className="text-base-content/60 mt-1 font-medium">
            Manage the feedback you've left for meals
          </p>
        </div>
        <div className="badge badge-primary badge-lg shadow-sm font-bold px-4 py-3">
          Total Reviews: {reviews.length}
        </div>
      </motion.div>

      {reviews.length > 0 ? (
        <div className="bg-base-100 shadow-xl border border-base-200/50 rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <motion.table
              variants={tableVariants}
              initial="hidden"
              animate="show"
              className="table w-full"
            >
              <thead className="bg-base-200/50 text-base-content font-bold text-sm">
                <tr>
                  <th className="px-6 py-4 rounded-tl-3xl">#</th>
                  <th className="px-6 py-4">Meal</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4">Comment</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 rounded-tr-3xl text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="AnimatePresence">
                <AnimatePresence>
                  {reviews.map((review, index) => (
                    <motion.tr
                      key={review._id}
                      variants={rowVariants}
                      exit="exit"
                      className="hover:bg-base-200/30 transition-colors border-b border-base-200/50"
                    >
                      <td className="px-6 py-4 font-semibold text-base-content/50">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 font-bold text-base-content whitespace-nowrap">
                        {review.mealName}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 font-semibold text-orange-500 bg-orange-100 w-max px-2.5 py-1 rounded-lg">
                          <FiStar className="fill-current" /> {review.rating}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p
                          className="text-base-content/80 max-w-xs truncate italic"
                          title={review.comment}
                        >
                          "{review.comment}"
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-base-content/70 font-medium text-sm whitespace-nowrap">
                          <FiCalendar />{" "}
                          {new Date(review.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(review)}
                            className="btn btn-sm btn-circle btn-ghost text-primary bg-primary/10 hover:bg-primary hover:text-white transition-colors"
                            title="Update Review"
                          >
                            <FiEdit className="text-lg" />
                          </button>
                          <button
                            onClick={() => handleDelete(review._id)}
                            className="btn btn-sm btn-circle btn-ghost text-error bg-error/10 hover:bg-error hover:text-white transition-colors"
                            title="Delete Review"
                          >
                            <FiTrash2 className="text-lg" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </motion.table>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-base-100 shadow-xl border border-base-200/50 rounded-3xl p-16 text-center"
        >
          <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiMessageSquare className="text-5xl text-base-content/30" />
          </div>
          <h2 className="text-2xl font-bold text-base-content mb-2">
            No reviews yet
          </h2>
          <p className="text-base-content/60">
            You haven't reviewed any meals. Taste some food and share your
            experience!
          </p>
        </motion.div>
      )}

      <AnimatePresence>
        {editingReview && (
          <dialog
            open
            className="modal modal-open backdrop-blur-sm bg-black/40"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="modal-box p-0 rounded-3xl overflow-hidden max-w-md"
            >
              <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white flex justify-between items-center">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <FiEdit /> Update Review
                </h3>
                <button
                  onClick={() => setEditingReview(null)}
                  className="btn btn-sm btn-circle btn-ghost text-white hover:bg-white/20"
                >
                  <FiX className="text-xl" />
                </button>
              </div>

              <div className="p-8 space-y-5">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold text-base-content/80">
                      Rating (1-5)
                    </span>
                  </label>
                  <div className="input input-bordered flex items-center gap-3 focus-within:ring-2 focus-within:ring-primary/20 rounded-xl h-14">
                    <FiStar className="text-orange-400 text-lg" />
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={updatedRating}
                      onChange={(e) => setUpdatedRating(e.target.value)}
                      className="grow font-semibold"
                    />
                  </div>
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold text-base-content/80">
                      Comment
                    </span>
                  </label>
                  <div className="relative">
                    <FiFileText className="absolute top-4 left-4 text-base-content/40 text-lg" />
                    <textarea
                      value={updatedComment}
                      onChange={(e) => setUpdatedComment(e.target.value)}
                      className="textarea textarea-bordered w-full pl-11 focus:ring-2 focus:ring-primary/20 rounded-xl h-32 resize-none leading-relaxed"
                    ></textarea>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-base-200 mt-6">
                  <button
                    onClick={() => setEditingReview(null)}
                    className="btn flex-1 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="btn btn-primary flex-1 rounded-xl shadow-lg shadow-primary/30"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyReview;
