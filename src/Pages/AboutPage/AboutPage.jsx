import React from "react";
import { Link } from "react-router";

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <section className="relative w-full py-20 bg-blue-50 dark:bg-gray-800 flex flex-col items-center justify-center text-center px-4 sm:px-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white tracking-tight">
          About Local Chef Bazar
        </h1>
        <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Connecting passionate local chefs with food lovers craving authentic,
          homemade culinary experiences right in their neighborhood.
        </p>
      </section>

      {/* Our Mission Section */}
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Chef cooking in a kitchen"
            className="w-full h-auto object-cover rounded-xl shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Our Mission
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            At Local Chef Bazar, we believe that the best meals aren't always
            found in commercial restaurants. They are crafted in the kitchens of
            passionate home cooks and local culinary artisans.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Our mission is to empower these talented individuals by providing
            them with a platform to share their culinary heritage, while
            offering food enthusiasts access to healthy, diverse, and authentic
            homemade meals.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Our Core Values
          </h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Value Card 1 */}
          <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center mb-6 text-2xl">
              🌱
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Authenticity
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              We prioritize real food made by real people. Every dish tells a
              story of culture, tradition, and personal passion.
            </p>
          </div>

          {/* Value Card 2 */}
          <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-full flex items-center justify-center mb-6 text-2xl">
              🤝
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Community
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              We are building a neighborhood ecosystem that supports local
              economies and fosters meaningful connections through food.
            </p>
          </div>

          {/* Value Card 3 */}
          <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 rounded-full flex items-center justify-center mb-6 text-2xl">
              ✨
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Quality Standard
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Hygiene and food safety are our top priorities. We verify our
              chefs to ensure every meal meets high health standards.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-8 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Ready to Taste the Difference?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Whether you are looking to share your signature dish with the
          community or hoping to discover your new favorite meal, Local Chef
          Bazar is your starting point.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/explore"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
          >
            Explore Meals
          </Link>
          <Link
            to="/register"
            className="px-8 py-3 bg-transparent border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 font-semibold rounded-xl transition-colors"
          >
            Become a Chef
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
