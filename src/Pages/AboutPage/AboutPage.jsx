import React from "react";
import { Link } from "react-router";

const AboutPage = () => {
  return (
    // FIX 1: Removed hardcoded background/text colors so it inherits from MainLayout
    <main className="min-h-screen transition-colors duration-300 w-full pb-20">
      {/* Hero Section */}
      {/* FIX 2: Used a subtle opacity background (black/5 and white/5) that works automatically in both modes */}
      <section className="relative w-full py-20 bg-black/5 dark:bg-white/5 flex flex-col items-center justify-center text-center px-4 sm:px-8 mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[var(--text-base)] tracking-tight">
          About Local Chef Bazar
        </h1>
        <p className="max-w-2xl text-lg text-[var(--text-base)] opacity-80 leading-relaxed">
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
            className="w-full h-auto object-cover rounded-[var(--radius-3xl)] shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-[var(--text-base)]">
            Our Mission
          </h2>
          <p className="text-[var(--text-base)] opacity-70 mb-4 leading-relaxed">
            At Local Chef Bazar, we believe that the best meals aren't always
            found in commercial restaurants. They are crafted in the kitchens of
            passionate home cooks and local culinary artisans.
          </p>
          <p className="text-[var(--text-base)] opacity-70 leading-relaxed">
            Our mission is to empower these talented individuals by providing
            them with a platform to share their culinary heritage, while
            offering food enthusiasts access to healthy, diverse, and authentic
            homemade meals.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--text-base)]">
            Our Core Values
          </h2>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Value Card 1 */}
          {/* FIX 3: Used your global "card" class */}
          <div className="card p-8 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
            {/* FIX 4: Used global primary color instead of hardcoded blue */}
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 text-3xl">
              🌱
            </div>
            <h3 className="text-xl font-bold mb-3 text-[var(--text-base)]">
              Authenticity
            </h3>
            <p className="text-[var(--text-base)] opacity-70">
              We prioritize real food made by real people. Every dish tells a
              story of culture, tradition, and personal passion.
            </p>
          </div>

          {/* Value Card 2 */}
          <div className="card p-8 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
            <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-6 text-3xl">
              🤝
            </div>
            <h3 className="text-xl font-bold mb-3 text-[var(--text-base)]">
              Community
            </h3>
            <p className="text-[var(--text-base)] opacity-70">
              We are building a neighborhood ecosystem that supports local
              economies and fosters meaningful connections through food.
            </p>
          </div>

          {/* Value Card 3 */}
          <div className="card p-8 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
            <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mb-6 text-3xl">
              ✨
            </div>
            <h3 className="text-xl font-bold mb-3 text-[var(--text-base)]">
              Quality Standard
            </h3>
            <p className="text-[var(--text-base)] opacity-70">
              Hygiene and food safety are our top priorities. We verify our
              chefs to ensure every meal meets high health standards.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-8 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-[var(--text-base)]">
          Ready to Taste the Difference?
        </h2>
        <p className="text-lg text-[var(--text-base)] opacity-70 mb-8">
          Whether you are looking to share your signature dish with the
          community or hoping to discover your new favorite meal, Local Chef
          Bazar is your starting point.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* FIX 5: Standardized buttons to your design system */}
          <Link
            to="/meals"
            className="btn bg-primary text-white hover:bg-primary/90"
          >
            Explore Meals
          </Link>
          <Link
            to="/register"
            className="btn border-2 border-primary text-primary hover:bg-primary/10 bg-transparent"
          >
            Become a Chef
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
