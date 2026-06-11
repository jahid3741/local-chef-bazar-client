import { Link, NavLink } from "react-router"; // Note: Updated to react-router-dom
import { useEffect, useState } from "react";
import { FaUtensils, FaSun, FaMoon, FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useAuth from "../../../Hooks/UseAuth/UseAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  // --- THEME TOGGLE LOGIC ---
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light",
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  // --------------------------

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

  // Modern active route styling
  const navLinkStyle = ({ isActive }) =>
    `relative font-semibold px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 ${
      isActive
        ? "text-primary bg-primary/10 shadow-sm"
        : "text-base-content/70 hover:text-primary hover:bg-base-200/50"
    }`;

  // Primary Navigation Links (Dashboard placed exactly between Meals and Blog)
  const mainNavLinks = (
    <>
      <li>
        <NavLink to="/" className={navLinkStyle}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/meals" className={navLinkStyle}>
          Meals
        </NavLink>
      </li>

      {/* Conditionally render Dashboard in the middle */}
      {user && (
        <li>
          <NavLink to="/dashboard" className={navLinkStyle}>
            Dashboard
          </NavLink>
        </li>
      )}

      <li>
        <NavLink to="/blog" className={navLinkStyle}>
          Blog
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={navLinkStyle}>
          About
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" className={navLinkStyle}>
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-xl border-b border-base-200 shadow-sm"
    >
      <div className="navbar max-w-7xl mx-auto px-4 lg:px-8 h-20">
        {/* LEFT SECTION - Mobile Menu & Logo */}
        <div className="navbar-start w-full lg:w-1/3 justify-between lg:justify-start">
          {/* Mobile Hamburger Menu */}
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle hover:bg-base-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-base-content"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content mt-4 z-[1] p-4 shadow-2xl bg-base-100/95 backdrop-blur-xl rounded-2xl w-64 border border-base-200 gap-2"
            >
              {/* Shows all links including Dashboard if logged in */}
              {mainNavLinks}

              <div className="divider my-1"></div>

              {/* Mobile Logout / Auth Buttons */}
              {user ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-error font-semibold px-4 py-2 hover:bg-error/10 rounded-xl flex gap-2 items-center"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              ) : (
                <div className="flex flex-col gap-3 mt-2 px-2">
                  <Link
                    to="/login"
                    className="btn btn-sm btn-ghost bg-base-200 rounded-xl w-full"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-sm btn-primary rounded-xl text-white shadow-md shadow-primary/30 w-full"
                  >
                    Join as Chef
                  </Link>
                </div>
              )}
            </ul>
          </div>

          {/* Branding / Logo */}
          <Link to="/" className="flex items-center gap-3 group ml-2 lg:ml-0">
            <div className="p-2.5 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl group-hover:scale-110 transition-all duration-300 shadow-inner">
              <FaUtensils className="text-2xl text-primary drop-shadow-sm" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl lg:text-2xl font-extrabold tracking-tight text-base-content group-hover:text-primary transition-colors duration-300">
                Local Chef Bazar
              </h2>
              <p className="text-[10px] font-bold tracking-widest uppercase text-base-content/50 hidden xl:block mt-0.5">
                Homemade Food Marketplace
              </p>
            </div>
          </Link>
        </div>

        {/* CENTER SECTION - Desktop Links */}
        <div className="navbar-center hidden lg:flex w-auto justify-center">
          <ul className="menu menu-horizontal px-1 gap-2">{mainNavLinks}</ul>
        </div>

        {/* RIGHT SECTION - Actions & Profile */}
        <div className="navbar-end flex w-auto lg:w-1/3 gap-3 justify-end items-center">
          {/* THEME TOGGLE BUTTON */}
          <label className="swap swap-rotate btn btn-ghost btn-circle hover:bg-base-200">
            <input
              type="checkbox"
              onChange={handleThemeToggle}
              checked={theme === "dark"}
            />
            <FaSun className="swap-off fill-current w-5 h-5 text-amber-500" />
            <FaMoon className="swap-on fill-current w-5 h-5 text-blue-300" />
          </label>

          {/* Authentication State (Desktop) */}
          {user ? (
            /* Simple User Badge + Logout (No Dropdown) */
            <div className="hidden lg:flex items-center gap-3 bg-base-200/50 py-1.5 px-2 rounded-full border border-base-200 shadow-sm">
              <div className="avatar">
                <div className="w-9 h-9 rounded-full ring-2 ring-primary/30 ring-offset-2 ring-offset-base-100 shadow-md">
                  <img
                    src={
                      user?.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                    alt="User Profile"
                  />
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-ghost btn-sm text-error hover:bg-error/10 hover:text-error rounded-full px-4 font-bold mr-1 flex items-center gap-2"
              >
                Logout
              </button>
            </div>
          ) : (
            /* Logged Out Buttons (Desktop) */
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/login"
                className="btn btn-ghost rounded-xl px-5 font-bold hover:bg-base-200 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary rounded-xl px-6 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all duration-300 border-none font-bold text-white"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
