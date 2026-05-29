import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import axiosPublic from "../../Api/AxiosPublic/axiosPublic";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [totalMeals, setTotalMeals] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("");
  const limit = 10;

  useEffect(() => {
    // Fetching with pagination
    axiosPublic
      .get(`/meals?page=${currentPage}&limit=${limit}&sort=${sort}`)
      .then((res) => {
        setMeals(res.data.meals);
        setTotalMeals(res.data.total);
      })
      .catch((err) => console.error(err));
  }, [currentPage, sort]);

  const totalPages = Math.ceil(totalMeals / limit);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Helmet>
        <title>LocalChefBazaar | All Meals</title>
      </Helmet>

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Explore Daily Meals</h2>

        {/* Sort Dropdown */}
        <select
          className="select select-bordered w-full max-w-xs"
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Sort by Price: Default</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {meals.map((meal) => (
          <div
            key={meal._id}
            className="card bg-base-100 shadow-xl border border-base-200"
          >
            <figure>
              <img
                src={meal.foodImage}
                alt={meal.foodName}
                className="h-60 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-2xl">{meal.foodName}</h2>
              <p className="text-gray-500">By Chef {meal.chefName}</p>

              <div className="flex justify-between mt-2">
                <span className="font-bold text-primary text-xl">
                  ${meal.price}
                </span>
                <span className="flex items-center gap-1">
                  ⭐ {meal.rating}/5
                </span>
              </div>

              <div className="card-actions justify-end mt-4">
                <Link
                  to={`/meals/${meal._id}`}
                  className="btn btn-primary w-full"
                >
                  See Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            className="btn btn-outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>

          <span className="font-semibold text-lg">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="btn btn-outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Meals;
