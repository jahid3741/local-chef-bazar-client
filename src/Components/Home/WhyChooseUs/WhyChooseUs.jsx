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
    <div className="bg-base-100 py-24 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[5%] w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-[10%] -right-[5%] w-96 h-96 bg-secondary/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">
            Our Features
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5 text-base-content">
            Why{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Choose Us
            </span>
          </h2>
          <p className="text-base-content/70 text-lg">
            We provide the best homemade meal experience, crafted with love and
            delivered with care.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-base-100 shadow-lg hover:shadow-2xl border border-base-200/50 rounded-3xl p-10 text-center transition-all duration-300 relative group overflow-hidden"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/5 rounded-full scale-0 group-hover:scale-[3] transition-transform duration-700 ease-out z-0"></div>

              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto bg-base-200 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-transparent group-hover:-translate-y-2 transition-all duration-300">
                  <div className="text-4xl text-primary drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-base-content group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-base-content/70 leading-relaxed font-medium">
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
