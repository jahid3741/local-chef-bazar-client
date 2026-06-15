import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import useAxiosPublic from "../../../Hooks/UseAxiosPublic/UseAxiosPublic";
import MealCard from "../../Cards/MealCard/MealCard";

const HomeMeals = () => {
  const axiosPublic = useAxiosPublic();

  // States for Pagination and Data
  const [allMeals, setAllMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    // Fetching all meals (removed limit to allow pagination)
    axiosPublic
      .get("/meals")
      .then((res) => {
        setAllMeals(res.data.meals || res.data || []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [axiosPublic]);

  // Pagination Logic Calculations
  const totalPages = Math.ceil(allMeals.length / itemsPerPage);
  const currentMeals = allMeals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Optional: Smooth scroll slightly up to the menu when clicking next page
    window.scrollBy({ top: -100, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-base-100 dark:bg-gray-900 py-12 sm:py-16 md:py-20 lg:py-24 transition-colors duration-300 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16 max-w-2xl mx-auto px-2"
        >
          <span className="bg-primary/10 text-primary font-bold tracking-widest uppercase text-[10px] sm:text-xs px-3 sm:px-4 py-1.5 rounded-full mb-3 sm:mb-4 inline-block">
            Our Menu
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-5 text-base-content dark:text-white leading-tight">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Daily Meals
            </span>
          </h2>
          <p className="text-base-content/70 dark:text-gray-400 text-sm sm:text-base md:text-lg">
            Discover our carefully curated selection of fresh, homemade meals
            prepared with love by talented local chefs in your area.
          </p>
        </motion.div>

        {/* Content Section */}
        {isLoading ? (
          /* Loading Skeletons - Responsive Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 xl:gap-10">
            {[...Array(itemsPerPage)].map((_, index) => (
              <div
                key={index}
                className="bg-base-100 dark:bg-gray-800 rounded-3xl p-4 sm:p-5 h-[380px] sm:h-[420px] animate-pulse border border-base-200 dark:border-gray-700 flex flex-col shadow-sm w-full"
              >
                <div className="w-full h-40 sm:h-48 lg:h-56 bg-base-300 dark:bg-gray-700 rounded-2xl mb-4 sm:mb-5 shrink-0"></div>
                <div className="h-5 sm:h-6 bg-base-300 dark:bg-gray-700 rounded-lg w-3/4 mb-2 sm:mb-3"></div>
                <div className="h-3 sm:h-4 bg-base-300 dark:bg-gray-700 rounded-lg w-1/2 mb-auto"></div>
                <div className="flex justify-between items-center mt-4 sm:mt-6 pt-4 border-t border-base-200 dark:border-gray-700">
                  <div className="h-6 sm:h-8 bg-base-300 dark:bg-gray-700 rounded-xl w-16 sm:w-20"></div>
                  <div className="h-8 sm:h-10 bg-base-300 dark:bg-gray-700 rounded-xl w-24 sm:w-28"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Actual Meals Grid */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 xl:gap-10"
          >
            {currentMeals?.map((meal) => (
              <motion.div
                key={meal._id}
                variants={itemVariants}
                className="flex flex-col h-full w-full"
              >
                <div className="w-full h-full flex-grow hover:-translate-y-1 sm:hover:-translate-y-2 transition-transform duration-300">
                  <MealCard meal={meal} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination Controls */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center mt-12 sm:mt-16">
            <div className="join shadow-sm rounded-xl overflow-hidden border border-base-200 dark:border-gray-700">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="join-item btn btn-md sm:btn-lg bg-base-100 dark:bg-gray-800 border-none hover:bg-base-200 dark:hover:bg-gray-700 text-base-content dark:text-white disabled:opacity-40 disabled:bg-base-100"
              >
                « Prev
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`join-item btn btn-md sm:btn-lg border-none ${
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
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="join-item btn btn-md sm:btn-lg bg-base-100 dark:bg-gray-800 border-none hover:bg-base-200 dark:hover:bg-gray-700 text-base-content dark:text-white disabled:opacity-40 disabled:bg-base-100"
              >
                Next »
              </button>
            </div>
          </div>
        )}

        {/* Explore Full Menu Button */}
        {!isLoading && allMeals.length > 0 && (
          <div className="mt-8 sm:mt-10 text-center px-4 sm:px-0">
            <Link
              to="/meals"
              className="btn btn-outline border-base-300 dark:border-gray-600 hover:bg-base-200 dark:hover:bg-gray-800 hover:border-base-300 dark:hover:border-gray-600 rounded-xl px-8 sm:px-10 py-3.5 sm:py-3 h-auto font-bold text-base-content dark:text-gray-200 transition-all text-sm sm:text-base md:text-lg w-full sm:w-auto flex items-center justify-center sm:inline-flex"
            >
              Explore Full Menu
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeMeals;
