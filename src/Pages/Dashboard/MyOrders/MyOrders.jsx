import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  FiClock,
  FiUser,
  FiDollarSign,
  FiCreditCard,
  FiCheckCircle,
  FiPackage,
  FiShoppingBag,
  FiHash,
} from "react-icons/fi";
import useAuth from "../../../Hooks/UseAuth/UseAuth";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    if (user?.email) {
      setLoading(true); // Start loading
      axiosSecure
        .get(`/orders/user/${user.email}`)
        .then((res) => {
          setOrders(res.data);
          setLoading(false); // Stop loading when data arrives
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
          setLoading(false); // Stop loading on error
        });
    }
  }, [axiosSecure, user]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "badge-warning bg-warning/20 text-warning border-warning/30";
      case "accepted":
        return "badge-info bg-info/20 text-info border-info/30";
      case "delivered":
        return "badge-success bg-success/20 text-success border-success/30";
      case "cancelled":
        return "badge-error bg-error/20 text-error border-error/30";
      default:
        return "badge-ghost";
    }
  };

  const getPaymentColor = (status) => {
    return status?.toLowerCase() === "paid"
      ? "text-success bg-success/10 border-success/30"
      : "text-warning bg-warning/10 border-warning/30";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-base-content/60 font-medium animate-pulse">
          Fetching your orders...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-3xl font-extrabold text-base-content">
            My Orders
          </h2>
          <p className="text-base-content/60 mt-1 font-medium">
            Track and manage your meal purchases
          </p>
        </div>
        <div className="badge badge-primary badge-lg shadow-sm font-bold px-4 py-3">
          Total Orders: {orders.length}
        </div>
      </motion.div>

      {orders.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 xl:grid-cols-2 gap-6"
        >
          {orders.map((order) => (
            <motion.div
              variants={cardVariants}
              key={order._id}
              className="bg-base-100 shadow-xl border border-base-200/50 rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
            >
              <div className="bg-gradient-to-r from-base-200/50 to-base-100 p-6 border-b border-base-200 flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-base-content leading-tight mb-2">
                    {order.mealName}
                  </h3>
                  <div className="flex gap-2 flex-wrap mt-2">
                    <span
                      className={`badge px-3 py-3 font-bold uppercase tracking-wider text-[10px] ${getStatusColor(order.orderStatus)}`}
                    >
                      Order: {order.orderStatus}
                    </span>
                    <span
                      className={`badge px-3 py-3 font-bold uppercase tracking-wider text-[10px] border ${getPaymentColor(order.paymentStatus)}`}
                    >
                      Payment: {order.paymentStatus}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-base-content/50 uppercase tracking-wider mb-1">
                    Total
                  </p>
                  <p className="text-2xl font-black text-primary">
                    ${(order.price * order.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="p-6 flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-base-200/30 p-3 rounded-xl border border-base-200">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <FiDollarSign className="text-lg" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-base-content/50 uppercase">
                      Price per item
                    </p>
                    <p className="font-semibold text-base-content">
                      ${order.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-base-200/30 p-3 rounded-xl border border-base-200">
                  <div className="p-2 bg-secondary/10 text-secondary rounded-lg">
                    <FiPackage className="text-lg" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-base-content/50 uppercase">
                      Quantity
                    </p>
                    <p className="font-semibold text-base-content">
                      {order.quantity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-base-200/30 p-3 rounded-xl border border-base-200">
                  <div className="p-2 bg-accent/10 text-accent rounded-lg">
                    <FiClock className="text-lg" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-base-content/50 uppercase">
                      Delivery Time
                    </p>
                    <p className="font-semibold text-base-content">
                      {order.estimatedDeliveryTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-base-200/30 p-3 rounded-xl border border-base-200">
                  <div className="p-2 bg-info/10 text-info rounded-lg">
                    <FiUser className="text-lg" />
                  </div>
                  <div className="w-full overflow-hidden">
                    <p className="text-xs font-bold text-base-content/50 uppercase">
                      Chef
                    </p>
                    <p className="font-semibold text-base-content truncate">
                      {order.chefName}
                    </p>
                  </div>
                </div>

                <div className="sm:col-span-2 flex items-center gap-3 bg-base-200/30 p-3 rounded-xl border border-base-200">
                  <div className="p-2 bg-base-300 text-base-content/60 rounded-lg">
                    <FiHash className="text-lg" />
                  </div>
                  <div className="w-full overflow-hidden">
                    <p className="text-xs font-bold text-base-content/50 uppercase">
                      Chef ID
                    </p>
                    <p className="font-semibold text-base-content/80 text-sm font-mono truncate">
                      {order.chefId}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 mt-auto">
                {order.orderStatus === "accepted" &&
                order.paymentStatus === "pending" ? (
                  <Link
                    to={`/payment/${order._id}`}
                    className="btn btn-primary w-full rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all duration-300"
                  >
                    <FiCreditCard className="text-lg mr-1" /> Pay Now
                  </Link>
                ) : order.paymentStatus === "paid" ? (
                  <div className="flex items-center justify-center gap-2 bg-success/10 text-success py-3.5 rounded-xl font-bold border border-success/20">
                    <FiCheckCircle className="text-xl" /> Payment Completed
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 bg-base-200 text-base-content/50 py-3.5 rounded-xl font-bold border border-base-200">
                    Awaiting Acceptance
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-base-100 shadow-xl border border-base-200/50 rounded-3xl p-16 text-center mt-8"
        >
          <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiShoppingBag className="text-5xl text-base-content/30" />
          </div>
          <h2 className="text-2xl font-bold text-base-content mb-2">
            No Orders Found
          </h2>
          <p className="text-base-content/60 max-w-md mx-auto">
            You haven't placed any orders yet. Browse our delicious homemade
            meals and place your first order!
          </p>
          <Link
            to="/meals"
            className="btn btn-primary mt-8 rounded-full px-8 shadow-lg shadow-primary/30 hover:-translate-y-1 transition-transform"
          >
            Browse Meals
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default MyOrders;
