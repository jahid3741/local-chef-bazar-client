import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/UseAxiosPublic/UseAxiosPublic";

const Meals = () => {
  const axiosPublic = useAxiosPublic();

  const [meals, setMeals] = useState([]);

  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    axiosPublic.get(`/meals?sort=${sortOrder}`).then((res) => {
      setMeals(res.data);
    });
  }, [axiosPublic, sortOrder]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-3">All Meals</h2>

        <p className="text-gray-500">
          Discover delicious homemade meals from local chefs
        </p>
      </div>

      {/* sort button */}
      <div className="flex justify-end mb-8">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="select select-bordered"
        >
          <option value="">Sort By Price</option>

          <option value="asc">Low to High</option>

          <option value="desc">High to Low</option>
        </select>
      </div>

      {/* meals grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {meals.map((meal) => (
          <div key={meal._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={meal.foodImage}
                alt={meal.foodName}
                className="h-64 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{meal.foodName}</h2>

              <p>
                <span className="font-semibold">Chef:</span> {meal.chefName}
              </p>

              <p>
                <span className="font-semibold">Price:</span> ${meal.price}
              </p>

              <p>
                <span className="font-semibold">Rating:</span> {meal.rating}
              </p>

              <p>
                <span className="font-semibold">Delivery Area:</span>{" "}
                {meal.deliveryArea}
              </p>

              <div className="card-actions justify-end mt-4">
                <button className="btn btn-primary">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Meals;
