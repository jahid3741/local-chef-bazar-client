import { useState } from "react";
import Swal from "sweetalert2";
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

      ingredients: ingredients.split(","),

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
        });

        form.reset();

        setIngredients("");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",

        title: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-base-100 shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Create Meal</h2>

        <form
          onSubmit={handleCreateMeal}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <input
            type="text"
            name="foodName"
            placeholder="Food Name"
            required
            className="input input-bordered"
          />

          <input
            type="text"
            name="chefName"
            defaultValue={user?.displayName}
            required
            className="input input-bordered"
          />

          <input
            type="text"
            name="foodImage"
            placeholder="Food Image URL"
            required
            className="input input-bordered"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            required
            className="input input-bordered"
          />

          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Ingredients separated by comma"
            required
            className="input input-bordered md:col-span-2"
          />

          <input
            type="text"
            name="deliveryArea"
            placeholder="Delivery Area"
            required
            className="input input-bordered"
          />

          <input
            type="text"
            name="estimatedDeliveryTime"
            placeholder="Estimated Delivery Time"
            required
            className="input input-bordered"
          />

          <input
            type="text"
            name="chefExperience"
            placeholder="Chef Experience"
            required
            className="input input-bordered"
          />

          <button className="btn btn-primary md:col-span-2">Create Meal</button>
        </form>
      </div>
    </div>
  );
};

export default CreateMeal;
