import { FaUtensils, FaTruck, FaStar } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: <FaUtensils />,
      title: "Fresh Homemade Meals",
      description:
        "Enjoy healthy and delicious homemade meals prepared by experienced local chefs.",
    },

    {
      id: 2,
      icon: <FaTruck />,
      title: "Fast Delivery",
      description:
        "Quick and reliable food delivery service right to your doorstep.",
    },

    {
      id: 3,
      icon: <FaStar />,
      title: "Top Rated Chefs",
      description:
        "Discover meals from highly rated chefs trusted by hundreds of customers.",
    },
  ];

  return (
    <div className="bg-base-200 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>

          <p className="text-gray-500">
            We provide the best homemade meal experience
          </p>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-base-100 shadow-xl rounded-2xl p-8 text-center hover:scale-105 duration-300"
            >
              <div className="text-5xl text-primary flex justify-center mb-5">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>

              <p className="text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
