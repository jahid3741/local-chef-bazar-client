import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/UseAuth/UseAuth";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";

const FavoriteMeals = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const [favorites, setFavorites] = useState([]);

  // load favorites
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/favorites/${user.email}`)
        .then((res) => {
          setFavorites(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [axiosSecure, user]);

  // remove favorite
  const handleRemove = async (id) => {
    const confirm = await Swal.fire({
      title: "Remove favorite?",

      text: "This meal will be removed from favorites",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Remove",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/favorites/${id}`);

      if (res.data.deletedCount > 0) {
        Swal.fire({
          icon: "success",

          title: "Removed from favorites",
        });

        const remainingFavorites = favorites.filter(
          (favorite) => favorite._id !== id,
        );

        setFavorites(remainingFavorites);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Favorite Meals</h2>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>

              <th>Meal Name</th>

              <th>Chef Name</th>

              <th>Chef ID</th>

              <th>Price</th>

              <th>Added Time</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {favorites.map((favorite, index) => (
              <tr key={favorite._id}>
                <td>{index + 1}</td>

                <td>{favorite.mealName}</td>

                <td>{favorite.chefName}</td>

                <td>{favorite.chefId}</td>

                <td>${favorite.price}</td>

                <td>{new Date(favorite.addedTime).toLocaleDateString()}</td>

                <td>
                  <button
                    onClick={() => handleRemove(favorite._id)}
                    className="btn btn-sm btn-error"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {favorites.length === 0 && (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold">No favorite meals found</h2>
        </div>
      )}
    </div>
  );
};

export default FavoriteMeals;
