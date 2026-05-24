import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FiMapPin, FiUser, FiShield, FiHash } from "react-icons/fi";
import useAuth from "../../../Hooks/UseAuth/UseAuth";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [axiosSecure, user]);

  const handleRequest = async (requestType) => {
    const requestData = {
      userName: userData.name,
      userEmail: userData.email,
      requestType,
    };

    try {
      const res = await axiosSecure.post("/requests", requestData);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Request submitted successfully!",
          confirmButtonColor: "#3b82f6",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: error.response?.data?.message || "Something went wrong",
        confirmButtonColor: "#f59e0b",
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-base-100 shadow-xl rounded-3xl overflow-hidden border border-base-200/50"
      >
        <div className="h-32 md:h-48 bg-gradient-to-r from-primary to-secondary relative w-full">
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        <div className="px-6 md:px-12 pb-12">
          <div className="flex flex-col items-center -mt-16 md:-mt-24 mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2,
              }}
              className="relative"
            >
              <img
                src={userData.image || user?.photoURL}
                alt={userData.name}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-base-100 shadow-xl bg-base-200"
              />
              <div
                className="absolute bottom-2 right-2 w-5 h-5 bg-success rounded-full border-2 border-base-100 shadow-sm"
                title="Online"
              ></div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="show"
              className="text-center mt-4"
            >
              <h2 className="text-3xl font-extrabold text-base-content">
                {userData.name}
              </h2>
              <p className="text-base-content/60 font-medium mt-1">
                {userData.email}
              </p>

              <div className="flex gap-2 justify-center mt-3">
                <span
                  className={`badge badge-outline px-3 py-3 font-semibold capitalize shadow-sm ${
                    userData.role === "admin"
                      ? "badge-primary"
                      : userData.role === "chef"
                        ? "badge-secondary"
                        : "badge-accent"
                  }`}
                >
                  {userData.role}
                </span>
                <span
                  className={`badge px-3 py-3 font-semibold capitalize text-white shadow-sm ${
                    userData.status === "verified" ||
                    userData.status === "active"
                      ? "bg-success border-success"
                      : "bg-warning border-warning"
                  }`}
                >
                  {userData.status || "Pending"}
                </span>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
          >
            <motion.div
              variants={itemVariants}
              className="bg-base-200/50 hover:bg-base-200 transition-colors duration-300 rounded-2xl p-6 flex items-start gap-4 border border-base-200"
            >
              <div className="p-3 bg-primary/10 text-primary rounded-xl text-xl shadow-sm">
                <FiMapPin />
              </div>
              <div>
                <h3 className="font-bold text-base-content/70 text-sm uppercase tracking-wider mb-1">
                  Address
                </h3>
                <p className="font-semibold text-lg text-base-content">
                  {userData.address || "Not provided"}
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-base-200/50 hover:bg-base-200 transition-colors duration-300 rounded-2xl p-6 flex items-start gap-4 border border-base-200"
            >
              <div className="p-3 bg-secondary/10 text-secondary rounded-xl text-xl shadow-sm">
                <FiUser />
              </div>
              <div>
                <h3 className="font-bold text-base-content/70 text-sm uppercase tracking-wider mb-1">
                  Account Role
                </h3>
                <p className="font-semibold text-lg text-base-content capitalize">
                  {userData.role}
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-base-200/50 hover:bg-base-200 transition-colors duration-300 rounded-2xl p-6 flex items-start gap-4 border border-base-200"
            >
              <div className="p-3 bg-accent/10 text-accent rounded-xl text-xl shadow-sm">
                <FiShield />
              </div>
              <div>
                <h3 className="font-bold text-base-content/70 text-sm uppercase tracking-wider mb-1">
                  Account Status
                </h3>
                <p className="font-semibold text-lg text-base-content capitalize">
                  {userData.status || "Pending"}
                </p>
              </div>
            </motion.div>

            {userData.role === "chef" && (
              <motion.div
                variants={itemVariants}
                className="bg-base-200/50 hover:bg-base-200 transition-colors duration-300 rounded-2xl p-6 flex items-start gap-4 border border-base-200"
              >
                <div className="p-3 bg-primary/10 text-primary rounded-xl text-xl shadow-sm">
                  <FiHash />
                </div>
                <div>
                  <h3 className="font-bold text-base-content/70 text-sm uppercase tracking-wider mb-1">
                    Chef ID
                  </h3>
                  <p className="font-semibold text-lg text-base-content font-mono">
                    {userData.chefId}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mt-12 pt-8 border-t border-base-200"
          >
            {userData.role !== "chef" && userData.role !== "admin" && (
              <button
                onClick={() => handleRequest("chef")}
                className="btn btn-primary rounded-full px-8 shadow-lg shadow-primary/30 hover:-translate-y-1 transition-all duration-300"
              >
                Apply to be a Chef
              </button>
            )}

            {userData.role !== "admin" && (
              <button
                onClick={() => handleRequest("admin")}
                className="btn btn-secondary rounded-full px-8 shadow-lg shadow-secondary/30 hover:-translate-y-1 transition-all duration-300"
              >
                Apply for Admin
              </button>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default MyProfile;
