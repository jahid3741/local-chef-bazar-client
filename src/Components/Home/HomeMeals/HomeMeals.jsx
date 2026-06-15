import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FiSearch } from "react-icons/fi";
import useAxiosPublic from "../../../Hooks/UseAxiosPublic/UseAxiosPublic";

const HomeMeals = () => {
  const axiosPublic = useAxiosPublic();

  // Data & Pagination States
  const [meals, setMeals] = useState([]);
  const [totalMeals, setTotalMeals] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Filter & Search States
  const [sort, setSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const itemsPerPage = 4; // 1 perfect row of 4 cards on desktop

  // Debounce Search Input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchQuery(searchInput);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

  // Fetch Meals from Backend
  useEffect(() => {
    setIsLoading(true);

    let endpoint = `/meals?page=${currentPage}&limit=${itemsPerPage}`;
    if (sort) endpoint += `&sort=${sort}`;
    if (searchQuery) endpoint += `&search=${searchQuery}`;

    axiosPublic
      .get(endpoint)
      .then((res) => {
        setMeals(res.data.meals || res.data || []);
        setTotalMeals(res.data.total || res.data?.meals?.length || 0);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching meals:", error);
        setIsLoading(false);
      });
  }, [axiosPublic, currentPage, sort, searchQuery]);

  const totalPages = Math.ceil(totalMeals / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    document
      .getElementById("menu-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div
      id="menu-section"
      className="bg-[var(--bg-base)] transition-colors duration-300 py-16 sm:py-20 lg:py-24 w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 max-w-2xl mx-auto px-2"
        >
          <span className="bg-primary/10 text-primary font-bold tracking-widest uppercase text-[10px] sm:text-xs px-4 py-1.5 rounded-full mb-4 inline-block">
            Our Menu
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 text-[var(--text-base)] leading-tight">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Daily Meals
            </span>
          </h2>
          <p className="text-[var(--text-base)] opacity-70 text-base md:text-lg">
            Discover our carefully curated selection of fresh, homemade meals
            prepared with love by talented local chefs in your area.
          </p>
        </motion.div>

        {/* Modern Filter Bar */}
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
            className="input w-full sm:w-48 bg-[var(--bg-base)] text-[var(--text-base)] shadow-sm border border-[var(--border-base)] font-medium cursor-pointer"
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

        {/* Content Section */}
        {isLoading ? (
          /* Loading Skeletons */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
            {[...Array(itemsPerPage)].map((_, index) => (
              <div
                key={index}
                className="card p-0 flex flex-col h-full overflow-hidden animate-pulse border border-[var(--border-base)] rounded-[var(--radius-3xl)]"
              >
                <div className="shrink-0 relative h-56 sm:h-64 w-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="h-6 sm:h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mb-2"></div>
                  <div className="h-4 sm:h-5 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2 mb-auto"></div>
                  <div className="flex justify-between items-center mt-6 mb-2 shrink-0">
                    <div className="h-6 sm:h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/4"></div>
                    <div className="h-6 sm:h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/4"></div>
                  </div>
                  <div className="mt-4 shrink-0">
                    <div className="h-10 sm:h-12 bg-gray-200 dark:bg-gray-700 rounded-xl w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : meals.length === 0 ? (
          /* No Results State */
          <div className="text-center py-20 bg-black/5 dark:bg-white/5 rounded-[var(--radius-3xl)] border border-[var(--border-base)]">
            <h3 className="text-2xl font-bold text-[var(--text-base)] mb-2">
              No meals found
            </h3>
            <p className="text-[var(--text-base)] opacity-70 mb-6">
              Try adjusting your search or filter.
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
          /* Meals Grid */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8"
          >
            {meals.map((meal) => (
              <motion.div
                key={meal._id}
                variants={itemVariants}
                className="flex h-full w-full"
              >
                <div className="card p-0 flex flex-col h-full overflow-hidden group hover:-translate-y-1 transition-transform duration-300 w-full border border-[var(--border-base)] bg-[var(--bg-base)] rounded-[var(--radius-3xl)]">
                  <figure className="shrink-0 relative h-56 sm:h-64 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={
                        meal.foodImage ||
                        "https://placehold.co/600x400?text=No+Image"
                      }
                      alt={meal.foodName}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {meal.category && (
                      <div className="absolute top-4 left-4 bg-[var(--bg-base)]/90 backdrop-blur-sm text-[var(--text-base)] px-3 py-1 rounded-lg text-xs font-bold shadow-sm">
                        {meal.category}
                      </div>
                    )}
                  </figure>
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-base)] leading-tight">
                      {meal.foodName}
                    </h2>
                    <p className="text-[var(--text-base)] opacity-60 font-medium text-sm sm:text-base mt-1">
                      By Chef {meal.chefName || "Unknown"}
                    </p>
                    <div className="flex justify-between items-center mt-4 mb-2 shrink-0">
                      <span className="font-extrabold text-primary text-xl sm:text-2xl">
                        ${meal.price}
                      </span>
                      <span className="flex items-center gap-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-3 py-1 rounded-lg font-bold text-sm">
                        ⭐ {meal.rating || "New"}/5
                      </span>
                    </div>
                    <div className="mt-auto pt-4 shrink-0">
                      <Link
                        to={`/meals/${meal._id}`}
                        className="btn bg-primary text-white hover:bg-primary/90 w-full shadow-lg shadow-primary/20 flex justify-center items-center"
                      >
                        See Details
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination Controls */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center mt-12 sm:mt-16 w-full overflow-x-auto px-2 pb-4">
            <div className="join shadow-sm rounded-xl overflow-hidden border border-[var(--border-base)] bg-[var(--bg-base)]">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="join-item btn btn-sm sm:btn-md border-none bg-[var(--bg-base)] text-[var(--text-base)] hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-40"
              >
                « Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
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
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="join-item btn btn-sm sm:btn-md border-none bg-[var(--bg-base)] text-[var(--text-base)] hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-40"
              >
                Next »
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeMeals;
