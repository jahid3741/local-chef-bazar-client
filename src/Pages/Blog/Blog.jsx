import React, { useState, useEffect } from "react";
import { Link } from "react-router";

// (Keep your mockBlogPosts array exactly the same as the previous step with the 16 items)
const mockBlogPosts = [
  {
    id: 1,
    title: "The Secret to Authentic Dhakai Kachchi Biryani",
    excerpt: "Master the traditional layers of meat, rice, and spices...",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    category: "Recipes",
    author: "Chef Rahima",
    date: "Jun 10, 2026",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Food Safety Standards for Home Kitchens",
    excerpt:
      "Ensuring your home kitchen meets professional standards is crucial...",
    image:
      "https://images.unsplash.com/photo-1490818387583-1b5ba4761002?auto=format&fit=crop&w=800&q=80",
    category: "Guide",
    author: "LCB Admin",
    date: "Jun 5, 2026",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "Why Fermented Foods Are Trending in Dhaka",
    excerpt:
      "From homemade yogurt to traditional pickles, fermented foods are taking over...",
    image:
      "https://images.unsplash.com/photo-1504669695573-f4f964fc5644?auto=format&fit=crop&w=800&q=80",
    category: "Health",
    author: "Nutritionist Anis",
    date: "May 28, 2026",
    readTime: "4 min read",
  },
  {
    id: 4,
    title: "Scaling Up: Cooking for 50 People from Home",
    excerpt: "Got your first large catering order? Don’t panic...",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
    category: "Business",
    author: "Chef Tariq",
    date: "May 20, 2026",
    readTime: "6 min read",
  },
  {
    id: 5,
    title: "The Art of Traditional Bengali Sweets",
    excerpt:
      "Rasgulla, Sandesh, and Mishti Doi. Dive into the delicate milk-based desserts...",
    image:
      "https://images.unsplash.com/photo-1563636619-edeaf80dac8e?auto=format&fit=crop&w=800&q=80",
    category: "Culture",
    author: "Chef Mita",
    date: "May 15, 2026",
    readTime: "5 min read",
  },
  {
    id: 6,
    title: "How to Price Your Homemade Meals",
    excerpt:
      "Struggling to find the sweet spot between profitable and affordable? Use our simple formula...",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    category: "Business",
    author: "LCB Finance Team",
    date: "May 10, 2026",
    readTime: "7 min read",
  },
  {
    id: 7,
    title: "5 Must-Try Street Foods Recreated at Home",
    excerpt:
      "Craving street food but want guaranteed hygiene? Check out these homemade versions...",
    image:
      "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&w=800&q=80",
    category: "Recipes",
    author: "Chef Tariq",
    date: "May 2, 2026",
    readTime: "4 min read",
  },
  {
    id: 8,
    title: "Sourcing the Freshest Spices in Bangladesh",
    excerpt:
      "The secret to a great dish is in the spices. We review the best local markets...",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    category: "Ingredients",
    author: "Local Chef Bazar",
    date: "Apr 25, 2026",
    readTime: "5 min read",
  },
  {
    id: 9,
    title: "Mastering the Art of Winter Pithas",
    excerpt:
      "Winter is incomplete without these warm treats. Learn the perfect rice flour to jaggery ratios...",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
    category: "Culture",
    author: "Chef Mita",
    date: "Apr 18, 2026",
    readTime: "6 min read",
  },
  {
    id: 10,
    title: "Packaging Liquid Foods for Safe Delivery",
    excerpt:
      "Spilled curries result in bad reviews. We test the top 3 sustainable packaging methods...",
    image:
      "https://images.unsplash.com/photo-1586190848861-99542a6d2524?auto=format&fit=crop&w=800&q=80",
    category: "Guide",
    author: "LCB Operations",
    date: "Apr 12, 2026",
    readTime: "4 min read",
  },
  {
    id: 11,
    title: "The Health Benefits of Mustard Oil",
    excerpt:
      "Once controversial, pure cold-pressed mustard oil is making a massive comeback...",
    image:
      "https://images.unsplash.com/photo-1476224203421-9ce393618115?auto=format&fit=crop&w=800&q=80",
    category: "Health",
    author: "Nutritionist Anis",
    date: "Apr 05, 2026",
    readTime: "5 min read",
  },
  {
    id: 12,
    title: "Interview: From Home Cook to 100 Orders a Day",
    excerpt:
      "Meet Sumaiya, a partner who transformed her small home kitchen in Dhanmondi into a thriving business.",
    image:
      "https://images.unsplash.com/photo-1581349489599-8e50810ec527?auto=format&fit=crop&w=800&q=80",
    category: "Community",
    author: "LCB Admin",
    date: "Mar 28, 2026",
    readTime: "10 min read",
  },
  {
    id: 13,
    title: "Vegan Alternatives for Classic Bengali Dishes",
    excerpt:
      "Can you make a rich Korma without dairy? Absolutely. Discover how cashew cream works...",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    category: "Recipes",
    author: "Chef Rahima",
    date: "Mar 22, 2026",
    readTime: "7 min read",
  },
  {
    id: 14,
    title: "Phone Photography: Making Food Look Irresistible",
    excerpt:
      "Learn how to use natural window light and your smartphone to take stunning photos...",
    image:
      "https://images.unsplash.com/photo-1414235077428-338988a2e8c0?auto=format&fit=crop&w=800&q=80",
    category: "Business",
    author: "LCB Media Team",
    date: "Mar 15, 2026",
    readTime: "6 min read",
  },
  {
    id: 15,
    title: "Navigating Food Allergies as a Chef",
    excerpt:
      "Understanding cross-contamination is vital. A quick guide to accommodating special dietary requests.",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
    category: "Guide",
    author: "Nutritionist Anis",
    date: "Mar 08, 2026",
    readTime: "8 min read",
  },
  {
    id: 16,
    title: "The History of Chattogram’s Kala Bhuna",
    excerpt:
      "It is not burnt; it is caramelized to perfection. Tracing the origins of this legendary dish.",
    image:
      "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80",
    category: "Culture",
    author: "Chef Tariq",
    date: "Mar 02, 2026",
    readTime: "6 min read",
  },
];

