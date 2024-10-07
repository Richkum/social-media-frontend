import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../context/authContex";
import { useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import {
  HomeIcon,
  UserIcon,
  ChatIcon,
  HeartIcon,
  LogoutIcon,
  MenuIcon,
  XIcon,
  PhotographIcon,
  PencilAltIcon,
  TrashIcon,
  DownloadIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

const sidebarLinks = [
  { name: "home", icon: HomeIcon },
  { name: "Profile", icon: UserIcon },
  { name: "Posts", icon: ChatIcon },
  { name: "Likes", icon: HeartIcon },
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newPost, setNewPost] = useState({ text: "", media: null });
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the post to your backend
    console.log("New post:", newPost);
    setNewPost({ text: "", media: null });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPost({ ...newPost, media: file });
    }
  };

  const handleProfileAction = (action) => {
    // Here you would implement the logic for each action
    console.log("Profile action:", action);
    setShowProfileOptions(false);
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar for larger screens */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col h-0 flex-1 bg-sky-800">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                  <img
                    className="h-8 w-auto"
                    src="/logo.svg"
                    alt="Your Company"
                  />
                </div>
                <nav className="mt-5 flex-1 px-2 space-y-1">
                  {sidebarLinks.map((item) => (
                    <a
                      key={item.name}
                      href={`/${item.name}`}
                      className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white hover:bg-sky-600 hover:text-white"
                    >
                      <item.icon
                        className="mr-3 flex-shrink-0 h-6 w-6 text-sky-300 group-hover:text-white"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
              <div className="flex-shrink-0 flex bg-sky-700 p-4">
                <a href="#" className="flex-shrink-0 w-full group block">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="inline-block h-9 w-9 rounded-full cursor-pointer"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                        onClick={() => setShowProfileModal(true)}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">Tom Cook</p>
                      <p className="text-xs font-medium text-sky-300 group-hover:text-sky-200">
                        View profile
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile sidebar */}
        <Transition show={sidebarOpen} as={React.Fragment}>
          <div className="md:hidden">
            <div className="fixed inset-0 flex z-40">
              <Transition.Child
                as={React.Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
              </Transition.Child>
              <Transition.Child
                as={React.Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div className="relative flex-1 flex flex-col max-w-xs w-full bg-sky-800">
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                    <div className="flex-shrink-0 flex items-center px-4">
                      <img
                        className="h-8 w-auto"
                        src="/logo.svg"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="mt-5 px-2 space-y-1">
                      {sidebarLinks.map((item) => (
                        <a
                          key={item.name}
                          href="#"
                          className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-sky-600 hover:text-white"
                        >
                          <item.icon
                            className="mr-4 flex-shrink-0 h-6 w-6 text-sky-300 group-hover:text-white"
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                  <div className="flex-shrink-0 flex bg-sky-700 p-4">
                    <a href="#" className="flex-shrink-0 group block">
                      <div className="flex items-center">
                        <div>
                          <img
                            className="inline-block h-10 w-10 rounded-full cursor-pointer"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                            onClick={() => setShowProfileModal(true)}
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-white">
                            Tom Cook
                          </p>
                          <p className="text-sm font-medium text-sky-300 group-hover:text-sky-200">
                            View profile
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 w-14">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </div>
        </Transition>

        {/* Main content */}
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="h-20 w-20 rounded-full cursor-pointer"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                          onClick={() => setShowProfileModal(true)}
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Tom Cook
                        </h3>
                        <p className="text-sm text-gray-500">
                          Joined September 2020
                        </p>
                        <div className="mt-2">
                          <button className="mr-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                            Followers: 1.2k
                          </button>
                          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                            Following: 567
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Total Posts
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">123</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Total Likes
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">4,567</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Total Comments
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">789</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Account Status
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">Active</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                {/* New post form */}
                <div className="mt-6 bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Create a new post
                    </h3>
                    <form onSubmit={handlePostSubmit} className="mt-5">
                      <div className="mb-4">
                        <label htmlFor="post" className="sr-only">
                          Post
                        </label>
                        <textarea
                          id="post"
                          name="post"
                          rows={3}
                          className="shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="What's on your mind?"
                          value={newPost.text}
                          onChange={(e) =>
                            setNewPost({ ...newPost, text: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/*,video/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current.click()}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                        >
                          <PhotographIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                          Add Photo/Video
                        </button>
                        {newPost.media && (
                          <span className="ml-3 text-sm text-gray-500">
                            {newPost.media.name}
                          </span>
                        )}
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                        >
                          Post
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 w-52 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Profile Picture Modal */}
      {showProfileModal && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Profile"
                      className="w-full h-auto rounded-lg"
                    />
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={() => setShowProfileOptions(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      >
                        Options
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowProfileModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Options Modal */}
      {showProfileOptions && (
        <div
          className="fixed z-20 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Profile Picture Options
                    </h3>
                    <div className="mt-2">
                      <button
                        onClick={() => handleProfileAction("download")}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                      >
                        <DownloadIcon className="mr-3 h-5 w-5 text-gray-400" />
                        Download
                      </button>
                      <button
                        onClick={() => handleProfileAction("edit")}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                      >
                        <PencilAltIcon className="mr-3 h-5 w-5 text-gray-400" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleProfileAction("delete")}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center text-red-600"
                      >
                        <TrashIcon className="mr-3 h-5 w-5 text-red-400" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowProfileOptions(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
