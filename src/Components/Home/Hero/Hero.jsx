import { motion } from "framer-motion";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="hero min-h-[85vh] bg-gradient-to-b from-base-200 to-base-100 overflow-hidden relative">
      <div className="hero-content flex-col lg:flex-row-reverse max-w-7xl w-full px-4 lg:px-8 gap-10 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-sm lg:max-w-lg"
        >
          <div className="absolute inset-0 bg-primary/30 blur-[100px] rounded-full"></div>

          <motion.img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop"
            alt="food"
            className="relative w-full rounded-[2.5rem] shadow-2xl object-cover border border-base-200"
            animate={{
              y: [-15, 15, -15],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <div className="flex-1 text-center lg:text-left z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight text-base-content"
          >
            Fresh Homemade <br className="hidden lg:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary inline-block mt-2 pb-2">
              Meals Daily
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="py-8 text-lg lg:text-xl text-base-content/70 max-w-lg mx-auto lg:mx-0 leading-relaxed"
          >
            Discover delicious homemade meals from talented local chefs near
            you. Experience the comfort of authentic recipes crafted with care.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            <Link to="/meals" className="inline-block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary btn-lg rounded-full px-10 shadow-xl hover:shadow-primary/40 border-none transition-shadow duration-300"
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
