import { Link } from "react-router";
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
  FaExclamationCircle,
} from "react-icons/fa";
import useAuth from "../../Hooks/UseAuth/UseAuth";
import axiosSecure from "../../Api/AxiosSecure/AxiosSecure";

const DashboardLayout = () => {
  // 1. ADD 'loading' HERE
  const { user, loading } = useAuth();

  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!loading && user?.email) {
      setRoleLoading(true);
      setError(false);

      axiosSecure
        .get(`/users/role/${user.email}`)
        .then((res) => {
          setRole(res.data.role || "user");
        })
        .catch((err) => {
          console.error("Failed to fetch role:", err);
          setError(true);
          setRole("user");
        })
        .finally(() => {
          setRoleLoading(false);
        });
    }
  }, [user, loading]);

  const navStyle =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-base-content/70 hover:bg-base-200 hover:text-primary hover:translate-x-1";

  const sidebarVariants = {
    hidden: { opacity: 0, x: -50 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, staggerChildren: 0.05, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  const NavSkeleton = () => (
    <div className="space-y-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-12 rounded-xl bg-base-200 animate-pulse" />
      ))}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-base-200/30">
      {/* SIDEBAR MENU */}
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
              Control Hub
            </h2>
          </Link>
        </div>

        <div className="p-4 flex-1">
          <ul className="space-y-2">
            <motion.li variants={itemVariants}>
              <Link to="/my-profile" className={navStyle}>
                <FaUser className="text-lg" /> My Profile
              </Link>
            </motion.li>

            {roleLoading || loading ? (
              <NavSkeleton />
            ) : (
              <>
                {role === "user" && (
                  <>
                    <motion.li variants={itemVariants}>
                      <Link to="/my-orders" className={navStyle}>
                        <FaShoppingBag className="text-lg" /> My Orders
                      </Link>
                    </motion.li>
                    <motion.li variants={itemVariants}>
                      <Link to="/my-reviews" className={navStyle}>
                        <FaStar className="text-lg" /> My Reviews
                      </Link>
                    </motion.li>
                    <motion.li variants={itemVariants}>
                      <Link to="/favorites" className={navStyle}>
                        <FaHeart className="text-lg" /> Favorite Meals
                      </Link>
                    </motion.li>
                  </>
                )}
                {role === "chef" && (
                  <>
                    <motion.li variants={itemVariants}>
                      <Link to="/create-meal" className={navStyle}>
                        <FaPlus className="text-lg" /> Create Meal
                      </Link>
                    </motion.li>
                    <motion.li variants={itemVariants}>
                      <Link to="/my-meals" className={navStyle}>
                        <FaUtensils className="text-lg" /> My Meals
                      </Link>
                    </motion.li>
                    <motion.li variants={itemVariants}>
                      <Link to="/order-requests" className={navStyle}>
                        <FaClipboardList className="text-lg" /> Order Requests
                      </Link>
                    </motion.li>
                  </>
                )}
                {role === "admin" && (
                  <>
                    <motion.li variants={itemVariants}>
                      <Link to="/manage-users" className={navStyle}>
                        <FaUsers className="text-lg" /> Manage Users
                      </Link>
                    </motion.li>
                    <motion.li variants={itemVariants}>
                      <Link to="/manage-requests" className={navStyle}>
                        <FaClipboardList className="text-lg" /> Manage Requests
                      </Link>
                    </motion.li>
                    <motion.li variants={itemVariants}>
                      <Link to="/platform-statistics" className={navStyle}>
                        <FaChartPie className="text-lg" /> Platform Statistics
                      </Link>
                    </motion.li>
                  </>
                )}
              </>
            )}
          </ul>
        </div>

        <div className="p-4 border-t border-base-200/60 sticky bottom-0 bg-base-100">
          {error && (
            <div className="mb-4 flex items-center gap-2 text-xs text-error bg-error/10 p-2 rounded-lg">
              <FaExclamationCircle className="text-lg shrink-0" />
              <span>Could not verify role. Showing basic menu.</span>
            </div>
          )}
          <ul className="space-y-2">
            <motion.li variants={itemVariants}>
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-base-content/70 hover:bg-base-200 hover:text-primary"
              >
                <FaHome className="text-lg" /> Back to Home
              </Link>
            </motion.li>
          </ul>
        </div>
      </motion.div>

      {/* RIGHT SIDE WELCOME SCREEN */}
      <div className="flex-1 p-6 md:p-10 flex flex-col items-center justify-center bg-base-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-lg"
        >
          <div className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
            <FaUser className="text-4xl" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Welcome to your Hub</h1>
          <p className="text-lg text-base-content/60">
            Please select an option from the sidebar menu
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardLayout;
