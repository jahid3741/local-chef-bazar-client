import { Link } from "react-router";

const MealCard = ({ meal }) => {
  const { _id, foodName, chefName, chefId, foodImage, price, deliveryArea } =
    meal;

  return (
    <div className="card w-full bg-base-100 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group border border-base-200 overflow-hidden">
      <figure className="relative overflow-hidden h-64 w-full">
        <img
          src={foodImage}
          alt={foodName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 badge badge-primary badge-lg shadow-md font-bold border-none py-4 px-4 text-lg">
          ${price}
        </div>
      </figure>

      <div className="card-body p-6 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-2 mb-4">
            <h2 className="card-title text-2xl font-bold group-hover:text-primary transition-colors duration-300">
              {foodName}
            </h2>
          </div>

          <div className="space-y-3 text-sm text-base-content/80 mt-2 bg-base-200/50 p-4 rounded-xl">
            <div className="flex justify-between border-b border-base-300 pb-2">
              <span className="font-semibold text-base-content">Chef Name</span>
              <span className="font-medium text-right">{chefName}</span>
            </div>

            <div className="flex justify-between border-b border-base-300 pb-2">
              <span className="font-semibold text-base-content">Chef ID</span>
              <span
                className="font-medium text-right truncate max-w-[120px]"
                title={chefId}
              >
                {chefId}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-base-content">
                Delivery Area
              </span>
              <span className="font-medium text-right">{deliveryArea}</span>
            </div>
          </div>
        </div>

        <div className="card-actions mt-6">
          <Link
            to={`/meals/${_id}`}
            className="btn btn-primary w-full rounded-full shadow-lg hover:shadow-primary/50 hover:-translate-y-1 transition-all duration-300 text-base"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
