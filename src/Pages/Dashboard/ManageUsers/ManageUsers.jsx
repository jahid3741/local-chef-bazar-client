import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiAlertOctagon,
  FiUserCheck,
  FiShield,
  FiUsers,
  FiSearch,
} from "react-icons/fi";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axiosSecure.get("/users").then((res) => {
      setUsers(res.data);
    });
  }, [axiosSecure]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleFraud = async (email) => {
    const confirm = await Swal.fire({
      title: "Mark as fraud?",
      text: "This user will be restricted from performing certain actions.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, mark as fraud",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/users/${email}/fraud`);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "User marked as fraud",
          confirmButtonColor: "#3b82f6",
        });

        const updatedUsers = users.map((user) => {
          if (user.email === email) {
            return {
              ...user,
              status: "fraud",
            };
          }
          return user;
        });
        setUsers(updatedUsers);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response?.data?.message,
      });
    }
  };

  const handleMakeChef = async (email) => {
    const confirm = await Swal.fire({
      title: "Make this user a chef?",
      text: "They will get access to the Chef Dashboard.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, make chef",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/users/${email}/make-chef`);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "User is now a chef",
          confirmButtonColor: "#3b82f6",
        });

        const updatedUsers = users.map((user) => {
          if (user.email === email) {
            return {
              ...user,
              role: "chef",
            };
          }
          return user;
        });
        setUsers(updatedUsers);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response?.data?.message,
      });
    }
  };

  const handleMakeAdmin = async (email) => {
    const confirm = await Swal.fire({
      title: "Make this user an admin?",
      text: "Warning: They will have full control over the platform.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, make admin",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/users/${email}/make-admin`);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "User is now an admin",
          confirmButtonColor: "#3b82f6",
        });

        const updatedUsers = users.map((user) => {
          if (user.email === email) {
            return {
              ...user,
              role: "admin",
            };
          }
          return user;
        });
        setUsers(updatedUsers);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response?.data?.message,
      });
    }
  };

  const getRoleBadge = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "badge-primary bg-primary/20 text-primary border-primary/30";
      case "chef":
        return "badge-secondary bg-secondary/20 text-secondary border-secondary/30";
      default:
        return "badge-ghost bg-base-200 text-base-content/70 border-base-300";
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "fraud":
        return "badge-error bg-error/20 text-error border-error/30";
      case "verified":
        return "badge-success bg-success/20 text-success border-success/30";
      default:
        return "badge-info bg-info/20 text-info border-info/30";
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

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
      >
        <div>
          <h2 className="text-3xl font-extrabold text-base-content flex items-center gap-3">
            Manage Users <FiUsers className="text-primary" />
          </h2>
          <p className="text-base-content/60 mt-1 font-medium">
            Control roles and monitor user activity
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center w-full lg:w-auto">
          <div className="relative w-full sm:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary/20 rounded-xl"
            />
          </div>
          <div className="badge badge-primary badge-lg shadow-sm font-bold px-4 py-3 whitespace-nowrap w-full sm:w-auto">
            Total Users: {users.length}
          </div>
        </div>
      </motion.div>

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
                <th className="px-6 py-4 rounded-tl-3xl">User Info</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 rounded-tr-3xl text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="AnimatePresence">
              <AnimatePresence>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <motion.tr
                      key={user._id}
                      variants={rowVariants}
                      exit="exit"
                      className="hover:bg-base-200/30 transition-colors border-b border-base-200/50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12 bg-base-200">
                              <img
                                src={
                                  user.image ||
                                  `https://ui-avatars.com/api/?name=${user.name}&background=random`
                                }
                                alt={user.name}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-base-content">
                              {user.name}
                            </div>
                            <div className="text-sm text-base-content/60 font-medium">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`badge badge-sm px-3 py-2.5 font-bold uppercase tracking-wider text-[10px] ${getRoleBadge(user.role)}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`badge badge-sm px-3 py-2.5 font-bold uppercase tracking-wider text-[10px] ${getStatusBadge(user.status)}`}
                        >
                          {user.status || "Active"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          {user.role !== "admin" && user.status !== "fraud" && (
                            <div
                              className="tooltip tooltip-error"
                              data-tip="Mark Fraud"
                            >
                              <button
                                onClick={() => handleFraud(user.email)}
                                className="btn btn-sm btn-circle btn-ghost text-error bg-error/10 hover:bg-error hover:text-white transition-colors"
                              >
                                <FiAlertOctagon className="text-lg" />
                              </button>
                            </div>
                          )}

                          {user.role !== "chef" && user.status !== "fraud" && (
                            <div
                              className="tooltip tooltip-primary"
                              data-tip="Make Chef"
                            >
                              <button
                                onClick={() => handleMakeChef(user.email)}
                                className="btn btn-sm btn-circle btn-ghost text-primary bg-primary/10 hover:bg-primary hover:text-white transition-colors"
                              >
                                <FiUserCheck className="text-lg" />
                              </button>
                            </div>
                          )}

                          {user.role !== "admin" && user.status !== "fraud" && (
                            <div
                              className="tooltip tooltip-success"
                              data-tip="Make Admin"
                            >
                              <button
                                onClick={() => handleMakeAdmin(user.email)}
                                className="btn btn-sm btn-circle btn-ghost text-success bg-success/10 hover:bg-success hover:text-white transition-colors"
                              >
                                <FiShield className="text-lg" />
                              </button>
                            </div>
                          )}

                          {user.role === "admin" && (
                            <span className="text-xs font-bold text-primary/50 uppercase tracking-widest px-2 py-1">
                              Super Admin
                            </span>
                          )}
                          {user.status === "fraud" && (
                            <span className="text-xs font-bold text-error/50 uppercase tracking-widest px-2 py-1 flex items-center gap-1">
                              <FiAlertOctagon /> Restricted
                            </span>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-12">
                      <p className="text-base-content/50 font-medium">
                        No users found matching "{searchTerm}"
                      </p>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </motion.table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
