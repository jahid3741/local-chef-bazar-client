import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/UseAuth/UseAuth";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";

const MyOrders = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const [orders, setOrders] = useState([]);

  // load orders
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/orders/user/${user.email}`)
        .then((res) => {
          setOrders(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [axiosSecure, user]);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">My Orders</h2>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>

              <th>Meal</th>

              <th>Price</th>

              <th>Quantity</th>

              <th>Total</th>

              <th>Status</th>

              <th>Payment</th>

              <th>Order Time</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>

                <td>{order.mealName}</td>

                <td>${order.price}</td>

                <td>{order.quantity}</td>

                <td>${order.price * order.quantity}</td>

                <td className="capitalize">{order.orderStatus}</td>

                <td className="capitalize">{order.paymentStatus}</td>

                <td>{new Date(order.orderTime).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.length === 0 && (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold">No orders found</h2>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
