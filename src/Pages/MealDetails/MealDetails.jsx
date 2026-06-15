import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import ReviewSection from "../../Components/ReviewSection/ReviewSection";
import useAuth from "../../Hooks/UseAuth/UseAuth";
import Swal from "sweetalert2";
import axiosSecure from "../../Api/AxiosSecure/AxiosSecure";
import axiosPublic from "../../Api/AxiosPublic/AxiosPublic";

const MealDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState({});
  const [dbUser, setDbUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      axiosPublic
        .get(`/meals/${id}`)
        .then((res) => {
          setMeal(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch meal:", err);
          setIsLoading(false);
        });
    }

    if (user?.email) {
      axiosSecure
        .get(`/users/role/${user.email}`)
        .then((res) => {
          setDbUser(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [id, user?.email]);

  const {
    _id,
    foodName,
    chefName,
    chefId,
    foodImage,
    price,
    rating,
    ingredients,
    deliveryArea,
    estimatedDeliveryTime,
    chefExperience,
  } = meal;

  const handleOrderClick = () => {
    Swal.fire({
      icon: "info",
      title: "Authentication Required",
      text: "You need an account to place an order.",
      showCancelButton: true,
      confirmButtonText: "Login",
      cancelButtonText: "Register",
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#10b981",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        navigate("/register");
      }
    });
  };

  const handleFavorite = async () => {
    if (!user) {
      Swal.fire({
        icon: "info",
        title: "Authentication Required",
        text: "Please login to add this meal to your favorites list!",
      });
      return;
    }

    const favoriteData = {
      userEmail: user?.email,
      mealId: _id,
      mealName: foodName,
      chefId: chefId,
      chefName: chefName,
      price: price,
    };

    try {
      const res = await axiosSecure.post("/favorites", favoriteData);
      if (res.data.insertedId) {
        Swal.fire({ icon: "success", title: "Added to favorites!" });
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: error.response?.data?.message || "Already added",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-base-50/50 dark:bg-gray-900">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-base-100/50 dark:bg-gray-900 transition-colors duration-300 py-6 sm:py-10 lg:py-16 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>LocalChefBazaar | {foodName ? foodName : "Meal Details"}</title>
      </Helmet>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto bg-base-100 dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-base-200 dark:border-gray-700">
        {/* FIX: Rock-solid Grid Layout ensures perfect equal heights */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Column: Image Container */}
          <div className="w-full h-[350px] sm:h-[450px] lg:h-auto min-h-[300px]">
            <img
              src={foodImage}
              alt={foodName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Column: Details Container */}
          <div className="p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col h-full bg-base-100 dark:bg-gray-800">
            {/* Header Area */}
            <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start gap-4 mb-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-base-content dark:text-white leading-tight">
                {foodName}
              </h1>
              <div className="badge badge-primary py-4 px-6 text-xl sm:text-2xl font-bold rounded-xl text-white shrink-0 shadow-sm self-start">
                ৳ {price}
              </div>
            </div>

            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8">
              <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-bold px-4 py-1.5 rounded-xl text-sm flex items-center gap-1 shadow-sm">
                ⭐ {rating || "New"}
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold px-4 py-1.5 rounded-xl text-sm shadow-sm">
                📍 {deliveryArea}
              </div>
              <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-semibold px-4 py-1.5 rounded-xl text-sm shadow-sm">
                ⏱️ {estimatedDeliveryTime}
              </div>
            </div>

            {/* Chef Information Box */}
            <div className="bg-base-200/50 dark:bg-gray-700/50 rounded-2xl p-5 sm:p-6 border border-base-200 dark:border-gray-600 mb-8 space-y-4">
              <div className="flex justify-between items-center border-b border-base-300 dark:border-gray-600 pb-3">
                <span className="text-base-content/60 dark:text-gray-400 font-medium text-sm">
                  Prepared By
                </span>
                <span className="font-bold text-base-content dark:text-white text-base sm:text-lg text-right">
                  {chefName}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-base-300 dark:border-gray-600 pb-3">
                <span className="text-base-content/60 dark:text-gray-400 font-medium text-sm">
                  Chef Experience
                </span>
                <span className="font-semibold text-base-content dark:text-gray-200 text-sm sm:text-base text-right">
                  {chefExperience}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base-content/60 dark:text-gray-400 font-medium text-sm text-opacity-50">
                  Chef ID
                </span>
                <span className="font-mono text-xs text-base-content/40 dark:text-gray-500 truncate max-w-[150px] sm:max-w-full text-right">
                  {chefId}
                </span>
              </div>
            </div>

            {/* Ingredients Section */}
            <div className="mb-10">
              <h3 className="text-sm uppercase tracking-wider font-bold text-base-content/50 dark:text-gray-400 mb-4">
                Key Ingredients
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {ingredients?.map((ingredient, index) => (
                  <span
                    key={index}
                    className="bg-white dark:bg-gray-700 border border-base-300 dark:border-gray-600 text-base-content/80 dark:text-gray-200 text-sm font-medium px-4 py-2 rounded-xl shadow-sm"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons (Pushed to bottom naturally by mt-auto) */}
            <div className="mt-auto pt-6">
              {dbUser?.status === "fraud" ? (
                <div className="bg-error/10 border border-error/30 text-error p-4 rounded-2xl text-center font-bold text-sm sm:text-base">
                  ⚠️ Your account is restricted. You cannot place orders at this
                  time.
                </div>
              ) : !user ? (
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <button
                    onClick={handleOrderClick}
                    className="btn btn-primary rounded-xl px-8 py-3.5 h-auto shadow-lg shadow-primary/20 flex-1 font-bold text-white text-lg hover:-translate-y-0.5 transition-transform w-full"
                  >
                    Order Now
                  </button>
                  <button
                    onClick={handleFavorite}
                    className="btn btn-outline hover:bg-secondary hover:border-secondary hover:text-white rounded-xl px-8 py-3.5 h-auto flex-1 font-bold transition-all w-full text-lg"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      ></path>
                    </svg>
                    Favorite
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <Link
                    to={`/order/${_id}`}
                    className="btn btn-primary rounded-xl px-8 py-3.5 h-auto shadow-lg shadow-primary/20 flex-1 font-bold text-white text-lg hover:-translate-y-0.5 transition-transform w-full text-center flex items-center justify-center"
                  >
                    Order Now
                  </Link>
                  <button
                    onClick={handleFavorite}
                    className="btn btn-outline hover:bg-secondary hover:border-secondary hover:text-white rounded-xl px-8 py-3.5 h-auto flex-1 font-bold transition-all w-full text-lg"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      ></path>
                    </svg>
                    Favorite
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section: Reviews */}
        {_id && (
          <div className="bg-base-200/30 dark:bg-gray-900/40 p-6 sm:p-8 lg:p-12 border-t border-base-200 dark:border-gray-700">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-base-content dark:text-white">
              Customer Reviews
            </h2>
            <ReviewSection mealId={_id} />
          </div>
        )}
      </div>
    </main>
  );
};

export default MealDetails;
