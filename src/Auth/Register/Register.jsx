import { Link, useNavigate } from "react-router";

import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
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
      // firebase register
      await createUser(data.email, data.password);

      // update firebase profile
      await updateUserProfile({
        displayName: data.name,

        photoURL: data.image,
      });

      // save user in mongodb
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
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-10">
      <div className="card bg-base-100 w-full max-w-lg shadow-2xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* name */}
            <div className="mb-4">
              <label className="label">
                <span className="label-text">Name</span>
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered w-full"
                {...register("name", {
                  required: "Name is required",
                })}
              />

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* email */}
            <div className="mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                {...register("email", {
                  required: "Email is required",
                })}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* image */}
            <div className="mb-4">
              <label className="label">
                <span className="label-text">Profile Image URL</span>
              </label>

              <input
                type="text"
                placeholder="Enter image URL"
                className="input input-bordered w-full"
                {...register("image", {
                  required: "Image URL is required",
                })}
              />

              {errors.image && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* address */}
            <div className="mb-4">
              <label className="label">
                <span className="label-text">Address</span>
              </label>

              <input
                type="text"
                placeholder="Enter your address"
                className="input input-bordered w-full"
                {...register("address", {
                  required: "Address is required",
                })}
              />

              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* password */}
            <div className="mb-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <input
                type="password"
                placeholder="Enter password"
                className="input input-bordered w-full"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* confirm password */}
            <div className="mb-6">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>

              <input
                type="password"
                placeholder="Confirm password"
                className="input input-bordered w-full"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",

                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button className="btn btn-primary w-full">Register</button>
          </form>

          <p className="text-center mt-5">
            Already have an account?
            <Link to="/login" className="text-primary font-semibold ml-2">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
