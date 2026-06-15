import { Link } from "react-router"; // Ensure react-router-dom is used

const MealCard = ({ meal }) => {
  // Added category and rating just in case your backend sends them!
  const {
    _id,
    foodName,
    chefName,
    chefId,
    foodImage,
    price,
    deliveryArea,
    category,
    rating,
  } = meal;

  return (
    <div className="card p-0 flex flex-col w-full h-full overflow-hidden group hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 border border-[var(--border-base)] bg-[var(--bg-base)] rounded-[var(--radius-3xl)]">
      {/* Image Section */}
      <figure className="shrink-0 relative h-48 sm:h-56 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={foodImage || "https://placehold.co/600x400?text=No+Image"}
          alt={foodName}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category Badge (Top Left) */}
        {category && (
          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm uppercase tracking-wide">
            {category}
          </div>
        )}
      </figure>

      {/* Card Body - Uses flex-grow to stretch and push the button down */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        {/* Title */}
        <h2 className="text-xl font-bold text-[var(--text-base)] leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {foodName}
        </h2>

        {/* Sleek Details List */}
        <div className="space-y-2.5 mt-4 text-sm text-[var(--text-base)] opacity-80">
          <div className="flex justify-between items-center border-b border-[var(--border-base)] pb-2">
            <span className="font-semibold opacity-70">Chef</span>
            <span className="font-medium text-right truncate pl-4">
              {chefName}
            </span>
          </div>

          {chefId && (
            <div className="flex justify-between items-center border-b border-[var(--border-base)] pb-2">
              <span className="font-semibold opacity-70">Chef ID</span>
              <span
                className="font-medium text-right truncate max-w-[120px]"
                title={chefId}
              >
                {chefId}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center border-b border-[var(--border-base)] pb-2">
            <span className="font-semibold opacity-70">Delivery</span>
            <span className="font-medium text-right truncate pl-4">
              {deliveryArea || "N/A"}
            </span>
          </div>
        </div>

        {/* Price & Rating */}
        <div className="flex justify-between items-end mt-5 mb-1 shrink-0">
          <span className="font-extrabold text-primary text-2xl">${price}</span>
          <span className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2.5 py-1 rounded-lg font-bold text-xs">
            ⭐ {rating || "4.5"}/5
          </span>
        </div>

        {/* Absolute Bottom Button container */}
        <div className="mt-auto pt-4 shrink-0">
          <Link
            to={`/meals/${_id}`}
            className="btn w-full bg-black/5 dark:bg-white/5 text-[var(--text-base)] border border-[var(--border-base)] hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm rounded-xl"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
