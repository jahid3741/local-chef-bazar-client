import { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  FiEdit3,
  FiUser,
  FiImage,
  FiDollarSign,
  FiList,
  FiMapPin,
  FiClock,
  FiAward,
  FiPlusCircle,
} from "react-icons/fi";
import useAuth from "../../../Hooks/UseAuth/UseAuth";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";

const CreateMeal = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [ingredients, setIngredients] = useState("");

  const handleCreateMeal = async (e) => {
    e.preventDefault();
    const form = e.target;

    const foodName = form.foodName.value;
    const chefName = form.chefName.value;
    const foodImage = form.foodImage.value;
    const price = form.price.value;
    const deliveryArea = form.deliveryArea.value;
    const estimatedDeliveryTime = form.estimatedDeliveryTime.value;
    const chefExperience = form.chefExperience.value;

    const mealData = {
      foodName,
      chefName,
      foodImage,
      price,
      ingredients: ingredients.split(",").map((item) => item.trim()),
      deliveryArea,
      estimatedDeliveryTime,
      chefExperience,
      userEmail: user?.email,
    };

    try {
      const res = await axiosSecure.post("/meals", mealData);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Meal created successfully!",
          confirmButtonColor: "#3b82f6",
        });

        form.reset();
        setIngredients("");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response?.data?.message || "Something went wrong",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-base-100 shadow-2xl rounded-3xl overflow-hidden border border-base-200/50"
      >
        <div className="bg-gradient-to-r from-primary to-secondary p-8 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm mb-4 shadow-inner">
              <FiPlusCircle className="text-4xl" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Create a New Meal
            </h2>
            <p className="mt-2 text-white/80 font-medium max-w-lg mx-auto">
              Share your culinary masterpiece with the community. Fill out the
              details below to list your meal.
            </p>
          </div>
        </div>

        <motion.form
          onSubmit={handleCreateMeal}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          <motion.div variants={itemVariants} className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-base-content/80">
                Food Name
              </span>
            </label>
            <div className="input input-bordered flex items-center gap-3 focus-within:input-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300 shadow-sm rounded-xl h-14">
              <FiEdit3 className="text-base-content/40 text-lg" />
              <input
                type="text"
                name="foodName"
                placeholder="e.g. Spicy Chicken Curry"
                required
                className="grow text-base"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-base-content/80">
                Chef Name
              </span>
            </label>
            <div className="input input-bordered flex items-center gap-3 bg-base-200/50 focus-within:input-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300 shadow-sm rounded-xl h-14">
              <FiUser className="text-base-content/40 text-lg" />
              <input
                type="text"
                name="chefName"
                defaultValue={user?.displayName}
                required
                className="grow text-base"
              />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="form-control w-full md:col-span-2"
          >
            <label className="label">
              <span className="label-text font-bold text-base-content/80">
                Food Image URL
              </span>
            </label>
            <div className="input input-bordered flex items-center gap-3 focus-within:input-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300 shadow-sm rounded-xl h-14">
              <FiImage className="text-base-content/40 text-lg" />
              <input
                type="url"
                name="foodImage"
                placeholder="https://example.com/image.jpg"
                required
                className="grow text-base"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-base-content/80">
                Price ($)
              </span>
            </label>
            <div className="input input-bordered flex items-center gap-3 focus-within:input-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300 shadow-sm rounded-xl h-14">
              <FiDollarSign className="text-base-content/40 text-lg" />
              <input
                type="number"
                name="price"
                placeholder="0.00"
                step="0.01"
                min="0"
                required
                className="grow text-base"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-base-content/80">
                Estimated Delivery Time
              </span>
            </label>
            <div className="input input-bordered flex items-center gap-3 focus-within:input-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300 shadow-sm rounded-xl h-14">
              <FiClock className="text-base-content/40 text-lg" />
              <input
                type="text"
                name="estimatedDeliveryTime"
                placeholder="e.g. 45 mins"
                required
                className="grow text-base"
              />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="form-control w-full md:col-span-2"
          >
            <label className="label">
              <span className="label-text font-bold text-base-content/80">
                Ingredients
              </span>
            </label>
            <div className="input input-bordered flex items-center gap-3 focus-within:input-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300 shadow-sm rounded-xl h-14">
              <FiList className="text-base-content/40 text-lg" />
              <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Chicken, Onions, Garlic, Spices (comma separated)"
                required
                className="grow text-base"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-base-content/80">
                Delivery Area
              </span>
            </label>
            <div className="input input-bordered flex items-center gap-3 focus-within:input-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300 shadow-sm rounded-xl h-14">
              <FiMapPin className="text-base-content/40 text-lg" />
              <input
                type="text"
                name="deliveryArea"
                placeholder="e.g. Downtown, Northside"
                required
                className="grow text-base"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-base-content/80">
                Chef Experience
              </span>
            </label>
            <div className="input input-bordered flex items-center gap-3 focus-within:input-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300 shadow-sm rounded-xl h-14">
              <FiAward className="text-base-content/40 text-lg" />
              <input
                type="text"
                name="chefExperience"
                placeholder="e.g. 5 Years"
                required
                className="grow text-base"
              />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="md:col-span-2 mt-6 pt-6 border-t border-base-200"
          >
            <button
              type="submit"
              className="btn btn-primary w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all duration-300"
            >
              <FiPlusCircle className="mr-2" />
              Publish Meal
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default CreateMeal;
