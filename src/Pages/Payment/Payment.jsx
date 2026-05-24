import { useEffect, useState } from "react";

import { useParams } from "react-router";

import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "../../Components/CheckoutForm/CheckoutForm";

import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const { id } = useParams();

  const axiosSecure = useAxiosSecure();

  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(true);

  // load order
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

  // loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // no order
  if (!order) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">Order Not Found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <div className="bg-base-100 shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Complete Payment
        </h2>

        {/* order info */}
        <div className="mb-8 space-y-4 border-b pb-6">
          <p>
            <span className="font-bold">Meal:</span> {order.mealName}
          </p>

          <p>
            <span className="font-bold">Quantity:</span> {order.quantity}
          </p>

          <p>
            <span className="font-bold">Order Status:</span>{" "}
            <span className="capitalize">{order.orderStatus}</span>
          </p>

          <p>
            <span className="font-bold">Payment Status:</span>{" "}
            <span className="capitalize">{order.paymentStatus}</span>
          </p>

          <p className="text-xl font-bold text-primary">
            Total: ${order.price * order.quantity}
          </p>
        </div>

        {/* stripe payment */}
        <Elements stripe={stripePromise}>
          <CheckoutForm order={order} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
