import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import {
  FaUser,
  FaSpinner,
  FaCalendarAlt,
  FaHeart,
  FaComment,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { UserIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import SideBar from "../../components/sideBar/SideBar";

const UserProfilePage = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const token = useSelector((state) => state.auth.token);
  const currentUser = useSelector((state) => state.auth.user);
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showComments, setShowComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const socket = io(API_URL, {
      withCredentials: true,
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    socket.on("followUpdate", (data) => {
      if (data.userId === userId) {
        setUser((prevUser) => ({
          ...prevUser,
          user: {
            ...prevUser.user,
            followers: data.followers,
          },
        }));
        setIsFollowing(data.followers.includes(currentUser._id));
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [API_URL, token, userId, currentUser._id]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/users/profile/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data);
        setIsFollowing(response.data.user.followers);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch user profile:", err.response || err);
        setError("Failed to fetch user profile");
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId, API_URL, token, currentUser._id]);

  const handleFollow = async () => {
    try {
      const newIsFollowing = !isFollowing;
      setIsFollowing(newIsFollowing);
      setUser((prevUser) => ({
        ...prevUser,
        user: {
          ...prevUser.user,
          followers: newIsFollowing
            ? prevUser.user.followers + 1
            : prevUser.user.followers - 1,
        },
      }));

      const response = await axios.post(
        `${API_URL}/api/follow/${userId}/follow`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.data.success) {
        // If the API call fails, revert the changes
        setIsFollowing(!newIsFollowing);
        setUser((prevUser) => ({
          ...prevUser,
          user: {
            ...prevUser.user,
          },
        }));
      }
    } catch (err) {
      console.error("Failed to follow/unfollow user", err);
      // Revert changes if there's an error
      setIsFollowing(!isFollowing);
      setUser((prevUser) => ({
        ...prevUser,
        user: {
          ...prevUser.user,
        },
      }));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  const handleImageClick = (images, index) => {
    setFullscreenImage(images);
    setCurrentImageIndex(index);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? fullscreenImage.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === fullscreenImage.length - 1 ? 0 : prevIndex + 1
    );
  };

  const toggleComments = (postId) => {
    setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleNewCommentChange = (postId, value) => {
    setNewComments((prev) => ({ ...prev, [postId]: value }));
  };

  const handleAddComment = async (postId) => {
    const newComment = newComments[postId];
    if (newComment) {
      try {
        await axios.post(
          `${API_URL}/api/posts/${postId}/comment`,
          { content: newComment },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const updatedUserResponse = await axios.get(
          `${API_URL}/api/users/profile/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUser(updatedUserResponse.data);
        setNewComments((prev) => ({ ...prev, [postId]: "" }));
      } catch (err) {
        console.error("Failed to add comment", err);
      }
    }
  };

  const FollowModal = ({ title, users, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 h-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        <div className="overflow-y-auto h-72">
          {users && users.length > 0 ? (
            <ul>
              {users.map((user) => (
                <li key={user._id} className="flex items-center mb-3">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <FaUser className="text-gray-400" />
                    </div>
                  )}
                  <Link to={`/user-profile/${user._id}`}>
                    <span onClick={onClose}>
                      {user.firstName} {user.lastName}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No {title.toLowerCase()} yet.</p>
          )}
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <FaSpinner className="animate-spin text-blue-500 text-4xl" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-4">{error}</div>;
  }

  if (!user) {
    return <div className="text-center mt-4">User not found</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <SideBar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
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
            <h1 className="text-xl font-semibold text-gray-800">
              {user.user.firstName} {user.user.lastName}'s Profile
            </h1>
            <div className="lg:hidden">
              <UserIcon className="h-6 w-6 text-gray-500" />
            </div>
          </div>
        </header>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/50 to-transparent">
              <h1 className="text-3xl font-bold text-white">
                {user.user.firstName} {user.user.lastName}
              </h1>
              <p className="text-sm text-gray-200">@{user.user.firstName}</p>
            </div>
          </div>
          <div className="relative px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center mb-4 sm:mb-0">
                {user.user.profilePicture ? (
                  <img
                    src={user.user.profilePicture}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mr-4 border-2 border-blue-500"
                    onClick={() =>
                      handleImageClick([user.user.profilePicture], 0)
                    }
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
                    <FaUser className="text-gray-400 text-4xl" />
                  </div>
                )}
                <div className="ml-4">
                  <p className="text-gray-600">{user.user.bio}</p>
                  <p className="text-sm text-gray-500 mt-1 flex items-center">
                    <FaCalendarAlt className="mr-2" />
                    Joined {formatDate(user.user.joinedDate)}
                  </p>
                </div>
              </div>
              {currentUser._id !== userId && (
                <button
                  onClick={handleFollow}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    isFollowing
                      ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  } transition duration-300 ease-in-out`}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
            <div className="flex justify-around mt-6 border-t border-b border-gray-200 py-4">
              <button
                onClick={() => setShowFollowersModal(true)}
                className="text-center text-blue-500 hover:text-blue-700"
              >
                <p className="text-2xl font-bold">{user.user.followers}</p>
                <p className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  Followers
                </p>
              </button>
              <button
                onClick={() => setShowFollowingModal(true)}
                className="text-center text-blue-500 hover:text-blue-700"
              >
                <p className="text-2xl font-bold">{user.user.following}</p>
                <p className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  Following
                </p>
              </button>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">
                  {user.posts.length}
                </p>
                <p className="text-gray-600">Posts</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 p-4 w-full md:w-2/3 mx-auto">
          <h2 className="text-xl font-semibold text-gray-800">Posts</h2>
          {user.posts.length === 0 ? (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
              <p className="text-gray-800">No posts yet.</p>
            </div>
          ) : (
            user.posts.map((post) => (
              <div
                key={post._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    {user.user.profilePicture ? (
                      <img
                        src={user.user.profilePicture}
                        alt="Profile"
                        className="w-16 h-16 rounded-full mr-4 border-2 border-blue-500"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
                        <FaUser className="text-gray-400 text-4xl" />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold">
                        {user.user.firstName} {user.user.lastName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(post.createdAt)}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-800 mb-4">{post.content}</p>
                  {post.media && post.media.length > 0 && (
                    <div className="relative mb-4">
                      <img
                        src={post.media[0]}
                        alt="Post"
                        className="w-full h-64 object-cover cursor-pointer"
                        onClick={() => handleImageClick(post.media, 0)}
                      />
                      {post.media.length > 1 && (
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                          +{post.media.length - 1}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center text-gray-500 hover:text-blue-500">
                      <FaHeart className="mr-1" />
                      <span>{post.likes.length}</span>
                    </button>
                    <button
                      className="flex items-center text-gray-500 hover:text-blue-500"
                      onClick={() => toggleComments(post._id)}
                    >
                      <FaComment className="mr-1" />
                      <span>{post.comments.length}</span>
                    </button>
                  </div>
                </div>
                {showComments[post._id] && (
                  <div className="px-4 py-2 bg-gray-50">
                    {post.comments.map((comment) => (
                      <div key={comment._id} className="mb-2">
                        <p className="font-semibold">
                          {comment.author.firstName}
                        </p>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                    ))}
                    <div className="mt-2 flex">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        value={newComments[post._id] || ""}
                        onChange={(e) =>
                          handleNewCommentChange(post._id, e.target.value)
                        }
                        className="flex-grow border rounded-l-md px-2 py-1"
                      />
                      <button
                        onClick={() => handleAddComment(post._id)}
                        className="bg-blue-500 text-white px-4 py-1 rounded-r-md hover:bg-blue-600"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {fullscreenImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            <FaTimes />
          </button>
          <button
            onClick={handlePrevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl"
          >
            <FaChevronLeft />
          </button>
          <img
            src={fullscreenImage[currentImageIndex]}
            alt="Full-size"
            className="max-w-full max-h-full"
          />
          <button
            onClick={handleNextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl"
          >
            <FaChevronRight />
          </button>
        </div>
      )}

      {showFollowersModal && (
        <FollowModal
          title="Followers"
          users={user.user.followersList}
          onClose={() => setShowFollowersModal(false)}
        />
      )}

      {showFollowingModal && (
        <FollowModal
          title="Following"
          users={user.user.followingList}
          onClose={() => setShowFollowingModal(false)}
        />
      )}
    </div>
  );
};

export default UserProfilePage;
