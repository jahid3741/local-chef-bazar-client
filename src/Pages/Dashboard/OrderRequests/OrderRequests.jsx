import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/UseAuth/UseAuth";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";

const OrderRequests = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const [orders, setOrders] = useState([]);

  const [chefId, setChefId] = useState("");

  // load chef info
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`).then((res) => {
        setChefId(res.data.chefId);
      });
    }
  }, [axiosSecure, user]);

  // load chef orders
  useEffect(() => {
    if (chefId) {
      axiosSecure.get(`/orders/chef/${chefId}`).then((res) => {
        setOrders(res.data);
      });
    }
  }, [axiosSecure, chefId]);

  // update status
  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await axiosSecure.patch(`/orders/${id}/status`, { status });

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",

          title: `Order ${status}`,
        });

        const updatedOrders = orders.map((order) => {
          if (order._id === id) {
            return {
              ...order,
              orderStatus: status,
            };
          }

          return order;
        });

        setOrders(updatedOrders);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",

        title: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Order Requests</h2>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>

              <th>Meal</th>

              <th>Customer</th>

              <th>Quantity</th>

              <th>Total</th>

              <th>Payment</th>

              <th>Status</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>

                <td>{order.mealName}</td>

                <td>{order.userEmail}</td>

                <td>{order.quantity}</td>

                <td>${order.price * order.quantity}</td>

                <td className="capitalize">{order.paymentStatus}</td>

                <td className="capitalize">{order.orderStatus}</td>

                <td className="space-x-2">
                  {order.orderStatus === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          handleStatusUpdate(order._id, "accepted")
                        }
                        className="btn btn-xs btn-primary"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          handleStatusUpdate(order._id, "cancelled")
                        }
                        className="btn btn-xs btn-error"
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {order.orderStatus === "accepted" && (
                    <button
                      onClick={() => handleStatusUpdate(order._id, "delivered")}
                      className="btn btn-xs btn-success"
                    >
                      Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.length === 0 && (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold">No order requests found</h2>
        </div>
      )}
    </div>
  );
};

export default OrderRequests;
