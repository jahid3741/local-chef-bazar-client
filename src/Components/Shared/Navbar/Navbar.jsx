import { Link, NavLink } from "react-router";
import { useEffect, useState } from "react";
import { FaUtensils, FaSun, FaMoon, FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useAuth from "../../../Hooks/UseAuth/UseAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

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

  // Modern active route styling - SaaS Look
  const navLinkStyle = ({ isActive }) =>
    `relative font-semibold px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 ${
      isActive
        ? "text-primary bg-primary/10 shadow-sm"
        : "text-base-content/70 hover:text-primary hover:bg-base-200/50"
    }`;

  // Primary Navigation Links
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
      {user && (
        <li className="hidden lg:block">
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
      className="sticky top-0 z-50 bg-base-100/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-base-200 dark:border-gray-800 shadow-sm transition-colors duration-300"
    >
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20">
        {/* LEFT SECTION - Mobile Menu & Logo */}
        <div className="navbar-start w-auto lg:w-1/3 flex-shrink-0">
          {/* Mobile Hamburger Menu */}
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle hover:bg-base-200 dark:hover:bg-gray-800 mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-base-content dark:text-gray-200"
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
              className="menu menu-md dropdown-content mt-4 z-[1] p-4 shadow-2xl bg-base-100/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl w-64 border border-base-200 dark:border-gray-700 gap-2"
            >
              {mainNavLinks}

              <div className="divider my-1 dark:border-gray-700"></div>

              {/* Mobile Profile / Auth Buttons */}
              {user ? (
                <>
                  <li className="px-4 py-2 bg-base-200/50 dark:bg-gray-800 rounded-xl mb-2">
                    <span className="font-bold text-base-content dark:text-white truncate">
                      Hi, {user?.displayName || "User"}
                    </span>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard"
                      className="font-semibold px-4 py-2 hover:bg-primary/10 rounded-xl"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-error font-semibold px-4 py-2 hover:bg-error/10 rounded-xl flex gap-2 items-center mt-1"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                </>
              ) : (
                <div className="flex flex-col gap-3 mt-2 px-2">
                  <Link
                    to="/login"
                    className="btn btn-sm btn-ghost bg-base-200 dark:bg-gray-800 rounded-xl w-full"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-sm btn-primary rounded-xl text-white shadow-md shadow-primary/30 w-full"
                  >
                    Register
                  </Link>
                </div>
              )}
            </ul>
          </div>

          {/* Branding / Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2.5 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl group-hover:scale-110 transition-all duration-300 shadow-inner">
              <FaUtensils className="text-xl sm:text-2xl text-primary drop-shadow-sm" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-base-content dark:text-white group-hover:text-primary transition-colors duration-300 whitespace-nowrap">
                Local Chef Bazar
              </h2>
              <p className="text-[10px] font-bold tracking-widest uppercase text-base-content/50 dark:text-gray-400 hidden sm:block mt-0.5">
                Homemade Food Marketplace
              </p>
            </div>
          </Link>
        </div>

        {/* CENTER SECTION - Desktop Links */}
        <div className="navbar-center hidden lg:flex w-auto justify-center">
          <ul className="menu menu-horizontal px-1 gap-1.5">{mainNavLinks}</ul>
        </div>

        {/* RIGHT SECTION - Actions & Profile */}
        <div className="navbar-end flex-grow lg:w-1/3 flex gap-3 sm:gap-4 justify-end items-center">
          {/* THEME TOGGLE BUTTON */}
          <label className="swap swap-rotate btn btn-ghost btn-circle btn-sm sm:btn-md hover:bg-base-200 dark:hover:bg-gray-800">
            <input
              type="checkbox"
              onChange={handleThemeToggle}
              checked={theme === "dark"}
            />
            <FaSun className="swap-off fill-current w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
            <FaMoon className="swap-on fill-current w-4 h-4 sm:w-5 sm:h-5 text-blue-300" />
          </label>

          {/* Desktop Authentication State */}
          <div className="hidden lg:flex items-center">
            {user ? (
              /* Profile Dropdown (Clean & Minimal SaaS Style) */
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar ring-2 ring-base-200 hover:ring-primary/50 dark:ring-gray-700 transition-all shadow-sm"
                >
                  <div className="w-9 h-9 rounded-full object-cover">
                    <img
                      src={
                        user?.photoURL ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                      alt="User Avatar"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-4 z-[1] p-3 shadow-xl bg-base-100 dark:bg-gray-800 rounded-2xl w-56 border border-base-200 dark:border-gray-700"
                >
                  <div className="px-4 py-3 mb-2 bg-base-200/50 dark:bg-gray-900/50 rounded-xl flex flex-col">
                    <span className="text-xs font-semibold text-base-content/60 dark:text-gray-400 uppercase tracking-wider mb-1">
                      Signed in as
                    </span>
                    <span className="font-bold text-base-content dark:text-white truncate text-sm">
                      {user?.displayName || "User"}
                    </span>
                  </div>
                  <li>
                    <Link
                      to="/dashboard"
                      className="font-semibold py-2.5 px-4 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <div className="divider my-1 dark:border-gray-700"></div>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-error font-semibold py-2.5 px-4 hover:bg-error/10 hover:text-error rounded-xl transition-colors flex items-center gap-2"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="btn btn-ghost rounded-xl px-6 font-bold hover:bg-base-200 dark:hover:bg-gray-800 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary rounded-xl px-7 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 border-none font-bold text-white"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
