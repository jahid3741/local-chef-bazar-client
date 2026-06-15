import { motion } from "framer-motion";
import { FaUtensils, FaTruck, FaStar } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: <FaUtensils />,
      title: "Fresh Homemade Meals",
      description:
        "Enjoy healthy and delicious homemade meals prepared by experienced local chefs.",
    },
    {
      id: 2,
      icon: <FaTruck />,
      title: "Fast Delivery",
      description:
        "Quick and reliable food delivery service right to your doorstep.",
    },
    {
      id: 3,
      icon: <FaStar />,
      title: "Top Rated Chefs",
      description:
        "Discover meals from highly rated chefs trusted by hundreds of customers.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-base-100 dark:bg-gray-900 py-16 sm:py-20 lg:py-24 relative overflow-hidden transition-colors duration-300 w-full max-w-full">
      {/* Abstract Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[5%] w-72 sm:w-96 h-72 sm:h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-[80px] sm:blur-[100px]"></div>
        <div className="absolute -bottom-[10%] -right-[5%] w-72 sm:w-96 h-72 sm:h-96 bg-secondary/10 dark:bg-secondary/5 rounded-full blur-[80px] sm:blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header Section (Synced with other components) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto px-2"
        >
          <span className="bg-primary/10 text-primary font-bold tracking-widest uppercase text-[10px] sm:text-xs px-3 sm:px-4 py-1.5 rounded-full mb-3 sm:mb-4 inline-block">
            Our Features
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-5 text-base-content dark:text-white leading-tight">
            Why{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Choose Us
            </span>
          </h2>
          <p className="text-base-content/70 dark:text-gray-400 text-sm sm:text-base md:text-lg">
            We provide the best homemade meal experience, crafted with love and
            delivered with care.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 xl:gap-10"
        >
          {features?.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="bg-base-100 dark:bg-gray-800 shadow-sm hover:shadow-2xl dark:hover:shadow-primary/5 border border-base-200/60 dark:border-gray-700 rounded-3xl p-8 sm:p-10 text-center transition-all duration-300 relative group overflow-hidden h-full flex flex-col items-center justify-center"
            >
              {/* Expandable Background Effect on Hover */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/5 dark:bg-primary/10 rounded-full scale-0 group-hover:scale-[4] sm:group-hover:scale-[5] transition-transform duration-700 ease-out z-0"></div>

              <div className="relative z-10 w-full">
                {/* Icon Container */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-base-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 group-hover:bg-transparent group-hover:-translate-y-1 sm:group-hover:-translate-y-2 transition-all duration-300 shadow-inner group-hover:shadow-none">
                  <div className="text-3xl sm:text-4xl text-primary drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>

                {/* Text Content */}
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-base-content dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-base-content/70 dark:text-gray-400 leading-relaxed font-medium text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
