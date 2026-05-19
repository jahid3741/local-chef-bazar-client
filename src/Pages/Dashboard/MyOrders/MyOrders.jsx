import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../Hooks/UseAuth/UseAuth";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";


const MyOrders = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const [orders, setOrders] = useState([]);

  // load orders
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/orders/user/${user.email}`).then((res) => {
        setOrders(res.data);
      });
    }
  }, [axiosSecure, user]);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-10">My Orders</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-base-100 shadow-xl rounded-2xl p-6"
          >
            <h2 className="text-2xl font-bold mb-4">{order.mealName}</h2>

            <div className="space-y-2">
              <p>
                <span className="font-bold">Order Status:</span>{" "}
                {order.orderStatus}
              </p>

              <p>
                <span className="font-bold">Price:</span> ${order.price}
              </p>

              <p>
                <span className="font-bold">Quantity:</span> {order.quantity}
              </p>

              <p>
                <span className="font-bold">Delivery Time:</span>{" "}
                {order.estimatedDeliveryTime}
              </p>

              <p>
                <span className="font-bold">Chef Name:</span> {order.chefName}
              </p>

              <p>
                <span className="font-bold">Chef ID:</span> {order.chefId}
              </p>

              <p>
                <span className="font-bold">Payment Status:</span>{" "}
                {order.paymentStatus}
              </p>
            </div>

            {/* payment button */}
            {order.orderStatus === "accepted" &&
              order.paymentStatus === "pending" && (
                <Link
                  to={`/payment/${order._id}`}
                  className="btn btn-primary mt-6"
                >
                  Pay
                </Link>
              )}

            {/* paid badge */}
            {order.paymentStatus === "paid" && (
              <button className="btn btn-success mt-6">Paid</button>
            )}
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">No Orders Found</h2>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
