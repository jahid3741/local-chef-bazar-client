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

  const [order, setOrder] = useState({});

  // load order
  useEffect(() => {
    axiosSecure.get(`/orders/single/${id}`).then((res) => {
      setOrder(res.data);
    });
  }, [axiosSecure, id]);

  return (
    <div className="max-w-3xl mx-auto py-16">
      <div className="bg-base-100 shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Complete Payment
        </h2>

        <div className="mb-8 space-y-3">
          <p>
            <span className="font-bold">Meal:</span> {order.mealName}
          </p>

          <p>
            <span className="font-bold">Quantity:</span> {order.quantity}
          </p>

          <p>
            <span className="font-bold">Total:</span> $
            {order.price * order.quantity}
          </p>
        </div>

        <Elements stripe={stripePromise}>
          <CheckoutForm order={order} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
