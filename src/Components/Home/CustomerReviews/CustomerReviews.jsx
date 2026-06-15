import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import useAxiosPublic from "../../../Hooks/UseAxiosPublic/UseAxiosPublic";
import "swiper/css";
import "swiper/css/pagination";

const CustomerReviews = () => {
  const axiosPublic = useAxiosPublic();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axiosPublic
      .get("/reviews")
      .then((res) => {
        setReviews(Array.isArray(res.data) ? res.data : []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [axiosPublic]);

  return (
    <div className="bg-base-200/30 dark:bg-gray-900/20 py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden w-full max-w-full">
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
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-5 text-base-content dark:text-white leading-tight">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Customers Say
            </span>
          </h2>
          <p className="text-base-content/70 dark:text-gray-400 text-sm sm:text-base md:text-lg">
            Real feedback from food lovers who have experienced the authentic
            taste of our home-cooked meals.
          </p>
        </motion.div>

        {/* Reviews Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-full relative"
        >
          {isLoading ? (
            /* Loading Skeletons - Responsive Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {[1, 2, 3].map((skeleton) => (
                <div
                  key={skeleton}
                  className="bg-base-100 dark:bg-gray-800 rounded-3xl p-5 sm:p-6 lg:p-8 h-72 sm:h-80 animate-pulse border border-base-200 dark:border-gray-700 w-full"
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-base-300 dark:bg-gray-700 rounded-full shrink-0"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-base-300 dark:bg-gray-700 rounded w-1/2"></div>
                      <div className="h-3 bg-base-300 dark:bg-gray-700 rounded w-1/4"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 bg-base-300 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-3 bg-base-300 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-3 bg-base-300 dark:bg-gray-700 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Swiper Instance */
            <Swiper
              // Base settings for smallest mobile screens (e.g., iPhone SE)
              slidesPerView={1}
              spaceBetween={16}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              // Advanced Responsive Breakpoints
              breakpoints={{
                // Large Mobile
                480: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                // Tablet Portrait
                640: {
                  slidesPerView: 1,
                  spaceBetween: 24,
                },
                // Tablet Landscape
                768: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                // Laptop / Desktop
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              modules={[Autoplay, Pagination]}
              className="pb-14 sm:pb-16 md:pb-20 w-full"
            >
              {reviews.map((review) => (
                <SwiperSlide
                  key={review._id}
                  className="pt-4 pb-4 flex !h-auto w-full"
                >
                  <div className="w-full bg-base-100 dark:bg-gray-800 shadow-sm hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 rounded-3xl p-5 sm:p-6 lg:p-8 h-full flex flex-col relative border border-base-200/60 dark:border-gray-700 overflow-hidden group">
                    {/* Decorative Background Quote Icon */}
                    <div className="absolute top-4 right-4 text-base-200 dark:text-gray-700/50 group-hover:text-primary/5 transition-colors duration-300 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    {/* Top Header: Avatar & Info */}
                    <div className="flex items-start justify-between mb-4 sm:mb-5 lg:mb-6 relative z-10 w-full">
                      <div className="flex items-center gap-3 sm:gap-4 w-full overflow-hidden">
                        <img
                          src={
                            review.reviewerImage ||
                            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                          }
                          alt={review.reviewerName}
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-primary/20 dark:ring-primary/40 shadow-sm shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-sm sm:text-base lg:text-lg text-base-content dark:text-white leading-tight truncate">
                            {review.reviewerName}
                          </h3>
                          <span className="text-[10px] sm:text-[11px] lg:text-xs font-medium text-base-content/50 dark:text-gray-400 block mt-0.5 truncate">
                            {review.date
                              ? new Date(review.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  },
                                )
                              : "Recent Customer"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Visual Star Rating */}
                    <div className="flex gap-0.5 sm:gap-1 mb-3 sm:mb-4 relative z-10 shrink-0">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${index < (review.rating || 5) ? "text-amber-400 fill-amber-400" : "text-base-300 dark:text-gray-600 fill-base-300 dark:fill-gray-600"}`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-base-content/80 dark:text-gray-300 flex-grow leading-relaxed relative z-10 mb-4 sm:mb-5 lg:mb-6 text-[13px] sm:text-sm line-clamp-4 sm:line-clamp-5">
                      "{review.comment}"
                    </p>

                    {/* Footer Badge (Meal Context) */}
                    <div className="mt-auto pt-4 border-t border-base-200/60 dark:border-gray-700 relative z-10 shrink-0 w-full overflow-hidden">
                      <span className="inline-flex items-center gap-1.5 bg-base-200/50 dark:bg-gray-700/50 text-base-content/80 dark:text-gray-300 px-2 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-[11px] lg:text-xs font-semibold w-full">
                        <svg
                          className="w-3.5 h-3.5 text-primary shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                          ></path>
                        </svg>
                        <span className="truncate w-full">
                          Reviewed: {review.mealName || "A Delicious Meal"}
                        </span>
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CustomerReviews;
