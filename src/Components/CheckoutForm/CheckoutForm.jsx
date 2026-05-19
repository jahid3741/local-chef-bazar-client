import { useEffect, useState } from "react";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import Swal from "sweetalert2";

import { useNavigate } from "react-router";
import useAuth from "../../Hooks/UseAuth/UseAuth";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";


const CheckoutForm = ({ order }) => {
  const stripe = useStripe();

  const elements = useElements();

  const navigate = useNavigate();

  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const [clientSecret, setClientSecret] = useState("");

  const [error, setError] = useState("");

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

  // handle payment
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    if (!card) return;

    setProcessing(true);

    // validate card
    const { error: cardError } = await stripe.createPaymentMethod({
      type: "card",

      card,
    });

    if (cardError) {
      setError(cardError.message);

      setProcessing(false);

      return;
    }

    setError("");

    // confirm payment
    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,

          billing_details: {
            name: user?.displayName || "Anonymous",

            email: user?.email,
          },
        },
      },
    );

    if (error) {
      setError(error.message);

      setProcessing(false);

      return;
    }

    // success payment
    if (paymentIntent.status === "succeeded") {
      const paymentData = {
        orderId: order._id,

        transactionId: paymentIntent.id,

        amount: totalPrice,

        userEmail: user?.email,

        paymentTime: new Date().toISOString(),
      };

      const res = await axiosSecure.post("/payments", paymentData);

      if (res.data.paymentResult.insertedId) {
        Swal.fire({
          icon: "success",

          title: "Payment Successful!",
        });

        navigate("/dashboard/my-orders");
      }
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="border rounded-xl p-5">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
              },
            },
          }}
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

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
