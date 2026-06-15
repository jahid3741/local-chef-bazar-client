import { motion } from "framer-motion";
import { Link } from "react-router"; 

const Hero = () => {
  return (
    <div className="hero min-h-screen sm:min-h-[85vh] bg-gradient-to-b from-base-200 to-base-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden relative transition-colors duration-300 py-12 lg:py-0">
      <div className="hero-content flex-col lg:flex-row-reverse max-w-7xl w-full px-4 sm:px-6 lg:px-8 gap-8 sm:gap-12 lg:gap-16">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg mt-4 lg:mt-0"
        >
          {/* Animated Glow Behind Image */}
          <div className="absolute inset-0 bg-primary/30 dark:bg-primary/15 blur-[80px] sm:blur-[100px] rounded-full"></div>

          <motion.img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop"
            alt="Delicious homemade food"
            className="relative w-full rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl object-cover border border-base-200 dark:border-gray-700 aspect-square lg:aspect-auto"
            animate={{
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Text Section */}
        <div className="flex-1 text-center lg:text-left z-10 w-full flex flex-col items-center lg:items-start">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-base-content dark:text-white"
          >
            Fresh Homemade <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary inline-block mt-2 sm:mt-3 pb-2">
              Meals Daily
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="py-6 sm:py-8 text-base sm:text-lg lg:text-xl text-base-content/70 dark:text-gray-400 max-w-sm sm:max-w-lg mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0"
          >
            Discover delicious homemade meals from talented local chefs near
            you. Experience the comfort of authentic recipes crafted with care.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="w-full sm:w-auto"
          >
            <Link to="/meals" className="inline-block w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary btn-md sm:btn-lg rounded-full px-8 sm:px-10 w-full sm:w-auto shadow-xl shadow-primary/30 hover:shadow-primary/50 border-none transition-all duration-300 text-white font-bold"
              >
                Explore Meals
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
