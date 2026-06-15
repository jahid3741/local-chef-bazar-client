import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaCheckCircle } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="hero min-h-screen sm:min-h-[90vh] bg-gradient-to-b from-base-200/50 to-base-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden relative transition-colors duration-300 py-16 lg:py-0 flex items-center">
      <div className="hero-content flex-col lg:flex-row-reverse max-w-7xl w-full px-4 sm:px-6 lg:px-8 gap-12 lg:gap-16 items-center">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-[300px] sm:max-w-sm md:max-w-md lg:max-w-lg mt-8 lg:mt-0 flex-shrink-0"
        >
          {/* Premium Animated Glow */}
          <div className="absolute inset-0 bg-primary/30 dark:bg-primary/20 blur-[100px] rounded-full scale-110"></div>

          <motion.div
            animate={{ y: [-12, 12, -12] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-primary/20 to-transparent blur-md"></div>
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop"
              alt="Delicious homemade food"
              className="relative w-full rounded-[2.5rem] shadow-2xl object-cover border-[6px] border-base-100/50 dark:border-gray-800/50 backdrop-blur-sm aspect-square lg:aspect-auto z-10"
            />
          </motion.div>
        </motion.div>

        {/* Text & Content Section */}
        <div className="flex-1 text-center lg:text-left z-10 w-full flex flex-col items-center lg:items-start">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold leading-[1.1] tracking-tight text-base-content dark:text-white"
          >
            Fresh Homemade <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary inline-block mt-2 sm:mt-4 pb-2">
              Meals Daily
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="pt-6 pb-4 sm:pt-8 sm:pb-6 text-base sm:text-lg lg:text-xl text-base-content/70 dark:text-gray-400 max-w-lg mx-auto lg:mx-0 leading-relaxed"
          >
            Discover delicious homemade meals from talented local chefs near
            you. Experience authentic flavors crafted with care.
          </motion.p>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 mb-8 text-sm font-semibold text-base-content/80 dark:text-gray-300"
          >
            <span className="flex items-center gap-1.5">
              <FaCheckCircle className="text-success text-lg" /> Verified Local
              Chefs
            </span>
            <span className="flex items-center gap-1.5">
              <FaCheckCircle className="text-success text-lg" /> Secure Payments
            </span>
            <span className="flex items-center gap-1.5">
              <FaCheckCircle className="text-success text-lg" /> Fresh Daily
              Meals
            </span>
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link to="/meals" className="w-full sm:w-auto">
              <button className="btn btn-primary btn-lg rounded-xl px-10 w-full sm:w-auto shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 border-none transition-all duration-300 text-white font-bold h-[3.5rem]">
                Explore Meals
              </button>
            </Link>
            <Link to="/register" className="w-full sm:w-auto">
              <button className="btn btn-outline btn-lg rounded-xl px-10 w-full sm:w-auto border-2 hover:-translate-y-1 transition-all duration-300 font-bold bg-base-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 h-[3.5rem]">
                Become a Chef
              </button>
            </Link>
          </motion.div>

          {/* Dynamic Statistics Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mt-12 pt-8 border-t border-base-200/80 dark:border-gray-700 w-full max-w-2xl text-center lg:text-left"
          >
            <div className="flex flex-col gap-1">
              <h4 className="text-3xl font-extrabold text-base-content dark:text-white">
                500<span className="text-primary">+</span>
              </h4>
              <p className="text-xs font-bold text-base-content/50 dark:text-gray-400 uppercase tracking-wider">
                Meals Served
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-3xl font-extrabold text-base-content dark:text-white">
                120<span className="text-primary">+</span>
              </h4>
              <p className="text-xs font-bold text-base-content/50 dark:text-gray-400 uppercase tracking-wider">
                Local Chefs
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-3xl font-extrabold text-base-content dark:text-white">
                5k<span className="text-primary">+</span>
              </h4>
              <p className="text-xs font-bold text-base-content/50 dark:text-gray-400 uppercase tracking-wider">
                Delivered
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-3xl font-extrabold text-base-content dark:text-white">
                4.9
              </h4>
              <p className="text-xs font-bold text-base-content/50 dark:text-gray-400 uppercase tracking-wider">
                Avg Rating
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
