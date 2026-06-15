import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import { FiSearch } from "react-icons/fi";
import axiosPublic from "../../Api/AxiosPublic/axiosPublic";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [totalMeals, setTotalMeals] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Filtering & Sorting States
  const [sort, setSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const limit = 8;

  // Debounce Search Input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchQuery(searchInput);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

  useEffect(() => {
    setIsLoading(true);

    let endpoint = `/meals?page=${currentPage}&limit=${limit}`;
    if (sort) endpoint += `&sort=${sort}`;
    if (searchQuery) endpoint += `&search=${searchQuery}`;

    axiosPublic
      .get(endpoint)
      .then((res) => {
        setMeals(res.data.meals || []);
        setTotalMeals(res.data.total || 0);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch meals:", err);
        setIsLoading(false);
      });
  }, [currentPage, sort, searchQuery]);

  const totalPages = Math.ceil(totalMeals / limit);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 w-full">
      <Helmet>
        <title>LocalChefBazaar | Explore Meals</title>
      </Helmet>

      {/* Page Header */}
      <div className="mb-8 text-center sm:text-left">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-base)] mb-2">
          Explore Daily Meals
        </h2>
        <p className="text-[var(--text-base)] opacity-70">
          Find exactly what you are craving from our local chefs.
        </p>
      </div>

      {/* Modern Advanced Filter Bar */}
      <div className="card border-none bg-black/5 dark:bg-white/5 p-4 sm:p-5 mb-10 flex flex-col sm:flex-row gap-4 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full sm:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiSearch className="text-[var(--text-base)] opacity-50 text-lg" />
          </div>
          <input
            type="text"
            placeholder="Search for meals (e.g. Biryani)..."
            className="input w-full pl-11 bg-[var(--bg-base)] text-[var(--text-base)] shadow-sm border border-[var(--border-base)]"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        {/* Sort Filter */}
        <select
          className="input w-full sm:w-48 bg-[var(--bg-base)] text-[var(--text-base)] shadow-sm border border-[var(--border-base)] cursor-pointer"
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Sort by: Default</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Skeletons / Meals Grid Component */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
          {[...Array(limit)].map((_, index) => (
            <div key={index} className="card p-0 h-[400px] animate-pulse flex flex-col w-full border border-[var(--border-base)] rounded-[var(--radius-3xl)]">
              <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 shrink-0"></div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2 mb-auto"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl w-full mt-4 shrink-0"></div>
              </div>
            </div>
          ))}
        </div>
      ) : meals.length === 0 ? (
        <div className="text-center py-20 bg-black/5 dark:bg-white/5 rounded-[var(--radius-3xl)] border border-[var(--border-base)]">
          <h3 className="text-2xl font-bold text-[var(--text-base)] mb-2">
            No meals found
          </h3>
          <p className="text-[var(--text-base)] opacity-70 mb-6">
            Try adjusting your search or filters.
          </p>
          <button
            onClick={() => {
              setSearchInput("");
              setSearchQuery("");
              setSort("");
            }}
            className="btn bg-primary text-white border-none hover:bg-primary/90"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
          {meals.map((meal) => (
            <div key={meal._id} className="flex h-full w-full">
              <div className="card p-0 flex flex-col w-full h-full overflow-hidden group hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 border border-[var(--border-base)] bg-[var(--bg-base)]">
                
                <figure className="shrink-0 relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={meal.foodImage || "https://placehold.co/600x400?text=No+Image"}
                    alt={meal.foodName}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {meal.category && (
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm uppercase tracking-wide">
                      {meal.category}
                    </div>
                  )}
                </figure>

                <div className="p-5 sm:p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-[var(--text-base)] leading-snug line-clamp-2">
                    {meal.foodName}
                  </h2>
                  <p className="text-[var(--text-base)] opacity-60 font-medium text-sm mt-1">
                    By Chef {meal.chefName || "Unknown"}
                  </p>
                  
                  <div className="flex justify-between items-end mt-4 mb-2 shrink-0">
                    <span className="font-extrabold text-primary text-2xl">
                      ${meal.price}
                    </span>
                    <span className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2.5 py-1 rounded-lg font-bold text-sm">
                      ⭐ {meal.rating || "4.5"}
                    </span>
                  </div>

                  <div className="mt-auto pt-5 shrink-0">
                    <Link
                      to={`/meals/${meal._id}`}
                      className="btn w-full bg-black/5 dark:bg-white/5 text-[var(--text-base)] border border-[var(--border-base)] hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {!isLoading && totalPages > 1 && (
        <div className="flex justify-center mt-12 sm:mt-16 w-full overflow-x-auto px-2 pb-4">
          <div className="join shadow-sm rounded-xl overflow-hidden border border-[var(--border-base)] bg-[var(--bg-base)]">
            <button
              onClick={() => {
                setCurrentPage((prev) => Math.max(prev - 1, 1));
                window.scrollBy({ top: -300, behavior: "smooth" });
              }}
              disabled={currentPage === 1}
              className="join-item btn btn-sm sm:btn-md border-none bg-[var(--bg-base)] text-[var(--text-base)] hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-40"
            >
              « Prev
            </button>
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
                    : "bg-[var(--bg-base)] text-[var(--text-base)] hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => {
                setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                window.scrollBy({ top: -300, behavior: "smooth" });
              }}
              disabled={currentPage === totalPages}
              className="join-item btn btn-sm sm:btn-md border-none bg-[var(--bg-base)] text-[var(--text-base)] hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-40"
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