import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail } from "react-icons/fi";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import axiosPublic from "../../../Api/AxiosPublic/AxiosPublic";


const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const response = await axiosPublic.post("/newsletter", { email });

      if (response.data.insertedId) {
        setStatus("success");
        Swal.fire({
          icon: "success",
          title: "Welcome to the club!",
          text: "You have successfully subscribed to our newsletter.",
          confirmButtonColor: "var(--color-primary)",
        });
        setEmail("");
      }
    } catch (error) {
      setStatus("error");
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
        confirmButtonColor: "var(--color-primary)",
      });
    } finally {
      if (status !== "success") setStatus("idle");
    }
  };

  return (
    <div className="py-16 sm:py-20 lg:py-24 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-primary to-secondary rounded-[2rem] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl"
      >
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Content Column */}
          <div className="text-center lg:text-left flex-1 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
              Get Exclusive Offers & <br className="hidden sm:block" /> Local
              Chef Updates
            </h2>
            <p className="text-white/85 text-base sm:text-lg font-medium mb-8 leading-relaxed">
              Subscribe to receive special discounts, new chef announcements,
              seasonal meal collections, and exclusive food recommendations.
            </p>

            {/* Social Proof Checklist */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-sm font-bold text-white/90">
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-white text-lg drop-shadow-sm" />{" "}
                5,000+ Subscribers
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-white text-lg drop-shadow-sm" />{" "}
                Weekly Meal Updates
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-white text-lg drop-shadow-sm" />{" "}
                Exclusive Discounts
              </span>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="w-full lg:w-[480px] shrink-0 relative">
            {/* Floating Statistics Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="hidden sm:flex absolute -top-8 -right-4 lg:-right-8 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-2xl items-center gap-2 shadow-xl z-20"
            >
              <div className="bg-amber-400 p-1.5 rounded-full text-amber-900">
                <FaStar className="text-xs" />
              </div>
              <span className="font-bold text-sm tracking-wide">
                5,000+ Happy Subscribers
              </span>
            </motion.div>

            <form
              onSubmit={handleSubscribe}
              className="relative flex flex-col sm:flex-row items-center w-full mt-6 sm:mt-0"
            >
              <div className="absolute left-5 sm:left-6 text-[var(--text-base)] opacity-40 top-1/2 -translate-y-1/2 hidden sm:block">
                <FiMail className="text-xl" />
              </div>

              <input
                type="email"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading" || status === "success"}
                className="w-full bg-[var(--bg-base)] text-[var(--text-base)] px-6 sm:pl-16 sm:pr-40 py-4 sm:py-6 rounded-2xl sm:rounded-full outline-none focus:ring-4 focus:ring-white/30 transition-all font-medium shadow-inner placeholder:text-[var(--text-base)] placeholder:opacity-40 text-base disabled:opacity-70"
              />

              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="w-full sm:w-auto mt-3 sm:mt-0 sm:absolute sm:right-2 sm:top-2 sm:bottom-2 bg-gray-900 text-white dark:bg-primary px-8 py-4 sm:py-0 rounded-xl sm:rounded-full font-bold hover:scale-[0.98] transition-transform text-base disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
              >
                {status === "loading" ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Subscribing...
                  </>
                ) : status === "success" ? (
                  "Subscribed ✓"
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Newsletter;
