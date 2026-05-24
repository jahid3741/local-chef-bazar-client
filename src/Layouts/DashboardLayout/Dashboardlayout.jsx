import { NavLink, Outlet, Link } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaShoppingBag,
  FaStar,
  FaHeart,
  FaPlus,
  FaUtensils,
  FaClipboardList,
  FaUsers,
  FaChartPie,
  FaHome,
} from "react-icons/fa";
import useAuth from "../../Hooks/UseAuth/UseAuth";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";

const DashboardLayout = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/role/${user.email}`)
        .then((res) => {
          setRole(res.data.role);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [axiosSecure, user]);

  const navStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
      isActive
        ? "bg-primary text-white shadow-lg shadow-primary/40 translate-x-1"
        : "text-base-content/70 hover:bg-base-200 hover:text-primary hover:translate-x-1"
    }`;

  const sidebarVariants = {
    hidden: { opacity: 0, x: -50 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.05,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="flex min-h-screen bg-base-200/30">
      <motion.div
        variants={sidebarVariants}
        initial="hidden"
        animate="show"
        className="w-72 bg-base-100 shadow-2xl z-20 sticky top-0 h-screen overflow-y-auto flex flex-col border-r border-base-200"
      >
        <div className="p-6 border-b border-base-200/60 sticky top-0 bg-base-100 z-10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2.5 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl group-hover:scale-110 transition-all duration-300 shadow-inner">
              <FaUtensils className="text-xl text-primary drop-shadow-sm" />
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-base-content group-hover:text-primary transition-colors duration-300">
              Dashboard
            </h2>
          </Link>
        </div>

        <div className="p-4 flex-1">
          <ul className="space-y-2">
            <motion.li variants={itemVariants}>
              <NavLink to="/dashboard/my-profile" className={navStyle}>
                <FaUser className="text-lg" />
                My Profile
              </NavLink>
            </motion.li>

            {role === "user" && (
              <>
                <motion.li variants={itemVariants}>
                  <NavLink to="/dashboard/my-orders" className={navStyle}>
                    <FaShoppingBag className="text-lg" />
                    My Orders
                  </NavLink>
                </motion.li>

                <motion.li variants={itemVariants}>
                  <NavLink to="/dashboard/my-reviews" className={navStyle}>
                    <FaStar className="text-lg" />
                    My Reviews
                  </NavLink>
                </motion.li>

                <motion.li variants={itemVariants}>
                  <NavLink to="/dashboard/favorites" className={navStyle}>
                    <FaHeart className="text-lg" />
                    Favorite Meals
                  </NavLink>
                </motion.li>
              </>
            )}

            {role === "chef" && (
              <>
                <motion.li variants={itemVariants}>
                  <NavLink to="/dashboard/create-meal" className={navStyle}>
                    <FaPlus className="text-lg" />
                    Create Meal
                  </NavLink>
                </motion.li>

                <motion.li variants={itemVariants}>
                  <NavLink to="/dashboard/my-meals" className={navStyle}>
                    <FaUtensils className="text-lg" />
                    My Meals
                  </NavLink>
                </motion.li>

                <motion.li variants={itemVariants}>
                  <NavLink to="/dashboard/order-requests" className={navStyle}>
                    <FaClipboardList className="text-lg" />
                    Order Requests
                  </NavLink>
                </motion.li>
              </>
            )}

            {role === "admin" && (
              <>
                <motion.li variants={itemVariants}>
                  <NavLink to="/dashboard/manage-users" className={navStyle}>
                    <FaUsers className="text-lg" />
                    Manage Users
                  </NavLink>
                </motion.li>

                <motion.li variants={itemVariants}>
                  <NavLink to="/dashboard/manage-requests" className={navStyle}>
                    <FaClipboardList className="text-lg" />
                    Manage Requests
                  </NavLink>
                </motion.li>

                <motion.li variants={itemVariants}>
                  <NavLink
                    to="/dashboard/platform-statistics"
                    className={navStyle}
                  >
                    <FaChartPie className="text-lg" />
                    Platform Statistics
                  </NavLink>
                </motion.li>
              </>
            )}
          </ul>
        </div>

        <div className="p-4 border-t border-base-200/60 sticky bottom-0 bg-base-100">
          <ul className="space-y-2">
            <motion.li variants={itemVariants}>
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-base-content/70 hover:bg-base-200 hover:text-primary"
              >
                <FaHome className="text-lg" />
                Back to Home
              </Link>
            </motion.li>
          </ul>
        </div>
      </motion.div>

      <div className="flex-1 p-6 md:p-10 w-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-full bg-base-100 rounded-3xl shadow-xl border border-base-200/50 p-6 md:p-8"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardLayout;