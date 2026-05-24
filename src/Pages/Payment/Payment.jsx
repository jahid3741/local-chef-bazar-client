import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";
import {
  FiCreditCard,
  FiShoppingBag,
  FiPackage,
  FiTag,
  FiInfo,
  FiLock,
} from "react-icons/fi";
import CheckoutForm from "../../Components/CheckoutForm/CheckoutForm";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get(`/orders/single/${id}`)
      .then((res) => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [axiosSecure, id]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-base-content/60 font-medium animate-pulse">
          Loading payment details...
        </p>
      </div>
    );
  }

  if (!order) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col justify-center items-center min-h-[60vh] text-center px-4"
      >
        <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center mb-6">
          <FiInfo className="text-5xl text-base-content/30" />
        </div>
        <h2 className="text-3xl font-bold text-base-content mb-2">
          Order Not Found
        </h2>
        <p className="text-base-content/60">
          The order you are trying to pay for does not exist or has been
          removed.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-base-content flex items-center justify-center gap-3">
          Secure Checkout <FiLock className="text-primary" />
        </h2>
        <p className="text-base-content/60 mt-2 font-medium">
          Review your order details and complete your payment
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="bg-base-100 shadow-xl border border-base-200/50 rounded-3xl p-6 md:p-8">
            <h3 className="text-xl font-bold border-b border-base-200 pb-4 mb-6 flex items-center gap-2">
              <FiShoppingBag className="text-primary" /> Order Summary
            </h3>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-base-200 rounded-xl text-base-content/60 mt-0.5">
                  <FiPackage className="text-lg" />
                </div>
                <div>
                  <p className="text-xs font-bold text-base-content/50 uppercase tracking-wider mb-1">
                    Meal
                  </p>
                  <p className="font-semibold text-base-content text-lg leading-tight">
                    {order.mealName}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-base-200 rounded-xl text-base-content/60 mt-0.5">
                  <FiTag className="text-lg" />
                </div>
                <div>
                  <p className="text-xs font-bold text-base-content/50 uppercase tracking-wider mb-1">
                    Quantity
                  </p>
                  <p className="font-semibold text-base-content">
                    {order.quantity}x
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-base-200/50 p-4 rounded-2xl border border-base-200">
                  <p className="text-[10px] font-bold text-base-content/50 uppercase tracking-wider mb-1">
                    Order Status
                  </p>
                  <span
                    className={`badge badge-sm font-bold capitalize ${order.orderStatus === "accepted" ? "badge-info" : "badge-ghost"}`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
                <div className="bg-base-200/50 p-4 rounded-2xl border border-base-200">
                  <p className="text-[10px] font-bold text-base-content/50 uppercase tracking-wider mb-1">
                    Payment Status
                  </p>
                  <span
                    className={`badge badge-sm font-bold capitalize ${order.paymentStatus === "pending" ? "badge-warning" : "badge-success"}`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-base-200">
              <div className="flex justify-between items-end bg-primary/10 p-5 rounded-2xl border border-primary/20">
                <p className="text-sm font-bold text-primary uppercase tracking-wider">
                  Total Amount
                </p>
                <p className="text-3xl font-black text-primary">
                  ${(order.price * order.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="bg-base-100 shadow-xl border border-base-200/50 rounded-3xl p-6 md:p-10 h-full">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <FiCreditCard className="text-primary" /> Payment Details
            </h3>

            <div className="bg-base-200/30 p-6 rounded-2xl border border-base-200">
              <Elements stripe={stripePromise}>
                <CheckoutForm order={order} />
              </Elements>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs font-medium text-base-content/50">
              <FiLock /> Payments are secure and encrypted via Stripe
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Payment;
