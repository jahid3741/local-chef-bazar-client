import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { useEffect, useState } from "react";

import Swal from "sweetalert2";

import { useNavigate } from "react-router";

import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";

import useAuth from "../../Hooks/UseAuth/UseAuth";

const CheckoutForm = ({ order }) => {
  const stripe = useStripe();

  const elements = useElements();

  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();

  const [clientSecret, setClientSecret] = useState("");

  const [processing, setProcessing] = useState(false);

  const totalPrice = order.price * order.quantity;

  // create payment intent
  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", {
          price: totalPrice,
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  // submit payment
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    setProcessing(true);

    // create payment method
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      Swal.fire({
        icon: "error",
        title: error.message,
      });

      setProcessing(false);

      return;
    }

    // confirm payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,

        billing_details: {
          email: user?.email,

          name: user?.displayName,
        },
      },
    });

    // payment success
    if (result.paymentIntent?.status === "succeeded") {
      const paymentData = {
        orderId: order._id,

        userEmail: user?.email,

        amount: totalPrice,

        transactionId: result.paymentIntent.id,

        paymentMethod: "stripe",
      };

      // save payment
      const res = await axiosSecure.post("/payments", paymentData);

      if (res.data.paymentResult.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Payment Successful",
        });

        navigate("/dashboard/payment-success");
      }
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CardElement className="border rounded-lg p-4" />

      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="btn btn-primary w-full"
      >
        {processing ? "Processing..." : `Pay $${totalPrice}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
