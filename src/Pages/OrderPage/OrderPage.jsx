import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router";

import Swal from "sweetalert2";
import useAuth from "../../Hooks/UseAuth/UseAuth";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";

const OrderPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const [meal, setMeal] = useState({});

  const [quantity, setQuantity] = useState(1);

  const [userAddress, setUserAddress] = useState("");

  // load meal
  useEffect(() => {
    axiosSecure.get(`/meals/${id}`).then((res) => {
      setMeal(res.data);
    });
  }, [axiosSecure, id]);

  const totalPrice = Number(meal.price || 0) * Number(quantity);

  // confirm order
  const handleOrder = async (e) => {
    e.preventDefault();

    const confirm = await Swal.fire({
      title: `Your total price is $${totalPrice}`,

      text: "Do you want to confirm the order?",

      icon: "question",

      showCancelButton: true,

      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    const orderData = {
      foodId: meal._id,

      mealName: meal.foodName,

      price: meal.price,

      quantity,

      chefId: meal.chefId,

      userEmail: user?.email,

      userAddress,
    };

    try {
      const res = await axiosSecure.post("/orders", orderData);

      console.log(res.data);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Order placed successfully!",
        });

        navigate("/meals");
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: error.response?.data?.message || "Something went wrong",
      });
    }
  };
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-base-100 shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Confirm Order</h2>

        <form onSubmit={handleOrder} className="space-y-5">
          {/* meal name */}
          <div>
            <label className="font-semibold">Meal Name</label>

            <input
              type="text"
              value={meal.foodName || ""}
              readOnly
              className="input input-bordered w-full mt-2"
            />
          </div>

          {/* price */}
          <div>
            <label className="font-semibold">Price</label>

            <input
              type="text"
              value={meal.price || ""}
              readOnly
              className="input input-bordered w-full mt-2"
            />
          </div>

          {/* quantity */}
          <div>
            <label className="font-semibold">Quantity</label>

            <input
              type="number"
              min="1"
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="input input-bordered w-full mt-2"
            />
          </div>

          {/* chef id */}
          <div>
            <label className="font-semibold">Chef ID</label>

            <input
              type="text"
              value={meal.chefId || ""}
              readOnly
              className="input input-bordered w-full mt-2"
            />
          </div>

          {/* email */}
          <div>
            <label className="font-semibold">User Email</label>

            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full mt-2"
            />
          </div>

          {/* address */}
          <div>
            <label className="font-semibold">Delivery Address</label>

            <textarea
              required
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
              className="textarea textarea-bordered w-full mt-2"
            ></textarea>
          </div>

          {/* total */}
          <div className="text-xl font-bold">Total Price: ${totalPrice}</div>

          <button className="btn btn-primary w-full">Confirm Order</button>
        </form>
      </div>
    </div>
  );
};

export default OrderPage;
