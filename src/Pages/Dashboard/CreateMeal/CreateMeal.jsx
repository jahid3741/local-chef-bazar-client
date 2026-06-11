import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/UseAuth/UseAuth";
import axiosSecure from "../../../Api/AxiosSecure/AxiosSecure";

const CreateMeal = () => {
  const { user } = useAuth();
  const [dbUser, setDbUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/role/${user.email}`).then((res) => {
        setDbUser(res.data);
      });
    }
  }, [user]);
  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const mealData = {
        foodName: data.foodName,
        chefName: user?.displayName || "Unknown Chef",
        foodImage: data.foodImage,
        price: Number(data.price),
        ingredients: data.ingredients.split(",").map((item) => item.trim()),
        deliveryArea: data.deliveryArea,
        estimatedDeliveryTime: data.estimatedDeliveryTime,
        chefExperience: data.chefExperience,
      };

      const res = await axiosSecure.post("/meals", mealData);

      if (res.data.insertedId) {
        reset();

        Swal.fire({
          icon: "success",
          title: "Meal added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Failed to add meal",
        text:
          error?.response?.data?.message || error?.message || "Unknown error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-8 bg-base-100 shadow-xl rounded-2xl border border-base-200 mt-10">
      <Helmet>
        <title>LocalChefBazaar | Create Meal</title>
      </Helmet>

      <h2 className="text-4xl font-bold text-center mb-8">Create a New Meal</h2>

      {/* FRAUD BLOCKER */}
      {dbUser?.status === "fraud" ? (
        <div className="bg-error/20 p-6 rounded-xl text-center">
          <h3 className="text-2xl font-bold text-error mb-2">
            Account Restricted
          </h3>
          <p className="text-error font-medium">
            Your account has been flagged for fraud. You are no longer permitted
            to create meals on this platform.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Food Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Food Name</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Chicken Biriyani"
                {...register("foodName", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.foodName && (
                <span className="text-error text-sm mt-1">
                  Name is required
                </span>
              )}
            </div>

            {/* Price */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Price ($)</span>
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("price", { required: true, min: 0 })}
                className="input input-bordered w-full"
              />
              {errors.price && (
                <span className="text-error text-sm mt-1">
                  Valid price is required
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Delivery Area */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Delivery Area</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Dhaka"
                {...register("deliveryArea", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            {/* Delivery Time */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Est. Delivery Time
                </span>
              </label>
              <input
                type="text"
                placeholder="e.g. 45 Minutes"
                {...register("estimatedDeliveryTime", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Image Link (Text Input) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Food Image Link (URL)
              </span>
            </label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              {...register("foodImage", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.foodImage && (
              <span className="text-error text-sm mt-1">
                An image URL link is required
              </span>
            )}
          </div>

          {/* Ingredients */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Ingredients (Comma Separated)
              </span>
            </label>
            <textarea
              placeholder="e.g. Rice, Chicken, Spices, Ghee"
              {...register("ingredients", { required: true })}
              className="textarea textarea-bordered w-full h-24"
            ></textarea>
          </div>

          {/* Chef Experience */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Chef Experience Summary
              </span>
            </label>
            <input
              type="text"
              placeholder="e.g. 7 Years in Continental Cuisine"
              {...register("chefExperience", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div className="bg-base-200 p-4 rounded-xl flex gap-4 text-sm text-gray-500">
            <p>
              <strong>Posting as:</strong> {user?.displayName}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full text-lg mt-4"
          >
            {isSubmitting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Add Meal"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateMeal;
