import { motion } from "framer-motion";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="hero min-h-[85vh] bg-base-200 overflow-hidden">
      <div className="hero-content flex-col lg:flex-row-reverse max-w-7xl">
        {/* image */}
        <motion.img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop"
          alt="food"
          className="max-w-sm lg:max-w-lg rounded-3xl shadow-2xl"
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />

        {/* text */}
        <div>
          <motion.h1
            initial={{
              opacity: 0,
              x: -100,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="text-5xl lg:text-7xl font-bold leading-tight"
          >
            Fresh Homemade
            <span className="text-primary block">Meals Daily</span>
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.5,
              duration: 1,
            }}
            className="py-6 text-lg text-gray-500"
          >
            Discover delicious homemade meals from talented local chefs near
            you.
          </motion.p>

          <motion.button
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="btn btn-primary btn-lg"
          >
            <Link to="/meals">Explore Meals</Link>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
