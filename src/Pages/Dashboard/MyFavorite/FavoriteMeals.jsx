import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiHeart, FiCalendar, FiUser, FiHash } from "react-icons/fi";
import useAuth from "../../../Hooks/UseAuth/UseAuth";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";

const FavoriteMeals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/favorites/${user.email}`)
        .then((res) => {
          setFavorites(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [axiosSecure, user]);

  const handleRemove = async (id) => {
    const confirm = await Swal.fire({
      title: "Remove favorite?",
      text: "This meal will be removed from your favorites list",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove it",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/favorites/${id}`);

      if (res.data.deletedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Removed from favorites",
          confirmButtonColor: "#3b82f6",
        });

        const remainingFavorites = favorites.filter(
          (favorite) => favorite._id !== id,
        );
        setFavorites(remainingFavorites);
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
          <h2 className="text-3xl font-extrabold text-base-content flex items-center gap-3">
            Favorite Meals <FiHeart className="text-primary fill-primary/20" />
          </h2>
          <p className="text-base-content/60 mt-1 font-medium">
            Meals you have saved for later
          </p>
        </div>
        <div className="badge badge-primary badge-lg shadow-sm font-bold px-4 py-3">
          Total Favorites: {favorites.length}
        </div>
      </motion.div>

      {favorites.length > 0 ? (
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
                  <th className="px-6 py-4">Meal Name</th>
                  <th className="px-6 py-4">Chef Details</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Added Time</th>
                  <th className="px-6 py-4 rounded-tr-3xl text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="AnimatePresence">
                <AnimatePresence>
                  {favorites.map((favorite, index) => (
                    <motion.tr
                      key={favorite._id}
                      variants={rowVariants}
                      exit="exit"
                      className="hover:bg-base-200/30 transition-colors border-b border-base-200/50"
                    >
                      <td className="px-6 py-4 font-semibold text-base-content/50">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 font-bold text-base-content text-lg">
                        {favorite.mealName}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="flex items-center gap-1.5 font-medium text-base-content/80">
                            <FiUser className="text-primary" />{" "}
                            {favorite.chefName}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs text-base-content/50 font-mono">
                            <FiHash /> {favorite.chefId}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-primary font-bold bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20">
                          ${favorite.price}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-base-content/70 font-medium text-sm whitespace-nowrap">
                          <FiCalendar />{" "}
                          {new Date(favorite.addedTime).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <button
                            onClick={() => handleRemove(favorite._id)}
                            className="btn btn-sm btn-circle btn-ghost text-error bg-error/10 hover:bg-error hover:text-white transition-colors"
                            title="Remove from favorites"
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
          className="bg-base-100 shadow-xl border border-base-200/50 rounded-3xl p-16 text-center mt-8"
        >
          <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiHeart className="text-5xl text-base-content/30" />
          </div>
          <h2 className="text-2xl font-bold text-base-content mb-2">
            No favorite meals found
          </h2>
          <p className="text-base-content/60 max-w-md mx-auto">
            You haven't added any meals to your favorites yet. Explore the menu
            and save the ones you love!
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default FavoriteMeals;
