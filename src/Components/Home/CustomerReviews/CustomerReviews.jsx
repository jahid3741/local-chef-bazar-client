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

  useEffect(() => {
    axiosPublic
      .get("/reviews")
      .then((res) => {
        setReviews(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosPublic]);

  return (
    <div className="bg-base-200/30 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5 text-base-content">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Customers Say
            </span>
          </h2>
          <p className="text-base-content/70 text-lg">
            Real feedback from our wonderful customers who have experienced our
            homemade meals.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            modules={[Autoplay, Pagination]}
            className="pb-16"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id} className="h-auto">
                <div className="bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-3xl p-8 h-full flex flex-col relative border border-base-200/50">
                  <div className="absolute top-6 right-6 text-primary/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="relative">
                      <img
                        src={review.reviewerImage}
                        alt={review.reviewerName}
                        className="w-16 h-16 rounded-full object-cover ring-4 ring-primary/20"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-base-content">
                        {review.reviewerName}
                      </h3>
                      <p className="text-sm text-base-content/50 font-medium">
                        {new Date(review.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4 inline-block">
                    <span className="bg-orange-100 text-orange-600 px-3 py-1.5 rounded-lg font-bold text-sm flex items-center gap-1 w-max">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {review.rating}/5
                    </span>
                  </div>

                  <p className="text-base-content/80 italic flex-grow leading-relaxed relative z-10 text-justify">
                    "{review.comment}"
                  </p>

                  <div className="mt-6 pt-5 border-t border-base-200">
                    <span className="badge badge-primary badge-outline badge-md font-semibold px-4 py-3">
                      {review.mealName}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </div>
  );
};

export default CustomerReviews;
