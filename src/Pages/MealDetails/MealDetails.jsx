import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";

const MealDetails = () => {
  const { id } = useParams();

  const axiosSecure = useAxiosSecure();

  const [meal, setMeal] = useState({});

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

          <Link to={`/order/${meal._id}`} className="btn btn-primary mt-8">
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
