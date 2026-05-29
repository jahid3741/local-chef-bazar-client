import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/UseAuth/UseAuth";
import axiosSecure from "../../../Api/AxiosSecure/AxiosSecure";
import axiosPublic from "../../../Api/AxiosPublic/AxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CreateMeal = () => {
  const { user } = useAuth();
  const [dbUser, setDbUser] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

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
    setIsUploading(true);

    try {
      const imageFile = { image: data.image[0] };
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: { "content-type": "multipart/form-data" },
      });

      if (res.data.success) {
        const mealData = {
          foodName: data.foodName,
          chefName: user?.displayName || "Unknown Chef",
          foodImage: res.data.data.display_url, // ImgBB URL
          price: Number(data.price),
          rating: 0,
          ingredients: data.ingredients.split(",").map((i) => i.trim()),
          deliveryArea: data.deliveryArea,
          estimatedDeliveryTime: data.estimatedDeliveryTime,
          chefExperience: data.chefExperience,
          userEmail: user?.email,
        };

        // 3. Save to MongoDB
        const menuRes = await axiosSecure.post("/meals", mealData);
        if (menuRes.data.insertedId) {
          reset();
          Swal.fire({ icon: "success", title: "Meal added successfully!" });
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: "error", title: "Failed to upload meal" });
    } finally {
      setIsUploading(false);
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

          {/* Image Upload (File) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Upload Food Image
              </span>
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: true })}
              className="file-input file-input-bordered w-full"
            />
            {errors.image && (
              <span className="text-error text-sm mt-1">
                Image file is required
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
            disabled={isUploading}
            className="btn btn-primary w-full text-lg mt-4"
          >
            {isUploading ? (
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
