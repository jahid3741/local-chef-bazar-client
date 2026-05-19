import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/UseAxiosPublic/UseAxiosPublic";
import MealCard from "../../Cards/MealCard/MealCard";

const HomeMeals = () => {
  const axiosPublic = useAxiosPublic();

  const [meals, setMeals] = useState([]);

  // load meals
  useEffect(() => {
    axiosPublic
      .get("/meals?limit=6")
      .then((res) => {
        setMeals(res.data.meals);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosPublic]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      {/* heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Daily Meals</h2>

        <p className="text-gray-500">Fresh homemade meals from local chefs</p>
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

export default HomeMeals;
