import { NavLink, Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* sidebar */}
      <div className="w-72 bg-base-200 p-5">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>

        <ul className="space-y-3">
          <li>
            <NavLink to="/dashboard/my-profile" className="btn w-full">
              My Profile
            </NavLink>
          </li>

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
