import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const [users, setUsers] = useState([]);

  // load users
  useEffect(() => {
    axiosSecure.get("/users").then((res) => {
      setUsers(res.data);
    });
  }, [axiosSecure]);

  // make fraud
  const handleFraud = async (email) => {
    const confirm = await Swal.fire({
      title: "Mark as fraud?",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/users/${email}/fraud`);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",

          title: "User marked as fraud",
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

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Manage Users</h2>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>

              <th>Name</th>

              <th>Email</th>

              <th>Role</th>

              <th>Status</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>

                <td>{user.name}</td>

                <td>{user.email}</td>

                <td className="capitalize">{user.role}</td>

                <td className="capitalize">{user.status}</td>

                <td>
                  {user.role !== "admin" && user.status !== "fraud" && (
                    <button
                      onClick={() => handleFraud(user.email)}
                      className="btn btn-xs btn-error"
                    >
                      Fraud
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
