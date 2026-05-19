import { Link, NavLink } from "react-router";

import { FaUtensils } from "react-icons/fa";

import Swal from "sweetalert2";
import useAuth from "../../../Hooks/UseAuth/UseAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logout Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : ""
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/meals"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : ""
          }
        >
          Meals
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-bold"
                : "hover:text-primary duration-200"
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* navbar start */}
        <div className="navbar-start">
          {/* mobile menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>

          {/* logo */}
          <Link to="/" className="flex items-center gap-2">
            <FaUtensils className="text-3xl text-primary" />

            <div>
              <h2 className="text-xl lg:text-2xl font-bold">
                Local-Chef-Bazar
              </h2>

              <p className="text-xs text-gray-500 hidden lg:block">
                Homemade Meals Marketplace
              </p>
            </div>
          </Link>
        </div>

        {/* navbar center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-base font-medium gap-2">
            {navLinks}
          </ul>
        </div>

        {/* navbar end */}
        <div className="navbar-end gap-2">
          {user ? (
            <>
              <img
                src={user?.photoURL}
                alt="user"
                className="w-10 h-10 rounded-full object-cover border"
              />

              <button
                onClick={handleLogout}
                className="btn btn-error btn-sm text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-primary btn-sm">
                Login
              </Link>

              <Link
                to="/register"
                className="btn btn-primary btn-sm text-white"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
