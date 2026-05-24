import { NavLink, Outlet } from "react-router";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/UseAuth/UseAuth";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";

const DashboardLayout = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const [role, setRole] = useState("");

  // load role
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

  return (
    <div className="flex min-h-screen">
      {/* sidebar */}
      <div className="w-72 bg-base-200 p-5">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>

        <ul className="space-y-3">
          {/* COMMON */}
          <li>
            <NavLink to="/dashboard/my-profile" className="btn w-full">
              My Profile
            </NavLink>
          </li>

          {/* USER DASHBOARD */}
          {role === "user" && (
            <>
              <li>
                <NavLink to="/dashboard/my-orders" className="btn w-full">
                  My Orders
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/my-reviews" className="btn w-full">
                  My Reviews
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/favorites" className="btn w-full">
                  Favorite Meals
                </NavLink>
              </li>
            </>
          )}

          {/* CHEF DASHBOARD */}
          {role === "chef" && (
            <>
              <li>
                <NavLink to="/dashboard/create-meal" className="btn w-full">
                  Create Meal
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/my-meals" className="btn w-full">
                  My Meals
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/order-requests" className="btn w-full">
                  Order Requests
                </NavLink>
              </li>
            </>
          )}

          {/* ADMIN DASHBOARD */}
          {role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/manage-users" className="btn w-full">
                  Manage Users
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/manage-requests" className="btn w-full">
                  Manage Requests
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/platform-statistics"
                  className="btn w-full"
                >
                  Platform Statistics
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