const Blog = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  // Debugging: Watch the current page state change
  console.log("Component Rendered! Current Page is now:", currentPage);

  useEffect(() => {
    // Scroll to top instantly when page changes
    window.scrollTo(0, 0);

    // Simulate loading for 500ms so you can see the skeleton effect when changing pages
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentPage]);

  // Calculate standard pagination mathematics
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = mockBlogPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(mockBlogPosts.length / postsPerPage);

  // Pagination Handlers
  const paginate = (pageNumber) => {
    console.log("Clicked Page Number:", pageNumber);
    setCurrentPage(pageNumber);
  };

  const goToNextPage = () => {
    console.log("Clicked NEXT");
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    console.log("Clicked PREV");
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
          The Culinary Chronicle
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover recipes, kitchen hacks, business tips for home chefs, and
          stories from the Local Chef Bazar community.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {isLoading
          ? Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden animate-pulse flex flex-col h-full"
              >
                <div className="w-full aspect-video bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-5 flex-grow flex flex-col">
                  <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded-xl mb-3"></div>
                  <div className="w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-xl mb-2"></div>
                  <div className="w-3/4 h-6 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
                  <div className="w-full h-16 bg-gray-200 dark:bg-gray-700 rounded-xl mb-auto"></div>
                </div>
              </div>
            ))
          : currentPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full overflow-hidden group"
              >
                <Link
                  to={`/blog/${post.id}`}
                  className="block relative overflow-hidden aspect-video"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 bg-gray-100 dark:bg-gray-800"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-xl uppercase tracking-wider shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </Link>
                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight">
                    <Link
                      to={`/blog/${post.id}`}
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 line-clamp-3 mb-auto">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            ))}
      </div>

      {/* Pagination Bar */}
      <div className="max-w-7xl mx-auto flex justify-center mt-12">
        <nav className="inline-flex items-center gap-2" aria-label="Pagination">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`w-10 h-10 flex items-center justify-center rounded-xl font-medium transition-colors cursor-pointer ${
                  currentPage === pageNumber
                    ? "bg-blue-600 text-white shadow-sm"
                    : "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </nav>
      </div>
    </main>
  );
};

export default Blog;
