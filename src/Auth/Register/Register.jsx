import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiImage,
  FiMapPin,
  FiLock,
  FiUserPlus,
} from "react-icons/fi";
import useAuth from "../../Hooks/UseAuth/UseAuth";
import axiosPublic from "../../Api/AxiosPublic/AxiosPublic";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      await createUser(data.email, data.password);

      await updateUserProfile({
        displayName: data.name,
        photoURL: data.image,
      });

      const userInfo = {
        name: data.name,
        email: data.email,
        image: data.image,
        address: data.address,
        role: "user",
        status: "active",
        createdAt: new Date().toISOString(),
      };

      await axiosPublic.put(`/users/${data.email}`, userInfo);

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        showConfirmButton: false,
        timer: 1500,
      });

      reset();
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.message,
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-16 bg-base-200/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] -left-[10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] -right-[10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-xl"
      >
        <div className="bg-base-100 shadow-2xl rounded-[2.5rem] border border-base-200/50 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>

          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3 hover:rotate-0 transition-transform duration-300">
                <FiUserPlus className="text-3xl text-secondary" />
              </div>
              <h2 className="text-3xl font-extrabold text-base-content tracking-tight">
                Create Account
              </h2>
              <p className="text-base-content/60 font-medium mt-2">
                Join Local-Chef-Bazar today
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="form-control w-full">
                <label className="label pb-1">
                  <span className="label-text font-bold text-base-content/80">
                    Full Name
                  </span>
                </label>
                <div className="relative flex items-center">
                  <FiUser className="absolute left-4 text-base-content/40 text-lg" />
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className={`input input-bordered w-full pl-11 h-14 bg-base-200/50 focus:bg-base-100 focus:ring-2 transition-all rounded-xl ${errors.name ? "border-error focus:ring-error/20" : "focus:ring-primary/20"}`}
                    {...register("name", {
                      required: "Name is required",
                    })}
                  />
                </div>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-error text-xs font-semibold mt-2 pl-1"
                  >
                    {errors.name.message}
                  </motion.p>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label pb-1">
                  <span className="label-text font-bold text-base-content/80">
                    Email Address
                  </span>
                </label>
                <div className="relative flex items-center">
                  <FiMail className="absolute left-4 text-base-content/40 text-lg" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`input input-bordered w-full pl-11 h-14 bg-base-200/50 focus:bg-base-100 focus:ring-2 transition-all rounded-xl ${errors.email ? "border-error focus:ring-error/20" : "focus:ring-primary/20"}`}
                    {...register("email", {
                      required: "Email is required",
                    })}
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-error text-xs font-semibold mt-2 pl-1"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label pb-1">
                  <span className="label-text font-bold text-base-content/80">
                    Profile Image URL
                  </span>
                </label>
                <div className="relative flex items-center">
                  <FiImage className="absolute left-4 text-base-content/40 text-lg" />
                  <input
                    type="text"
                    placeholder="https://example.com/photo.jpg"
                    className={`input input-bordered w-full pl-11 h-14 bg-base-200/50 focus:bg-base-100 focus:ring-2 transition-all rounded-xl ${errors.image ? "border-error focus:ring-error/20" : "focus:ring-primary/20"}`}
                    {...register("image", {
                      required: "Image URL is required",
                    })}
                  />
                </div>
                {errors.image && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-error text-xs font-semibold mt-2 pl-1"
                  >
                    {errors.image.message}
                  </motion.p>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label pb-1">
                  <span className="label-text font-bold text-base-content/80">
                    Address
                  </span>
                </label>
                <div className="relative flex items-center">
                  <FiMapPin className="absolute left-4 text-base-content/40 text-lg" />
                  <input
                    type="text"
                    placeholder="Enter your full address"
                    className={`input input-bordered w-full pl-11 h-14 bg-base-200/50 focus:bg-base-100 focus:ring-2 transition-all rounded-xl ${errors.address ? "border-error focus:ring-error/20" : "focus:ring-primary/20"}`}
                    {...register("address", {
                      required: "Address is required",
                    })}
                  />
                </div>
                {errors.address && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-error text-xs font-semibold mt-2 pl-1"
                  >
                    {errors.address.message}
                  </motion.p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control w-full">
                  <label className="label pb-1">
                    <span className="label-text font-bold text-base-content/80">
                      Password
                    </span>
                  </label>
                  <div className="relative flex items-center">
                    <FiLock className="absolute left-4 text-base-content/40 text-lg" />
                    <input
                      type="password"
                      placeholder="Create password"
                      className={`input input-bordered w-full pl-11 h-14 bg-base-200/50 focus:bg-base-100 focus:ring-2 transition-all rounded-xl ${errors.password ? "border-error focus:ring-error/20" : "focus:ring-primary/20"}`}
                      {...register("password", {
                        required: "Required",
                        minLength: {
                          value: 6,
                          message: "Min 6 chars",
                        },
                      })}
                    />
                  </div>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-error text-xs font-semibold mt-2 pl-1"
                    >
                      {errors.password.message}
                    </motion.p>
                  )}
                </div>

                <div className="form-control w-full">
                  <label className="label pb-1">
                    <span className="label-text font-bold text-base-content/80">
                      Confirm
                    </span>
                  </label>
                  <div className="relative flex items-center">
                    <FiLock className="absolute left-4 text-base-content/40 text-lg" />
                    <input
                      type="password"
                      placeholder="Repeat password"
                      className={`input input-bordered w-full pl-11 h-14 bg-base-200/50 focus:bg-base-100 focus:ring-2 transition-all rounded-xl ${errors.confirmPassword ? "border-error focus:ring-error/20" : "focus:ring-primary/20"}`}
                      {...register("confirmPassword", {
                        required: "Required",
                        validate: (value) =>
                          value === password || "Doesn't match",
                      })}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-error text-xs font-semibold mt-2 pl-1"
                    >
                      {errors.confirmPassword.message}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="pt-6">
                <button className="btn btn-primary w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all duration-300">
                  Create Account
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-base-200 text-center">
              <p className="text-base-content/70 font-medium">
                Already have an account?
                <Link
                  to="/login"
                  className="text-primary font-bold ml-2 hover:underline underline-offset-4 transition-all"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
