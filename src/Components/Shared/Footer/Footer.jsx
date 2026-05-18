import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* brand */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Local-Chef-Bazar</h2>

          <p className="text-sm leading-7 text-gray-300">
            Discover healthy and delicious homemade meals prepared by talented
            local chefs. Fresh food delivered with love.
          </p>
        </div>

        {/* contact */}
        <div>
          <h3 className="text-xl font-semibold mb-5">Contact Details</h3>

          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt />
              Dhaka, Bangladesh
            </p>

            <p className="flex items-center gap-2">
              <FaPhoneAlt />
              +880 1234-567890
            </p>

            <p className="flex items-center gap-2">
              <FaEnvelope />
              support@localchefbazar.com
            </p>
          </div>
        </div>

        {/* working hours */}
        <div>
          <h3 className="text-xl font-semibold mb-5">Working Hours</h3>

          <div className="space-y-2 text-sm">
            <p>Saturday - Thursday</p>
            <p>9:00 AM - 10:00 PM</p>

            <div className="pt-2">
              <p>Friday</p>
              <p>2:00 PM - 10:00 PM</p>
            </div>
          </div>
        </div>

        {/* social media */}
        <div>
          <h3 className="text-xl font-semibold mb-5">Follow Us</h3>

          <div className="flex items-center gap-4 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 transition duration-300"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-400 transition duration-300"
            >
              <FaInstagram />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-400 transition duration-300"
            >
              <FaTwitter />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-red-500 transition duration-300"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* bottom footer */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-2 text-sm">
          <p>
            © {new Date().getFullYear()} Local-Chef-Bazar. All rights reserved.
          </p>

          <p>Made with ❤️ for homemade food lovers</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
