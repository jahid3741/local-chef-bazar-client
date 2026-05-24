import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";
import useAuth from "../../Hooks/UseAuth/UseAuth";

const Login = () => {
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(from);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.message,
          confirmButtonColor: "#ef4444",
        });
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-base-200/30 relative overflow-hidden py-12">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="bg-base-100 shadow-2xl rounded-[2.5rem] border border-base-200/50 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>

          <div className="p-8 md:p-10">
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 -rotate-3 hover:rotate-0 transition-transform duration-300">
                <FiLogIn className="text-3xl text-primary" />
              </div>
              <h2 className="text-3xl font-extrabold text-base-content tracking-tight">
                Welcome Back
              </h2>
              <p className="text-base-content/60 font-medium mt-2">
                Sign in to continue to Local-Chef-Bazar
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                    Password
                  </span>
                </label>
                <div className="relative flex items-center">
                  <FiLock className="absolute left-4 text-base-content/40 text-lg" />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className={`input input-bordered w-full pl-11 h-14 bg-base-200/50 focus:bg-base-100 focus:ring-2 transition-all rounded-xl ${errors.password ? "border-error focus:ring-error/20" : "focus:ring-primary/20"}`}
                    {...register("password", {
                      required: "Password is required",
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

              <div className="pt-2">
                <button className="btn btn-primary w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all duration-300">
                  Sign In
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-base-200 text-center">
              <p className="text-base-content/70 font-medium">
                Don't have an account?
                <Link
                  to="/register"
                  className="text-primary font-bold ml-2 hover:underline underline-offset-4 transition-all"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
