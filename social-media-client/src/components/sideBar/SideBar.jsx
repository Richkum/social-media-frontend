import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { logout } from "../../context/authContex";
import { useDispatch } from "react-redux";
import {
  XIcon,
  HomeIcon,
  BellIcon,
  UserCircleIcon,
  CogIcon,
  UsersIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import LogoutModal from "../navbar/logoutModal";

function SideBar({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const quickLinks = [
    { name: "Home", icon: HomeIcon, path: "/home" },
    { name: "Profile", icon: UserCircleIcon, path: "/profile" },
    // { name: "Notifications", icon: BellIcon, path: "/notifications" },
    { name: "Friends", icon: UsersIcon, path: "/friends" },
    // { name: "Dashboard", icon: CogIcon, path: "/dashboard" },
  ];

  return (
    <>
      <div
        className={`lg:w-1/5 bg-white shadow-lg fixed left-0 top-0 bottom-0 z-30 overflow-y-auto ${
          isMobileMenuOpen ? "block" : "hidden lg:block"
        }`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>

          <h1 className="text-3xl font-bold mb-6 text-blue-400">
            You <span className="text-4xl text-blue-500">Gram</span>
          </h1>
          <nav className="flex-grow">
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`flex items-center p-2 text-gray-700 rounded-lg transition duration-150 ease-in-out 
                      ${
                        location.pathname === link.path
                          ? "bg-blue-400 text-white" // Active link style
                          : "hover:bg-blue-50"
                      }`}
                  >
                    <link.icon
                      className={`h-6 w-6 mr-3 ${
                        location.pathname === link.path
                          ? "text-white" // Active icon style
                          : "text-blue-400"
                      }`}
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto">
            <button
              className="flex items-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition duration-150 ease-in-out"
              onClick={() => setIsModalOpen(true)}
            >
              <LogoutIcon className="h-6 w-6 mr-3" />
              Logout
            </button>
          </div>
        </div>
        {isModalOpen && (
          <LogoutModal
            onConfirm={handleLogout}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </>
  );
}

export default SideBar;
