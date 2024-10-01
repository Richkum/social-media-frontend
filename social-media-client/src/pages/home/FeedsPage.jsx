import React, { useState, useEffect } from "react";
import {
  HeartIcon,
  ChatIcon,
  DotsHorizontalIcon,
  FlagIcon,
  SearchIcon,
  XIcon,
  UserIcon,
  HomeIcon,
  BellIcon,
  UserCircleIcon,
  CogIcon,
  BookmarkIcon,
  UsersIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/solid";
import Navbar from "../../components/navbar/Navbar";

const FeedsPage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        isFollowing: false,
      },
      content: "Just had an amazing day at the beach! 🏖️",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      likes: 42,
      comments: 5,
      timestamp: "2h ago",
      isLiked: false,
    },
    {
      id: 2,
      user: {
        name: "Jane Smith",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        isFollowing: true,
      },
      content: "Just finished reading an amazing book! 📚 Highly recommend it.",
      image: null,
      likes: 23,
      comments: 7,
      timestamp: "5h ago",
      isLiked: true,
    },
  ]);

  const [showComments, setShowComments] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleFollow = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              user: { ...post.user, isFollowing: !post.user.isFollowing },
            }
          : post
      )
    );
  };

  const toggleComments = (postId) => {
    setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleReport = (postId) => {
    console.log(`Reported post ${postId}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      const newHistory = [
        searchQuery,
        ...searchHistory.filter((item) => item !== searchQuery).slice(0, 4),
      ];
      setSearchHistory(newHistory);
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
      setSearchQuery("");
      console.log(`Searching for: ${searchQuery}`);
    }
  };

  const handleDeleteSearch = (searchItem) => {
    const newHistory = searchHistory.filter((item) => item !== searchItem);
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  const quickLinks = [
    { name: "Home", icon: HomeIcon },
    { name: "Profile", icon: UserCircleIcon },
    { name: "Notifications", icon: BellIcon },
    { name: "Bookmarks", icon: BookmarkIcon },
    { name: "Friends", icon: UsersIcon },
    { name: "Settings", icon: CogIcon },
  ];

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
        {/* Left Sidebar */}
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
            <nav className="flex-grow">
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href="#"
                      className="flex items-center p-2 text-gray-700 hover:bg-blue-50 rounded-lg transition duration-150 ease-in-out"
                    >
                      <link.icon className="h-6 w-6 mr-3 text-blue-500" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto">
              <a
                href="#"
                className="flex items-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition duration-150 ease-in-out"
              >
                <LogoutIcon className="h-6 w-6 mr-3" />
                Logout
              </a>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 lg:w-3/5 lg:ml-[20%] lg:mr-[20%]">
          <header className="bg-white shadow-md p-4 sticky top-0 z-20">
            <div className="flex justify-between items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <h1 className="text-xl font-semibold text-gray-800">Your Feed</h1>
              <div className="lg:hidden">
                <UserIcon className="h-6 w-6 text-gray-500" />
              </div>
            </div>
          </header>
          <main className="p-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white shadow-lg rounded-lg mb-6 overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <img
                        src={post.user.avatar}
                        alt={post.user.name}
                        className="w-12 h-12 rounded-full mr-4 border-2 border-blue-500"
                      />
                      <div>
                        <h2 className="font-semibold text-lg text-gray-800">
                          {post.user.name}
                        </h2>
                        <p className="text-gray-500 text-sm">
                          {post.timestamp}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleFollow(post.id)}
                        className={`text-sm mr-2 px-4 py-2 rounded-full transition duration-150 ease-in-out ${
                          post.user.isFollowing
                            ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                      >
                        {post.user.isFollowing ? "Unfollow" : "Follow"}
                      </button>
                      <button
                        onClick={() => handleReport(post.id)}
                        className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
                      >
                        <DotsHorizontalIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <p className="mb-4 text-gray-700">{post.content}</p>
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post content"
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                  )}
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="flex items-center space-x-6">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="flex items-center text-gray-500 hover:text-blue-500 transition duration-150 ease-in-out"
                      >
                        {post.isLiked ? (
                          <HeartSolidIcon className="h-6 w-6 text-red-500" />
                        ) : (
                          <HeartIcon className="h-6 w-6" />
                        )}
                        <span className="ml-2 font-semibold">{post.likes}</span>
                      </button>
                      <button
                        onClick={() => toggleComments(post.id)}
                        className="flex items-center text-gray-500 hover:text-blue-500 transition duration-150 ease-in-out"
                      >
                        <ChatIcon className="h-6 w-6" />
                        <span className="ml-2 font-semibold">
                          {post.comments}
                        </span>
                      </button>
                    </div>
                    <button
                      onClick={() => handleReport(post.id)}
                      className="text-gray-500 hover:text-red-500 transition duration-150 ease-in-out"
                    >
                      <FlagIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                {showComments[post.id] && (
                  <div className="border-t border-gray-200 p-4 bg-gray-50">
                    <h3 className="font-semibold mb-4 text-gray-700">
                      Comments
                    </h3>
                    <div className="flex items-center">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        className="flex-grow border rounded-l-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                      <button className="bg-blue-500 text-white px-6 py-2 rounded-r-full hover:bg-blue-600 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300">
                        Post
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </main>
        </div>

        {/* Right Sidebar */}
        <div className="lg:w-1/5 bg-white shadow-lg p-4 hidden lg:block fixed right-0 top-0 bottom-0 z-30">
          <div className="h-full flex flex-col">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Search Users
              </h2>
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Find friends..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </form>
            </div>
            <div className="flex-grow overflow-y-auto">
              <h3 className="font-semibold text-gray-700 mb-3">
                Recent Searches
              </h3>
              <ul className="space-y-2">
                {searchHistory.map((search, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-150 ease-in-out"
                  >
                    <div className="flex items-center">
                      <UserIcon className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-700">{search}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteSearch(search)}
                      className="text-gray-400 hover:text-red-500 transition duration-150 ease-in-out"
                    >
                      <XIcon className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedsPage;
