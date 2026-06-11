import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { FiLock, FiShield } from "react-icons/fi";
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

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        fontFamily: "system-ui, -apple-system, sans-serif",
        "::placeholder": {
          color: "#aab7c4",
        },
        padding: "10px 0",
      },
      invalid: {
        color: "#ef4444",
        iconColor: "#ef4444",
      },
    },
    hidePostalCode: true,
  };

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

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      Swal.fire({
        icon: "error",
        title: error.message,
        confirmButtonColor: "#ef4444",
      });

      setProcessing(false);
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          email: user?.email,
          name: user?.displayName,
        },
      },
    });

    if (result.paymentIntent?.status === "succeeded") {
      const paymentData = {
        orderId: order._id,
        userEmail: user?.email,
        amount: totalPrice,
        transactionId: result.paymentIntent.id,
        paymentMethod: "stripe",
      };

      const res = await axiosSecure.post("/payments", paymentData);

      if (res.data.paymentResult.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          confirmButtonColor: "#10b981",
        });

        navigate("/payment-success");
      }
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-bold text-base-content/80 flex items-center gap-2 mb-1">
            <FiShield className="text-primary" /> Card Information
          </span>
        </label>

        <div className="p-4 bg-base-100 border border-base-300 rounded-xl shadow-inner focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all duration-300">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="btn btn-primary w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all duration-300 disabled:opacity-60 disabled:hover:translate-y-0 disabled:shadow-none"
      >
        {processing ? (
          <span className="loading loading-spinner loading-md text-white"></span>
        ) : (
          <span className="flex items-center gap-2">
            <FiLock className="text-xl" /> Pay ${totalPrice.toFixed(2)}
          </span>
        )}
      </button>
    </form>
  );
};

export default CheckoutForm;
