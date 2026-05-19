import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/UseAxiosPublic/UseAxiosPublic";

const CustomerReviews = () => {
  const axiosPublic = useAxiosPublic();

  const [reviews, setReviews] = useState([]);

  // load reviews
  useEffect(() => {
    axiosPublic
      .get("/reviews")
      .then((res) => {
        setReviews(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosPublic]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      {/* heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Customer Reviews</h2>

        <p className="text-gray-500">What our customers say about us</p>
      </div>

      {/* review cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-base-100 shadow-xl rounded-2xl p-6"
          >
            {/* user */}
            <div className="flex items-center gap-4 mb-5">
              <img
                src={review.reviewerImage}
                alt=""
                className="w-14 h-14 rounded-full object-cover"
              />

              <div>
                <h3 className="font-bold text-lg">{review.reviewerName}</h3>

                <p className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* rating */}
            <div className="mb-4">
              <p className="font-semibold">⭐ {review.rating}/5</p>
            </div>

            {/* comment */}
            <p className="text-gray-600">"{review.comment}"</p>

            {/* meal */}
            <div className="mt-5">
              <span className="badge badge-primary">{review.mealName}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
