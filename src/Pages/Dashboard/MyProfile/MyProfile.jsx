import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/UseAuth/UseAuth";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";

const MyProfile = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const [userData, setUserData] = useState({});

  // load user profile
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

  // request role
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
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",

        title: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="bg-base-100 shadow-xl rounded-2xl p-8">
        {/* profile top */}
        <div className="flex flex-col items-center text-center">
          <img
            src={userData.image}
            alt={userData.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-primary"
          />

          <h2 className="text-3xl font-bold mt-5">{userData.name}</h2>

          <p className="text-gray-500 mt-1">{userData.email}</p>
        </div>

        {/* profile info */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-base-200 rounded-xl p-5">
            <h3 className="font-bold text-lg mb-2">Address</h3>

            <p>{userData.address}</p>
          </div>

          <div className="bg-base-200 rounded-xl p-5">
            <h3 className="font-bold text-lg mb-2">Role</h3>

            <p className="capitalize">{userData.role}</p>
          </div>

          <div className="bg-base-200 rounded-xl p-5">
            <h3 className="font-bold text-lg mb-2">Status</h3>

            <p className="capitalize">{userData.status}</p>
          </div>

          {userData.role === "chef" && (
            <div className="bg-base-200 rounded-xl p-5">
              <h3 className="font-bold text-lg mb-2">Chef ID</h3>

              <p>{userData.chefId}</p>
            </div>
          )}
        </div>

        {/* buttons */}
        <div className="flex flex-wrap gap-4 mt-10">
          {userData.role !== "chef" && userData.role !== "admin" && (
            <button
              onClick={() => handleRequest("chef")}
              className="btn btn-primary"
            >
              Be a Chef
            </button>
          )}

          {userData.role !== "admin" && (
            <button
              onClick={() => handleRequest("admin")}
              className="btn btn-secondary"
            >
              Be an Admin
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
