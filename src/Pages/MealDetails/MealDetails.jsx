import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import ReviewSection from "../../Components/ReviewSection/ReviewSection";
import useAuth from "../../Hooks/UseAuth/UseAuth";
import Swal from "sweetalert2";

const MealDetails = () => {
  const { id } = useParams();

  const axiosSecure = useAxiosSecure();

  const [meal, setMeal] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    axiosSecure.get(`/meals/${id}`).then((res) => {
      setMeal(res.data);
    });
  }, [axiosSecure, id]);

  const {
    foodName,
    chefName,
    chefId,
    foodImage,
    price,
    rating,
    ingredients,
    deliveryArea,
    estimatedDeliveryTime,
    chefExperience,
  } = meal;
  const handleFavorite = async () => {
    const favoriteData = {
      userEmail: user?.email,

      mealId: meal._id,

      mealName: meal.foodName,

      chefId: meal.chefId,

      chefName: meal.chefName,

      price: meal.price,
    };

    try {
      const res = await axiosSecure.post("/favorites", favoriteData);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Added to favorites!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: error.response?.data?.message || "Already added",
      });
    }
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* image */}
        <div>
          <img
            src={foodImage}
            alt={foodName}
            className="w-full rounded-xl shadow-xl"
          />
        </div>

        {/* details */}
        <div>
          <h2 className="text-4xl font-bold mb-6">{foodName}</h2>

          <div className="space-y-3 text-lg">
            <p>
              <span className="font-bold">Chef Name:</span> {chefName}
            </p>

            <p>
              <span className="font-bold">Chef ID:</span> {chefId}
            </p>

            <p>
              <span className="font-bold">Price:</span> ${price}
            </p>

            <p>
              <span className="font-bold">Rating:</span> {rating}
            </p>

            <p>
              <span className="font-bold">Delivery Area:</span> {deliveryArea}
            </p>

            <p>
              <span className="font-bold">Delivery Time:</span>{" "}
              {estimatedDeliveryTime}
            </p>

            <p>
              <span className="font-bold">Chef Experience:</span>{" "}
              {chefExperience}
            </p>

            <div>
              <span className="font-bold">Ingredients:</span>

              <ul className="list-disc ml-6 mt-2">
                {ingredients?.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-8">
            <Link to={`/order/${meal._id}`} className="btn btn-primary">
              Order Now
            </Link>

            <button
              onClick={handleFavorite}
              className="btn btn-outline btn-secondary"
            >
              Add To Favorite
            </button>
          </div>
          <ReviewSection mealId={meal._id} />
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
