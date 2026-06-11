import { useState } from "react";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Client-Side Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
    }
    return newErrors;
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setStatus("loading");

    // Simulate API Call to your Express Backend
    try {
      // Example implementation for your actual backend:
      // await axios.post(`${import.meta.env.VITE_API_URL}/api/contact`, formData);

      await new Promise((resolve) => setTimeout(resolve, 1500)); // Mock delay
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" }); // Reset form
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a question about an order, want to become a chef, or just want
            to say hello? Drop us a message and our support team will get back
            to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Information (Left Column - Span 2) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Head Office
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Dhanmondi, Dhaka, Bangladesh
                      <br />
                      Local Chef Bazar HQ
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Email Us
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      support@localchefbazar.com
                      <br />
                      partnerships@localchefbazar.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Call Us
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      +880 1234-567890
                      <br />
                      Mon - Fri, 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (Right Column - Span 3) */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              {/* Success Message */}
              {status === "success" && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-xl flex items-center gap-3">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Your message has been sent successfully! We will get back to
                  you soon.
                </div>
              )}

              {/* Error Message */}
              {status === "error" && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl">
                  Something went wrong. Please try again later.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.name ? "border-red-500" : "border-gray-200 dark:border-gray-700"}`}
                      placeholder="Md Jahidul Islam"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.email ? "border-red-500" : "border-gray-200 dark:border-gray-700"}`}
                      placeholder="hello@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.subject ? "border-red-500" : "border-gray-200 dark:border-gray-700"}`}
                    placeholder="How can we help you?"
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message Textarea */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none ${errors.message ? "border-red-500" : "border-gray-200 dark:border-gray-700"}`}
                    placeholder="Write your message here..."
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
