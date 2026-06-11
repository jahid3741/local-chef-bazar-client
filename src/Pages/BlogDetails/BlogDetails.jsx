import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

const BlogDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching a single blog post from your Express backend using the ID
  useEffect(() => {
    // In production: axios.get(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`)
    const fetchPost = () => {
      setTimeout(() => {
        setPost({
          id: id,
          title: "The Secret to Authentic Dhakai Kachchi Biryani",
          content: `
            <p>Mastering the traditional layers of meat, rice, and spices is an art form that takes years to perfect. The perfect Kachchi Biryani is not just a meal; it is a celebration of culture and culinary precision.</p>
            <h3>The Foundation of Flavor</h3>
            <p>The word "Kachchi" means raw. Unlike other biryanis where the meat and rice are cooked separately and then combined, Kachchi biryani requires marinating raw meat (usually mutton) in a rich blend of yogurt and aromatic spices, placing it at the bottom of the cooking pot (handi), and covering it with partially cooked rice.</p>
            <p>The pot is then sealed with dough to prevent any steam from escaping—a technique known as 'dum' cooking. This allows the meat to cook in its own juices and the steam, tenderizing it perfectly while infusing the rice with incredible flavor.</p>
            <h3>Essential Spices</h3>
            <ul>
              <li>Shahi Jeera (Imperial Cumin)</li>
              <li>Green and Black Cardamom</li>
              <li>Mace and Nutmeg</li>
              <li>Saffron infused in warm milk</li>
            </ul>
            <p>Remember, patience is the secret ingredient. Rushing the 'dum' process will result in unevenly cooked meat. Let it slow-cook over low heat, and you will be rewarded with an unforgettable dish.</p>
          `,
          image:
            "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=1200&q=80",
          category: "Recipes",
          author: "Md Jahidul Islam",
          authorRole: "Lead Chef & Content Creator",
          authorImage:
            "https://ui-avatars.com/api/?name=Md+Jahidul+Islam&background=2563EB&color=fff",
          date: "Jun 10, 2026",
          readTime: "5 min read",
          tags: ["Traditional", "Mutton", "Dhakai", "Weekend Special"],
        });
        setIsLoading(false);
      }, 1000);
    };

    fetchPost();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 flex justify-center">
        <div className="w-full max-w-4xl animate-pulse">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl w-3/4 mb-4"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-xl w-1/4 mb-8"></div>
          <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-xl mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-16 px-4 sm:px-8">
      <article className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Header / Meta */}
        <div className="p-8 md:p-12 pb-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-bold px-3 py-1 rounded-xl uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
            {post.title}
          </h1>

          {/* Author Box - Top */}
          <div className="flex items-center gap-4 pb-6 border-b border-gray-100 dark:border-gray-700">
            <img
              src={post.authorImage}
              alt={post.author}
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-100 dark:border-blue-900"
            />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {post.author}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {post.date}
              </p>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="px-8 md:px-12 mb-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Article Body */}
        {/* Using standard Tailwind prose typography classes for rich text rendering */}
        <div
          className="px-8 md:px-12 pb-12 prose prose-lg dark:prose-invert max-w-none 
                     prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                     prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                     prose-li:text-gray-600 dark:prose-li:text-gray-300 prose-ul:list-disc prose-ul:ml-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer / Tags */}
        <div className="px-8 md:px-12 py-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-xs font-medium px-3 py-1 rounded-xl"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Back Navigation */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            <svg
              className="w-4 h-4 rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
            Back to Blog
          </Link>
        </div>
      </article>
    </main>
  );
};

export default BlogDetails;
