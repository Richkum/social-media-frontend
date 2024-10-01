import { FaUserFriends, FaComments, FaHeart, FaShareAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="text-2xl font-bold mb-4">YouGram</h4>
            <p>Connecting people, sharing ideas, and building communities.</p>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-deepSkyBlue transition duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <Link
                  to={"/terms-and-conditions"}
                  className="hover:text-deepSkyBlue transition duration-300"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-4">Contact Us</h5>
            <p>Email: support@YouGram.com</p>
            <p>Phone: (+237) 690-432-112</p>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-4">Follow Us</h5>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-2xl hover:text-deepSkyBlue transition duration-300"
              >
                <FaUserFriends />
              </a>
              <a
                href="#"
                className="text-2xl hover:text-deepSkyBlue transition duration-300"
              >
                <FaComments />
              </a>
              <a
                href="#"
                className="text-2xl hover:text-deepSkyBlue transition duration-300"
              >
                <FaHeart />
              </a>
              <a
                href="#"
                className="text-2xl hover:text-deepSkyBlue transition duration-300"
              >
                <FaShareAlt />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
