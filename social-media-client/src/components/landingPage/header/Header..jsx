import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed w-full z-10">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/public/vite.svg"
              width={40}
              height={40}
              alt="Logo"
              className="mr-2"
            />
            <h1 className="text-2xl md:text-3xl font-bold text-deepSkyBlue">
              YouGram
            </h1>
          </motion.div>
          <div className="hidden md:flex space-x-4">
            <a
              href="#features"
              className="text-gray-600 hover:text-deepSkyBlue transition duration-300"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-deepSkyBlue transition duration-300"
            >
              Testimonials
            </a>
            <Link
              to={"/login"}
              className="bg-skyBlue-900 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 text-center"
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className="bg-skyBlue-900 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 text-center"
            >
              Sign Up
            </Link>
          </div>
          <button
            className="md:hidden text-deepSkyBlue"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>
        </nav>
        {isMenuOpen && (
          <motion.div
            className="md:hidden mt-4 flex flex-col space-y-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <a
              href="#features"
              className="text-gray-600 hover:text-deepSkyBlue transition duration-300"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-deepSkyBlue transition duration-300"
            >
              Testimonials
            </a>
            <Link
              to={"/login"}
              className="bg-skyBlue-900 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 text-center"
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className="bg-skyBlue-900 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 text-center"
            >
              Sign Up
            </Link>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
