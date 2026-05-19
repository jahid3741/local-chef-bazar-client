import { useEffect, useState } from "react";

import Swal from "sweetalert2";

import useAuth from "../../../Hooks/UseAuth/UseAuth";

import useAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";

const MyMeals = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const [meals, setMeals] = useState([]);

  const [selectedMeal, setSelectedMeal] = useState(null);

  // load chef meals
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

  // delete meal
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this meal?",

      text: "This action cannot be undone",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/meals/${id}`);

      if (res.data.deletedCount > 0) {
        Swal.fire({
          icon: "success",

          title: "Meal deleted",
        });

        const remainingMeals = meals.filter((meal) => meal._id !== id);

        setMeals(remainingMeals);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // open modal
  const handleOpenModal = (meal) => {
    setSelectedMeal(meal);

    document.getElementById("update_modal").showModal();
  };

  // update meal
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

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">My Meals</h2>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>

              <th>Meal</th>

              <th>Price</th>

              <th>Rating</th>

              <th>Delivery Area</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {meals.map((meal, index) => (
              <tr key={meal._id}>
                <td>{index + 1}</td>

                <td>{meal.foodName}</td>

                <td>${meal.price}</td>

                <td>⭐ {meal.rating}</td>

                <td>{meal.deliveryArea}</td>

                <td className="space-x-2">
                  <button
                    onClick={() => handleDelete(meal._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => handleOpenModal(meal)}
                    className="btn btn-sm btn-primary"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* modal */}
      <dialog id="update_modal" className="modal">
        <div className="modal-box">
          <h2 className="text-2xl font-bold mb-6">Update Meal</h2>

          {selectedMeal && (
            <form onSubmit={handleUpdateMeal} className="space-y-4">
              <input
                type="text"
                name="foodName"
                defaultValue={selectedMeal.foodName}
                className="input input-bordered w-full"
              />

              <input
                type="text"
                name="foodImage"
                defaultValue={selectedMeal.foodImage}
                className="input input-bordered w-full"
              />

              <input
                type="number"
                name="price"
                defaultValue={selectedMeal.price}
                className="input input-bordered w-full"
              />

              <input
                type="text"
                name="ingredients"
                defaultValue={selectedMeal.ingredients?.join(", ")}
                className="input input-bordered w-full"
              />

              <input
                type="text"
                name="estimatedDeliveryTime"
                defaultValue={selectedMeal.estimatedDeliveryTime}
                className="input input-bordered w-full"
              />

              <textarea
                name="chefExperience"
                defaultValue={selectedMeal.chefExperience}
                className="textarea textarea-bordered w-full"
              ></textarea>

              <div className="flex gap-3">
                <button className="btn btn-primary">Update</button>

                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("update_modal").close()
                  }
                  className="btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>

      {meals.length === 0 && (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold">No meals found</h2>
        </div>
      )}
    </div>
  );
};

export default MyMeals;
