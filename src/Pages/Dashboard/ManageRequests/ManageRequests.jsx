import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheck,
  FiX,
  FiShield,
  FiUserPlus,
  FiInbox,
  FiClock,
} from "react-icons/fi";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";

const ManageRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axiosSecure.get("/requests").then((res) => {
      setRequests(res.data);
    });
  }, [axiosSecure]);

  const handleApprove = async (id) => {
    try {
      const res = await axiosSecure.patch(`/requests/${id}/approve`);

      if (
        res.data.requestResult?.modifiedCount > 0 ||
        res.data.modifiedCount > 0
      ) {
        Swal.fire({
          icon: "success",
          title: "Request approved",
          confirmButtonColor: "#10b981",
        });

        const updatedRequests = requests.map((request) => {
          if (request._id === id) {
            return {
              ...request,
              requestStatus: "approved",
            };
          }
          return request;
        });

        setRequests(updatedRequests);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response?.data?.message || "An error occurred",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axiosSecure.patch(`/requests/${id}/reject`);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Request rejected",
          confirmButtonColor: "#3b82f6",
        });

        const updatedRequests = requests.map((request) => {
          if (request._id === id) {
            return {
              ...request,
              requestStatus: "rejected",
            };
          }
          return request;
        });

        setRequests(updatedRequests);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "badge-warning bg-warning/20 text-warning border-warning/30";
      case "approved":
        return "badge-success bg-success/20 text-success border-success/30";
      case "rejected":
        return "badge-error bg-error/20 text-error border-error/30";
      default:
        return "badge-ghost";
    }
  };

  const getTypeBadge = (type) => {
    switch (type?.toLowerCase()) {
      case "admin":
        return "badge-secondary bg-secondary/20 text-secondary border-secondary/30";
      case "chef":
        return "badge-primary bg-primary/20 text-primary border-primary/30";
      default:
        return "badge-ghost bg-base-200 text-base-content/70 border-base-300";
    }
  };

  const tableVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  const pendingCount = requests.filter(
    (r) => r.requestStatus === "pending",
  ).length;

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-3xl font-extrabold text-base-content flex items-center gap-3">
            Manage Requests <FiUserPlus className="text-primary" />
          </h2>
          <p className="text-base-content/60 mt-1 font-medium">
            Review and process role upgrade applications
          </p>
        </div>

        <div className="flex gap-3">
          <div className="badge badge-primary badge-lg shadow-sm font-bold px-4 py-3">
            Total: {requests.length}
          </div>
          {pendingCount > 0 && (
            <div className="badge badge-warning badge-lg shadow-sm font-bold px-4 py-3 flex items-center gap-1">
              <FiClock /> {pendingCount} Pending
            </div>
          )}
        </div>
      </motion.div>

      {requests.length > 0 ? (
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
                  <th className="px-6 py-4">Applicant Details</th>
                  <th className="px-6 py-4">Request Type</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 rounded-tr-3xl text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="AnimatePresence">
                <AnimatePresence>
                  {requests.map((request, index) => (
                    <motion.tr
                      key={request._id}
                      variants={rowVariants}
                      exit="exit"
                      className="hover:bg-base-200/30 transition-colors border-b border-base-200/50"
                    >
                      <td className="px-6 py-4 font-semibold text-base-content/50">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-base-content text-base">
                            {request.userName}
                          </span>
                          <span className="text-sm text-base-content/60 font-medium">
                            {request.userEmail}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`badge badge-sm px-3 py-2.5 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1 w-max ${getTypeBadge(request.requestType)}`}
                        >
                          {request.requestType === "admin" ? (
                            <FiShield />
                          ) : (
                            <FiUserPlus />
                          )}
                          {request.requestType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`badge badge-sm px-3 py-2.5 font-bold uppercase tracking-wider text-[10px] ${getStatusBadge(request.requestStatus)}`}
                        >
                          {request.requestStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          {request.requestStatus === "pending" ? (
                            <>
                              <div
                                className="tooltip tooltip-success"
                                data-tip="Approve"
                              >
                                <button
                                  onClick={() => handleApprove(request._id)}
                                  className="btn btn-sm btn-circle btn-ghost text-success bg-success/10 hover:bg-success hover:text-white transition-colors"
                                >
                                  <FiCheck className="text-lg" />
                                </button>
                              </div>
                              <div
                                className="tooltip tooltip-error"
                                data-tip="Reject"
                              >
                                <button
                                  onClick={() => handleReject(request._id)}
                                  className="btn btn-sm btn-circle btn-ghost text-error bg-error/10 hover:bg-error hover:text-white transition-colors"
                                >
                                  <FiX className="text-lg" />
                                </button>
                              </div>
                            </>
                          ) : (
                            <span className="text-xs font-bold text-base-content/40 uppercase tracking-widest px-2 py-1 italic">
                              Processed
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
            No Requests Found
          </h2>
          <p className="text-base-content/60">
            There are currently no role upgrade requests from users.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ManageRequests;
