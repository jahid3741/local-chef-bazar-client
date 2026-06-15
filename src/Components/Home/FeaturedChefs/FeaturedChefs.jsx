import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const FeaturedChefs = () => {
  const chefs = [
    {
      name: "Sarah Johnson",
      specialty: "Italian Cuisine",
      rating: 4.9,
      image: "https://i.pravatar.cc/150?u=1",
    },
    {
      name: "Ahmed Khan",
      specialty: "Desi/Bengali",
      rating: 4.8,
      image: "https://i.pravatar.cc/150?u=2",
    },
    {
      name: "Maria Garcia",
      specialty: "Mexican Fusion",
      rating: 5.0,
      image: "https://i.pravatar.cc/150?u=3",
    },
  ];

  return (
    <div className="py-16 sm:py-20 lg:py-24 bg-base-100 dark:bg-gray-900 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-base-content dark:text-white">
            Meet Our <span className="text-primary">Top Chefs</span>
          </h2>
          <p className="text-base-content/70 mt-2">
            Professional local cooks trusted by our community.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {chefs.map((chef, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-base-200/50 dark:bg-gray-800 p-6 rounded-3xl text-center border border-base-200 dark:border-gray-700"
            >
              <img
                src={chef.image}
                alt={chef.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white dark:border-gray-700 shadow-lg"
              />
              <h3 className="text-xl font-bold dark:text-white">{chef.name}</h3>
              <p className="text-primary font-medium mb-3">{chef.specialty}</p>
              <div className="flex justify-center items-center gap-1 text-amber-500">
                <FaStar />{" "}
                <span className="text-base-content dark:text-gray-300 font-bold">
                  {chef.rating}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedChefs;
