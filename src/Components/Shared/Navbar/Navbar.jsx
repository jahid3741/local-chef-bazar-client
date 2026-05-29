import { Link, NavLink } from "react-router";
import { useEffect, useState } from "react"; 
import { FaUtensils, FaSun, FaMoon } from "react-icons/fa";
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

  const navLinkStyle = ({ isActive }) =>
    `relative font-semibold px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 ${
      isActive
        ? "text-primary bg-primary/10"
        : "text-base-content/70 hover:text-primary hover:bg-base-200/50"
    }`;

  const navLinks = (
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
        <li>
          <NavLink to="/dashboard" className={navLinkStyle}>
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-lg border-b border-base-200/50 shadow-sm"
    >
      <div className="navbar max-w-7xl mx-auto px-4 lg:px-8 h-20">
        <div className="navbar-start w-full lg:w-1/3 justify-between lg:justify-start">
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
              className="menu menu-md dropdown-content mt-4 z-[1] p-4 shadow-xl bg-base-100 rounded-2xl w-64 border border-base-200 gap-2"
            >
              {navLinks}
            </ul>
          </div>

          <Link to="/" className="flex items-center gap-3 group ml-2 lg:ml-0">
            <div className="p-2.5 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl group-hover:scale-110 transition-all duration-300 shadow-inner">
              <FaUtensils className="text-2xl text-primary drop-shadow-sm" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl lg:text-2xl font-extrabold tracking-tight text-base-content group-hover:text-primary transition-colors duration-300">
                Local-Chef-Bazar
              </h2>
              <p className="text-[10px] font-bold tracking-widest uppercase text-base-content/50 hidden xl:block mt-0.5">
                Homemade Meals Marketplace
              </p>
            </div>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex w-1/3 justify-center">
          <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
        </div>

        {/* Updated navbar-end to ensure it displays correctly and includes the theme toggle */}
        <div className="navbar-end flex w-auto lg:w-1/3 gap-2 lg:gap-4 justify-end">
          {/* THEME TOGGLE BUTTON */}
          <label className="swap swap-rotate btn btn-ghost btn-circle">
            <input
              type="checkbox"
              onChange={handleThemeToggle}
              checked={theme === "dark"}
            />
            {/* Sun icon */}
            <FaSun className="swap-off fill-current w-5 h-5 text-amber-500" />
            {/* Moon icon */}
            <FaMoon className="swap-on fill-current w-5 h-5 text-blue-300" />
          </label>

          {user ? (
            <div className="flex items-center gap-2 lg:gap-4 bg-base-200/50 py-1.5 px-2 rounded-full border border-base-200 shadow-sm hidden md:flex">
              <div className="avatar">
                <div className="w-10 h-10 rounded-full ring-2 ring-primary/30 ring-offset-2 ring-offset-base-100 shadow-md">
                  <img src={user?.photoURL} alt="User avatar" />
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-ghost btn-sm text-error hover:bg-error/10 hover:text-error rounded-full px-4 font-bold mr-1"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="items-center gap-2 hidden md:flex">
              <Link
                to="/login"
                className="btn btn-ghost rounded-full px-6 font-bold hover:bg-primary/10 hover:text-primary transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary rounded-full px-8 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all duration-300 border-none font-bold text-white"
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
