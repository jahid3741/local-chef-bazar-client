import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiX, FiTruck, FiPackage, FiInbox } from "react-icons/fi";
import useAuth from "../../../Hooks/UseAuth/UseAuth";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";

const OrderRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);
  const [chefId, setChefId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => {
          if (res.data?.chefId) {
            setChefId(res.data.chefId);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [axiosSecure, user]);

  useEffect(() => {
    if (chefId) {
      setLoading(true);
      axiosSecure
        .get(`/orders/chef/${chefId}`)
        .then((res) => {
          setOrders(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [axiosSecure, chefId]);

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await axiosSecure.patch(`/orders/${id}/status`, { status });

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: `Order ${status}`,
          confirmButtonColor: "#3b82f6",
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
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "badge-warning bg-warning/20 text-warning border-warning/30";
      case "accepted":
        return "badge-info bg-info/20 text-info border-info/30";
      case "delivered":
        return "badge-success bg-success/20 text-success border-success/30";
      case "cancelled":
        return "badge-error bg-error/20 text-error border-error/30";
      default:
        return "badge-ghost";
    }
  };

  const getPaymentBadge = (status) => {
    return status.toLowerCase() === "paid"
      ? "badge-success bg-success/20 text-success border-success/30"
      : "badge-warning bg-warning/20 text-warning border-warning/30";
  };

  const tableVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-base-content/60 font-medium animate-pulse">
          Fetching latest orders...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-3xl font-extrabold text-base-content">
            Order Requests
          </h2>
          <p className="text-base-content/60 mt-1 font-medium">
            Manage and track your incoming meal orders
          </p>
        </div>
        <div className="flex gap-3">
          <div className="badge badge-primary badge-lg shadow-sm font-bold px-4 py-3">
            Total Orders: {orders.length}
          </div>
          <div className="badge badge-warning badge-lg shadow-sm font-bold px-4 py-3">
            Pending: {orders.filter((o) => o.orderStatus === "pending").length}
          </div>
        </div>
      </motion.div>

      {orders.length > 0 ? (
        <div className="bg-base-100 shadow-xl border border-base-200/50 rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <motion.table
              variants={tableVariants}
              initial="hidden"
              animate="show"
              className="table w-full"
            >
              <thead className="bg-base-200/50 text-base-content font-bold text-sm">
                <tr>
                  <th className="px-6 py-4 rounded-tl-3xl">#</th>
                  <th className="px-6 py-4">Meal details</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Payment</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 rounded-tr-3xl text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="AnimatePresence">
                <AnimatePresence>
                  {orders.map((order, index) => (
                    <motion.tr
                      key={order._id}
                      variants={rowVariants}
                      exit="exit"
                      className="hover:bg-base-200/30 transition-colors border-b border-base-200/50"
                    >
                      <td className="px-6 py-4 font-semibold text-base-content/50">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-base-content">
                            {order.mealName}
                          </span>
                          <span className="text-xs text-base-content/60 font-medium">
                            Qty: {order.quantity}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium">
                          {order.userEmail}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-primary font-bold bg-primary/10 px-3 py-1.5 rounded-lg">
                          ${(order.price * order.quantity).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`badge badge-sm px-3 py-2.5 font-bold uppercase tracking-wider text-[10px] ${getPaymentBadge(order.paymentStatus)}`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`badge badge-sm px-3 py-2.5 font-bold uppercase tracking-wider text-[10px] ${getStatusBadge(order.orderStatus)}`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          {order.orderStatus === "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(order?._id, "accepted")
                                }
                                className="btn btn-sm btn-circle btn-ghost text-primary bg-primary/10 hover:bg-primary hover:text-white transition-colors"
                                title="Accept Order"
                              >
                                <FiCheck className="text-lg" />
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(order?._id, "cancelled")
                                }
                                className="btn btn-sm btn-circle btn-ghost text-error bg-error/10 hover:bg-error hover:text-white transition-colors"
                                title="Cancel Order"
                              >
                                <FiX className="text-lg" />
                              </button>
                            </>
                          )}
                          {order.orderStatus === "accepted" && (
                            <button
                              onClick={() =>
                                handleStatusUpdate(order?._id, "delivered")
                              }
                              className="btn btn-sm btn-success text-white shadow-sm hover:shadow-md transition-all rounded-xl px-4"
                            >
                              <FiTruck className="mr-1" /> Mark Delivered
                            </button>
                          )}
                          {(order.orderStatus === "delivered" ||
                            order.orderStatus === "cancelled") && (
                            <span className="text-base-content/40 text-sm font-medium italic flex items-center gap-1">
                              <FiPackage /> Processed
                            </span>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </motion.table>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-base-100 shadow-xl border border-base-200/50 rounded-3xl p-16 text-center"
        >
          <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiInbox className="text-5xl text-base-content/30" />
          </div>
          <h2 className="text-2xl font-bold text-base-content mb-2">
            No order requests yet
          </h2>
          <p className="text-base-content/60">
            When customers place orders for your meals, they will appear right
            here.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default OrderRequests;
