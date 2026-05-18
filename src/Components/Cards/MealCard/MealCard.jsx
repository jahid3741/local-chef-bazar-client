import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/UseAuth/UseAuth";

const MealCard = ({ meal }) => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const {
    _id,
    foodName,
    chefName,
    chefId,
    foodImage,
    price,
    rating,
    deliveryArea,
  } = meal;

  const handleDetails = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please login first",
        text: "You need to login to view details",
      });

      navigate("/login");

      return;
    }

    navigate(`/meals/${_id}`);
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={foodImage}
          alt={foodName}
          className="h-64 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{foodName}</h2>

        <p>
          <span className="font-bold">Chef Name:</span> {chefName}
        </p>

        <p>
          <span className="font-bold">Chef ID:</span> {chefId}
        </p>

        <p>
          <span className="font-bold">Price:</span> ${price}
        </p>

        <p>
          <span className="font-bold">Rating:</span> {rating}
        </p>

        <p>
          <span className="font-bold">Delivery Area:</span> {deliveryArea}
        </p>

        <div className="card-actions justify-end mt-4">
          <button onClick={handleDetails} className="btn btn-primary">
            See Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
