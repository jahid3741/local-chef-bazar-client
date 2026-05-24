import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaUtensils,
} from "react-icons/fa";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <footer className="bg-[#111827] text-white pt-20 relative overflow-hidden mt-16 z-10">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary"></div>

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 -z-10"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16"
      >
        <motion.div variants={itemVariants} className="lg:pr-8">
          <div className="flex items-center gap-3 mb-6 group">
            <div className="p-2.5 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl border border-primary/20 shadow-inner group-hover:scale-110 transition-transform duration-300">
              <FaUtensils className="text-2xl text-primary drop-shadow-sm" />
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-white group-hover:text-primary transition-colors duration-300">
              Local-Chef-Bazar
            </h2>
          </div>
          <p className="text-gray-400 leading-relaxed font-medium">
            Discover healthy and delicious homemade meals prepared by talented
            local chefs. Fresh food delivered with love directly to your door.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-bold mb-6 text-white tracking-wide relative inline-block">
            Contact Details
            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
          </h3>
          <ul className="space-y-4 text-gray-400 font-medium">
            <li className="flex items-start gap-4 hover:text-white transition-colors duration-300 group">
              <div className="p-2.5 bg-gray-800 rounded-lg group-hover:bg-primary/20 group-hover:text-primary transition-colors duration-300">
                <FaMapMarkerAlt className="text-lg" />
              </div>
              <span className="pt-1">Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-start gap-4 hover:text-white transition-colors duration-300 group">
              <div className="p-2.5 bg-gray-800 rounded-lg group-hover:bg-primary/20 group-hover:text-primary transition-colors duration-300">
                <FaPhoneAlt className="text-lg" />
              </div>
              <span className="pt-1">+880 1234-567890</span>
            </li>
            <li className="flex items-start gap-4 hover:text-white transition-colors duration-300 group">
              <div className="p-2.5 bg-gray-800 rounded-lg group-hover:bg-primary/20 group-hover:text-primary transition-colors duration-300">
                <FaEnvelope className="text-lg" />
              </div>
              <span className="pt-1">support@localchefbazar.com</span>
            </li>
          </ul>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-bold mb-6 text-white tracking-wide relative inline-block">
            Working Hours
            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
          </h3>
          <ul className="space-y-4 font-medium">
            <li className="flex justify-between items-center border-b border-gray-800 pb-3">
              <span className="text-gray-400">Sat - Thu</span>
              <span className="text-primary font-bold">9:00 AM - 10:00 PM</span>
            </li>
            <li className="flex justify-between items-center pt-1">
              <span className="text-gray-400">Friday</span>
              <span className="text-primary font-bold">2:00 PM - 10:00 PM</span>
            </li>
          </ul>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-bold mb-6 text-white tracking-wide relative inline-block">
            Follow Us
            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
          </h3>
          <div className="flex flex-wrap gap-4 mt-4">
            <motion.a
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#1877F2] hover:text-white transition-all duration-300 shadow-lg"
            >
              <FaFacebookF className="text-xl" />
            </motion.a>
            <motion.a
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] hover:text-white transition-all duration-300 shadow-lg"
            >
              <FaInstagram className="text-xl" />
            </motion.a>
            <motion.a
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#1DA1F2] hover:text-white transition-all duration-300 shadow-lg"
            >
              <FaTwitter className="text-xl" />
            </motion.a>
            <motion.a
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#FF0000] hover:text-white transition-all duration-300 shadow-lg"
            >
              <FaYoutube className="text-xl" />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>

      <div className="border-t border-gray-800 bg-[#0b0f19]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-gray-500">
          <p>
            © {new Date().getFullYear()} Local-Chef-Bazar. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Made with{" "}
            <span className="text-red-500 animate-pulse text-lg">❤️</span> for
            homemade food lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
