import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/UseAuth/UseAuth";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";

const MyMeals = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const [meals, setMeals] = useState([]);

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

                <td>
                  <button
                    onClick={() => handleDelete(meal._id)}
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

      {meals.length === 0 && (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold">No meals found</h2>
        </div>
      )}
    </div>
  );
};

export default MyMeals;
