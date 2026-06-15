import { motion } from "framer-motion";
import { FiSearch, FiCheckSquare, FiTruck } from "react-icons/fi";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FiSearch />,
      title: "Discover Meals",
      description:
        "Browse through hundreds of fresh, homemade meals prepared by local chefs near you.",
    },
    {
      id: 2,
      icon: <FiCheckSquare />,
      title: "Place Your Order",
      description:
        "Select your favorite dishes, customize your order, and pay securely online.",
    },
    {
      id: 3,
      icon: <FiTruck />,
      title: "Fast Delivery",
      description:
        "Enjoy hot, delicious homemade food delivered directly to your doorstep.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="bg-base-200/30 dark:bg-gray-900/40 py-16 sm:py-20 lg:py-24 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
          <span className="bg-secondary/10 text-secondary font-bold tracking-widest uppercase text-[10px] sm:text-xs px-3 py-1.5 rounded-full mb-3 inline-block">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-base-content dark:text-white">
            How It <span className="text-secondary">Works</span>
          </h2>
          <p className="text-base-content/70 dark:text-gray-400 text-sm sm:text-base">
            Getting fresh, homemade food has never been easier. Follow these
            simple steps.
          </p>
        </div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {/* Decorative Dashed Line connecting steps (Hidden on Mobile) */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-base-300 dark:border-gray-700 z-0"></div>

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-base-100 dark:bg-gray-800 rounded-full flex items-center justify-center shadow-xl border-4 border-base-100 dark:border-gray-900 mb-6 group-hover:-translate-y-2 transition-transform duration-300 relative">
                <div className="absolute inset-0 bg-secondary/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                <div className="text-3xl sm:text-4xl text-secondary z-10">
                  {step.icon}
                </div>

                {/* Step Number Badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white font-bold rounded-full flex items-center justify-center border-4 border-base-100 dark:border-gray-900 shadow-sm text-sm">
                  {step.id}
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-base-content dark:text-white">
                {step.title}
              </h3>
              <p className="text-base-content/70 dark:text-gray-400 font-medium max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;
