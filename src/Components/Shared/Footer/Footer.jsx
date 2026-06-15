import { Link } from "react-router";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaUtensils,
} from "react-icons/fa";

const Footer = () => {
  return (
    // FIX: Replaced hardcoded gray classes with var(--bg-base) and a universal shadow gradient
    <footer className="relative overflow-hidden bg-gradient-to-b from-[var(--bg-base)] to-black/5 text-[var(--text-base)] pt-20 mt-16 z-10 border-t border-[var(--border-base)] transition-colors duration-300">
      {/* Abstract Background Blurs for Premium SaaS Look */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/3 -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] translate-y-1/3 translate-x-1/3 -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
        {/* SECTION 1 & 5: BRAND & SOCIAL */}
        <div className="flex flex-col gap-6 lg:pr-4">
          <Link to="/" className="flex flex-col group w-fit">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl shadow-inner group-hover:scale-110 transition-transform duration-300 shrink-0">
                <FaUtensils className="text-2xl text-primary drop-shadow-sm" />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-[var(--text-base)] group-hover:text-primary transition-colors duration-300">
                Local Chef Bazar
              </h2>
            </div>
            <p className="text-[10px] font-bold tracking-widest uppercase text-primary mt-1.5 ml-[3.25rem]">
              Homemade Food Marketplace
            </p>
          </Link>
          <p className="text-[var(--text-base)] opacity-70 leading-relaxed font-medium">
            Connecting food lovers with talented local chefs and authentic
            homemade meals.
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap gap-3 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-xl border border-[var(--border-base)] bg-[var(--bg-base)] flex items-center justify-center text-[var(--text-base)] hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
            >
              <FaFacebookF className="text-lg" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-xl border border-[var(--border-base)] bg-[var(--bg-base)] flex items-center justify-center text-[var(--text-base)] hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] hover:border-transparent hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
            >
              <FaInstagram className="text-lg" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-xl border border-[var(--border-base)] bg-[var(--bg-base)] flex items-center justify-center text-[var(--text-base)] hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
            >
              <FaLinkedinIn className="text-lg" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-xl border border-[var(--border-base)] bg-[var(--bg-base)] flex items-center justify-center text-[var(--text-base)] hover:bg-gray-900 hover:border-gray-900 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
            >
              <FaGithub className="text-lg" />
            </a>
          </div>
        </div>

        {/* SECTION 2: QUICK LINKS */}
        <div>
          <h3 className="text-lg font-bold mb-6 text-[var(--text-base)]">
            Quick Links
          </h3>
          <ul className="space-y-4 font-medium">
            {["Home", "Meals", "Blog", "About", "Contact"].map((item) => (
              <li key={item}>
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-[var(--text-base)] opacity-70 hover:opacity-100 hover:text-primary hover:translate-x-2 transition-all duration-300 inline-flex items-center"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* SECTION 3: SUPPORT */}
        <div>
          <h3 className="text-lg font-bold mb-6 text-[var(--text-base)]">
            Support
          </h3>
          <ul className="space-y-4 font-medium">
            {[
              "Dashboard",
              "Privacy Policy",
              "Terms & Conditions",
              "Help Center",
            ].map((item) => (
              <li key={item}>
                <Link
                  to={`/${item.replace(/\s+|&+/g, "").toLowerCase()}`}
                  className="text-[var(--text-base)] opacity-70 hover:opacity-100 hover:text-primary hover:translate-x-2 transition-all duration-300 inline-flex items-center"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* SECTION 4: CONTACT */}
        <div>
          <h3 className="text-lg font-bold mb-6 text-[var(--text-base)]">
            Contact Us
          </h3>
          <ul className="space-y-5 text-[var(--text-base)] opacity-80 font-medium">
            <li className="flex items-start gap-4 hover:text-primary transition-colors duration-300 group">
              <div className="p-2.5 border border-[var(--border-base)] bg-[var(--bg-base)] rounded-xl group-hover:bg-primary/20 group-hover:border-primary/20 group-hover:text-primary transition-colors duration-300 shrink-0">
                <FaEnvelope className="text-lg" />
              </div>
              <span className="pt-1.5 break-all">
                support@localchefbazar.com
              </span>
            </li>
            <li className="flex items-start gap-4 hover:text-primary transition-colors duration-300 group">
              <div className="p-2.5 border border-[var(--border-base)] bg-[var(--bg-base)] rounded-xl group-hover:bg-primary/20 group-hover:border-primary/20 group-hover:text-primary transition-colors duration-300 shrink-0">
                <FaPhoneAlt className="text-lg" />
              </div>
              <span className="pt-1.5">+880 1234-567890</span>
            </li>
            <li className="flex items-start gap-4 hover:text-primary transition-colors duration-300 group">
              <div className="p-2.5 border border-[var(--border-base)] bg-[var(--bg-base)] rounded-xl group-hover:bg-primary/20 group-hover:border-primary/20 group-hover:text-primary transition-colors duration-300 shrink-0">
                <FaMapMarkerAlt className="text-lg" />
              </div>
              <span className="pt-1.5">Dhaka, Bangladesh</span>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      {/* FIX: Set to a completely safe transition color */}
      <div className="border-t border-[var(--border-base)] bg-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-[var(--text-base)] opacity-70">
          <p>© 2026 Local Chef Bazar. All Rights Reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with{" "}
            <span className="text-red-500 animate-pulse text-lg">❤️</span> by
            Md. Jahidul Islam
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
