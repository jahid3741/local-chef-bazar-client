import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";

const Faq = () => {
  const faqs = [
    {
      q: "How are the meals prepared?",
      a: "Our local chefs prepare meals in their registered kitchens following strict hygiene standards.",
    },
    {
      q: "Can I customize my order?",
      a: "Yes! Many of our chefs allow you to adjust spice levels and ingredient preferences.",
    },
    {
      q: "How does delivery work?",
      a: "We use local delivery partners to ensure your meal arrives fresh and warm.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="py-16 sm:py-20 lg:py-24 bg-base-200/30 dark:bg-gray-900/40 w-full">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center mb-10 dark:text-white">
          Frequently Asked <span className="text-primary">Questions</span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-base-100 dark:bg-gray-800 rounded-2xl overflow-hidden border border-base-200 dark:border-gray-700"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full p-6 flex justify-between items-center font-bold text-lg dark:text-white"
              >
                {faq.q}
                {activeIndex === i ? <FiMinus /> : <FiPlus />}
              </button>
              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="px-6 pb-6 text-base-content/70 dark:text-gray-400"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
