import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import axiosPublic from "../../Api/AxiosPublic/axiosPublic";

const Meals = () => {
  const [meals, setMeals] = useState([]); 
  const [totalMeals, setTotalMeals] = useState(0); 
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  
  const limit = 6;

  useEffect(() => {
    setIsLoading(true);
    // Server-Side Pagination Request
    const endpoint = sort 
      ? `/meals?page=${currentPage}&limit=${limit}&sort=${sort}`
      : `/meals?page=${currentPage}&limit=${limit}`;
    
    axiosPublic
      .get(endpoint)
      .then((res) => {
        setMeals(res.data.meals || []);
        setTotalMeals(res.data.total || 0);
        setIsLoading(false); // Stop loading when data arrives
      })
      .catch((err) => {
        console.error("Failed to fetch meals:", err);
        setIsLoading(false);
      });
  }, [currentPage, sort]);

  const totalPages = Math.ceil(totalMeals / limit);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 w-full">
      <Helmet>
        <title>LocalChefBazaar | All Meals</title>
      </Helmet>

      {/* Header & Sort Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-base-content dark:text-white text-center sm:text-left">
          Explore Daily Meals
        </h2>

        {/* Sort Dropdown */}
        <select
          className="select select-bordered w-full sm:max-w-xs rounded-xl bg-base-100 dark:bg-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
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

      {/* Conditional Rendering: Skeletons vs Actual Data */}
      {isLoading ? (
        /* Loading Skeletons Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 xl:gap-10">
          {[...Array(limit)].map((_, index) => (
            <div 
              key={index} 
              className="card bg-base-100 dark:bg-gray-800 shadow-sm border border-base-200 dark:border-gray-700 flex flex-col h-full overflow-hidden rounded-3xl animate-pulse"
            >
              {/* Image Skeleton */}
              <div className="shrink-0 relative h-56 sm:h-64 w-full bg-base-300 dark:bg-gray-700"></div>
              
              <div className="card-body p-6 sm:p-8 flex flex-col flex-grow">
                {/* Title & Chef Skeleton */}
                <div className="h-6 sm:h-8 bg-base-300 dark:bg-gray-700 rounded-lg w-3/4 mb-2"></div>
                <div className="h-4 sm:h-5 bg-base-300 dark:bg-gray-700 rounded-lg w-1/2 mb-auto"></div>

                {/* Price & Rating Skeleton */}
                <div className="flex justify-between items-center mt-6 mb-2 shrink-0">
                  <div className="h-6 sm:h-8 bg-base-300 dark:bg-gray-700 rounded-lg w-1/4"></div>
                  <div className="h-6 sm:h-8 bg-base-300 dark:bg-gray-700 rounded-lg w-1/4"></div>
                </div>

                {/* Button Skeleton */}
                <div className="card-actions justify-end mt-4 shrink-0">
                  <div className="h-10 sm:h-12 bg-base-300 dark:bg-gray-700 rounded-xl w-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Actual Meals Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 xl:gap-10">
          {meals.map((meal) => (
            <div
              key={meal._id}
              className="card bg-base-100 dark:bg-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-base-200 dark:border-gray-700 flex flex-col h-full overflow-hidden rounded-3xl"
            >
              <figure className="shrink-0 relative h-56 sm:h-64 w-full">
                <img
                  src={meal.foodImage}
                  alt={meal.foodName}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </figure>
              
              <div className="card-body p-6 sm:p-8 flex flex-col flex-grow">
                <h2 className="card-title text-xl sm:text-2xl font-bold text-base-content dark:text-white leading-tight">
                  {meal.foodName}
                </h2>
                <p className="text-base-content/60 dark:text-gray-400 font-medium text-sm sm:text-base mt-1">
                  By Chef {meal.chefName}
                </p>

                <div className="flex justify-between items-center mt-4 mb-2 shrink-0">
                  <span className="font-extrabold text-primary text-xl sm:text-2xl">
                    ${meal.price}
                  </span>
                  <span className="flex items-center gap-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-3 py-1 rounded-lg font-bold text-sm">
                    ⭐ {meal.rating || "New"}/5
                  </span>
                </div>

                <div className="card-actions justify-end mt-auto pt-4 shrink-0">
                  <Link
                    to={`/meals/${meal._id}`}
                    className="btn btn-primary w-full rounded-xl font-bold text-white shadow-lg shadow-primary/20 text-base"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Numbered Pagination Controls */}
      {!isLoading && totalPages > 1 && (
        <div className="flex justify-center mt-12 sm:mt-16 w-full overflow-x-auto px-2 pb-4">
          <div className="join shadow-sm rounded-xl overflow-hidden border border-base-200 dark:border-gray-700 shrink-0">
            
            {/* Previous Button */}
            <button
              onClick={() => {
                setCurrentPage((prev) => Math.max(prev - 1, 1));
                window.scrollBy({ top: -300, behavior: "smooth" }); 
              }}
              disabled={currentPage === 1}
              className="join-item btn btn-sm sm:btn-md bg-base-100 dark:bg-gray-800 border-none hover:bg-base-200 dark:hover:bg-gray-700 text-base-content dark:text-white disabled:opacity-40 disabled:bg-base-100"
            >
              « Prev
            </button>

            {/* Dynamic Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => {
                  setCurrentPage(i + 1);
                  window.scrollBy({ top: -300, behavior: "smooth" });
                }}
                className={`join-item btn btn-sm sm:btn-md border-none ${
                  currentPage === i + 1
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "bg-base-100 dark:bg-gray-800 hover:bg-base-200 dark:hover:bg-gray-700 text-base-content dark:text-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => {
                setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                window.scrollBy({ top: -300, behavior: "smooth" });
              }}
              disabled={currentPage === totalPages}
              className="join-item btn btn-sm sm:btn-md bg-base-100 dark:bg-gray-800 border-none hover:bg-base-200 dark:hover:bg-gray-700 text-base-content dark:text-white disabled:opacity-40 disabled:bg-base-100"
            >
              Next »
            </button>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Meals;