import { useEffect, useState } from "react";

import useAxiosPublic from "../../Hooks/UseAxiosPublic/UseAxiosPublic";

import MealCard from "../../Components/Cards/MealCard/MealCard";

const Meals = () => {
  const axiosPublic = useAxiosPublic();

  const [meals, setMeals] = useState([]);

  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    axiosPublic
      .get(`/meals?sort=${sortOrder}`)
      .then((res) => {
        setMeals(res.data.meals);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosPublic, sortOrder]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-3">Daily Meals</h2>

        <p className="text-gray-500">
          Explore fresh homemade meals from talented local chefs
        </p>
      </div>

      {/* sort */}
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
          <MealCard key={meal._id} meal={meal} />
        ))}
      </div>
    </div>
  );
};

export default Meals;
