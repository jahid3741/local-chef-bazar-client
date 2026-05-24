import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiEdit,
  FiTrash2,
  FiDollarSign,
  FiImage,
  FiList,
  FiClock,
  FiAward,
  FiX,
  FiFileText,
} from "react-icons/fi";
import useAuth from "../../../Hooks/UseAuth/UseAuth";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";

const MyMeals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/meals/chef/${user.email}`)
        .then((res) => {
          setMeals(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [axiosSecure, user]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this meal?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/meals/${id}`);

      if (res.data.deletedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Meal deleted",
          confirmButtonColor: "#3b82f6",
        });

        const remainingMeals = meals.filter((meal) => meal._id !== id);
        setMeals(remainingMeals);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = (meal) => {
    setSelectedMeal(meal);
    document.getElementById("update_modal").showModal();
  };

  const handleUpdateMeal = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedMeal = {
      foodName: form.foodName.value,
      foodImage: form.foodImage.value,
      price: form.price.value,
      ingredients: form.ingredients.value.split(","),
      estimatedDeliveryTime: form.estimatedDeliveryTime.value,
      chefExperience: form.chefExperience.value,
    };

    try {
      const res = await axiosSecure.patch(
        `/meals/${selectedMeal._id}`,
        updatedMeal,
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Meal updated successfully",
          confirmButtonColor: "#3b82f6",
        });

        const updatedMeals = meals.map((meal) => {
          if (meal._id === selectedMeal._id) {
            return {
              ...meal,
              ...updatedMeal,
            };
          }
          return meal;
        });

        setMeals(updatedMeals);
        document.getElementById("update_modal").close();
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
            My Meals
          </h2>
          <p className="text-base-content/60 mt-1 font-medium">
            Manage and update your created meals
          </p>
        </div>
        <div className="badge badge-primary badge-lg shadow-sm font-bold px-4 py-3">
          Total Meals: {meals.length}
        </div>
      </motion.div>

      {meals.length > 0 ? (
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
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4">Delivery Area</th>
                  <th className="px-6 py-4 rounded-tr-3xl">Actions</th>
                </tr>
              </thead>
              <tbody className="AnimatePresence">
                <AnimatePresence>
                  {meals.map((meal, index) => (
                    <motion.tr
                      key={meal._id}
                      variants={rowVariants}
                      exit="exit"
                      className="hover:bg-base-200/30 transition-colors border-b border-base-200/50"
                    >
                      <td className="px-6 py-4 font-semibold text-base-content/50">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 font-bold text-base-content">
                        {meal.foodName}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-primary font-bold bg-primary/10 px-3 py-1 rounded-lg">
                          ${meal.price}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 font-semibold text-orange-500 bg-orange-100 w-max px-2 py-1 rounded-lg">
                          ⭐ {meal.rating}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-base-content/70">
                        {meal.deliveryArea}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleOpenModal(meal)}
                            className="btn btn-sm btn-circle btn-ghost text-primary bg-primary/10 hover:bg-primary hover:text-white transition-colors"
                            title="Update"
                          >
                            <FiEdit className="text-lg" />
                          </button>
                          <button
                            onClick={() => handleDelete(meal._id)}
                            className="btn btn-sm btn-circle btn-ghost text-error bg-error/10 hover:bg-error hover:text-white transition-colors"
                            title="Delete"
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
            <FiFileText className="text-5xl text-base-content/30" />
          </div>
          <h2 className="text-2xl font-bold text-base-content mb-2">
            No meals found
          </h2>
          <p className="text-base-content/60">
            You haven't created any meals yet. Head over to the Create Meal
            section to get started!
          </p>
        </motion.div>
      )}

      <dialog
        id="update_modal"
        className="modal modal-bottom sm:modal-middle backdrop-blur-sm"
      >
        <div className="modal-box p-0 rounded-3xl overflow-hidden max-w-2xl">
          <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white flex justify-between items-center">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FiEdit /> Update Meal
            </h2>
            <button
              onClick={() => document.getElementById("update_modal").close()}
              className="btn btn-sm btn-circle btn-ghost text-white hover:bg-white/20"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          <div className="p-8">
            {selectedMeal && (
              <form
                onSubmit={handleUpdateMeal}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Food Name</span>
                  </label>
                  <div className="input input-bordered flex items-center gap-3 focus-within:ring-2 focus-within:ring-primary/20 rounded-xl">
                    <FiFileText className="text-base-content/40" />
                    <input
                      type="text"
                      name="foodName"
                      defaultValue={selectedMeal.foodName}
                      className="grow"
                    />
                  </div>
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Price ($)</span>
                  </label>
                  <div className="input input-bordered flex items-center gap-3 focus-within:ring-2 focus-within:ring-primary/20 rounded-xl">
                    <FiDollarSign className="text-base-content/40" />
                    <input
                      type="number"
                      name="price"
                      defaultValue={selectedMeal.price}
                      className="grow"
                    />
                  </div>
                </div>

                <div className="form-control w-full md:col-span-2">
                  <label className="label">
                    <span className="label-text font-bold">Food Image URL</span>
                  </label>
                  <div className="input input-bordered flex items-center gap-3 focus-within:ring-2 focus-within:ring-primary/20 rounded-xl">
                    <FiImage className="text-base-content/40" />
                    <input
                      type="text"
                      name="foodImage"
                      defaultValue={selectedMeal.foodImage}
                      className="grow"
                    />
                  </div>
                </div>

                <div className="form-control w-full md:col-span-2">
                  <label className="label">
                    <span className="label-text font-bold">
                      Ingredients (comma separated)
                    </span>
                  </label>
                  <div className="input input-bordered flex items-center gap-3 focus-within:ring-2 focus-within:ring-primary/20 rounded-xl">
                    <FiList className="text-base-content/40" />
                    <input
                      type="text"
                      name="ingredients"
                      defaultValue={selectedMeal.ingredients?.join(", ")}
                      className="grow"
                    />
                  </div>
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">
                      Estimated Delivery Time
                    </span>
                  </label>
                  <div className="input input-bordered flex items-center gap-3 focus-within:ring-2 focus-within:ring-primary/20 rounded-xl">
                    <FiClock className="text-base-content/40" />
                    <input
                      type="text"
                      name="estimatedDeliveryTime"
                      defaultValue={selectedMeal.estimatedDeliveryTime}
                      className="grow"
                    />
                  </div>
                </div>

                <div className="form-control w-full md:col-span-2">
                  <label className="label">
                    <span className="label-text font-bold">
                      Chef Experience
                    </span>
                  </label>
                  <div className="relative">
                    <FiAward className="absolute top-4 left-4 text-base-content/40" />
                    <textarea
                      name="chefExperience"
                      defaultValue={selectedMeal.chefExperience}
                      className="textarea textarea-bordered w-full pl-11 focus:ring-2 focus:ring-primary/20 rounded-xl h-24 resize-none"
                    ></textarea>
                  </div>
                </div>

                <div className="md:col-span-2 flex gap-3 mt-4 pt-4 border-t border-base-200">
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("update_modal").close()
                    }
                    className="btn flex-1 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary flex-1 rounded-xl shadow-lg shadow-primary/30"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default MyMeals;
