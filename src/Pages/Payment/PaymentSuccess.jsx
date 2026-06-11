import { motion } from "framer-motion";
import { Link } from "react-router";
import { FiCheckCircle, FiShoppingBag, FiHome } from "react-icons/fi";

const PaymentSuccess = () => {
  return (
    <div className="min-h-[80vh] flex justify-center items-center p-4 bg-base-200/30">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-base-100 shadow-2xl rounded-[2.5rem] p-10 md:p-14 text-center max-w-lg w-full relative overflow-hidden border border-base-200/50"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-success/50 via-success to-success/50"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-success/5 rounded-full blur-3xl -z-10"></div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2,
          }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-success/20 rounded-full animate-ping"></div>
            <div className="bg-success/10 text-success p-6 rounded-full relative z-10">
              <FiCheckCircle className="text-6xl md:text-7xl drop-shadow-sm" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-4xl font-extrabold text-base-content tracking-tight mb-4">
            Payment <span className="text-success">Successful!</span>
          </h2>
          <p className="text-base-content/60 text-lg font-medium mb-10 leading-relaxed">
            Thank you for your purchase. Your payment has been processed
            securely and your chef is now preparing your meal.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/my-orders"
            className="btn btn-primary rounded-full px-8 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all duration-300"
          >
            <FiShoppingBag className="text-lg" /> View Orders
          </Link>
          <Link
            to="/"
            className="btn btn-ghost bg-base-200/50 rounded-full px-8 hover:bg-base-200 hover:-translate-y-1 transition-all duration-300"
          >
            <FiHome className="text-lg" /> Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
