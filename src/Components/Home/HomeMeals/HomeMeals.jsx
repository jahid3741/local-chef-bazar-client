import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAxiosPublic from "../../../Hooks/UseAxiosPublic/UseAxiosPublic";
import MealCard from "../../Cards/MealCard/MealCard";

const HomeMeals = () => {
  const axiosPublic = useAxiosPublic();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    axiosPublic
      .get("/meals?limit=6")
      .then((res) => {
        setMeals(res.data.meals);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosPublic]);

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
    <div className="bg-base-100 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">
            Our Menu
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5 text-base-content">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Daily Meals
            </span>
          </h2>
          <p className="text-base-content/70 text-lg">
            Discover our carefully curated selection of fresh, homemade meals
            prepared with love by talented local chefs in your area.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10"
        >
          {meals.map((meal) => (
            <motion.div key={meal._id} variants={itemVariants}>
              <MealCard meal={meal} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HomeMeals;
