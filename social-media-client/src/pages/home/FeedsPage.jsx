import React, { useState, useEffect } from "react";
import {
  FaSpinner,
  FaUser,
  FaSearch,
  FaSync,
  FaPaperPlane,
  FaSmile,
} from "react-icons/fa";
import {
  HeartIcon,
  ChatIcon,
  DotsHorizontalIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import axios from "axios";
import NewPostComponent from "../../components/post/NewPost";
import { useSelector } from "react-redux";
import SideBar from "../../components/sideBar/SideBar";
import SearchComp from "../../components/search/SearchComp";
import EmojiPicker from "emoji-picker-react";
import { jwtDecode } from "jwt-decode";

const FeedsPage = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const tokenn = localStorage.getItem("token");

  let userId;
  if (tokenn) {
    const decodedToken = jwtDecode(tokenn);
    userId = decodedToken.id;
  }

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showComments, setShowComments] = useState({});
  const [commentText, setCommentText] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState({});

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/api/posts/all-posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(
        response.data.posts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to fetch posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.post(
        `${API_URL}/api/posts/${postId}/like`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchPosts();
      setPosts((prevPosts) => prevPosts.map((post) => post._id === postId));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleComment = async (postId) => {
    const comment = commentText[postId];
    if (!comment || comment.trim() === "") return;

    try {
      const response = await axios.post(
        `${API_URL}/api/posts/${postId}/comment`,
        { content: comment },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newComment = response.data;
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments: [...post.comments, newComment],
                totalComments: post.totalComments + 1,
              }
            : post
        )
      );
      setCommentText((prev) => ({ ...prev, [postId]: "" }));
      fetchPosts();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const toggleComments = (postId) => {
    setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000);
    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
    ];

    for (let i = 0; i < intervals.length; i++) {
      const interval = intervals[i];
      const count = Math.floor(diffInSeconds / interval.seconds);
      if (count >= 1) {
        if (interval.label === "week" && count > 1) {
          return new Date(date).toLocaleDateString();
        }
        return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
      }
    }
    return "Just now";
  };

  const ImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = (e) => {
      e.stopPropagation();
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
    };

    const goToNext = (e) => {
      e.stopPropagation();
      const isLastSlide = currentIndex === images.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    };

    return (
      <div className="relative w-full h-96">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover rounded-lg"
          onClick={() => setFullscreenImage(images)}
        />
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </>
        )}
      </div>
    );
  };

  const handleRefresh = () => {
    window.scrollTo(0, 0);
    fetchPosts();
  };

  const handleEmojiClick = (postId, emojiObject) => {
    setCommentText((prev) => ({
      ...prev,
      [postId]: (prev[postId] || "") + emojiObject.emoji,
    }));
    setShowEmojiPicker((prev) => ({ ...prev, [postId]: false }));
  };

  const toggleEmojiPicker = (postId) => {
    setShowEmojiPicker((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  if (error) {
    return <div className="text-center text-red-500 mt-4">{error}</div>;
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
            <h1 className="text-xl font-semibold text-gray-800">Your Feed</h1>
            <div className="flex items-center">
              <button
                onClick={handleRefresh}
                className="text-blue-500 hover:text-blue-700 mr-4"
              >
                <FaSync className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <FaSearch className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>
        <NewPostComponent />
        <main className="p-4 w-full md:w-2/3 mx-auto">
          {loading ? (
            <div className="flex justify-center items-center h-screen bg-gray-100">
              <FaSpinner className="animate-spin text-blue-500 text-4xl" />
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post._id}
                className="bg-white shadow-lg rounded-lg mb-6 overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-3 items-center">
                      {post.author.profilePicture ? (
                        <img
                          src={post.author.profilePicture}
                          alt="Profile"
                          className="w-20 h-20 rounded-full mr-4 border-2 border-blue-500"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
                          <FaUser className="text-gray-400 text-4xl" />
                        </div>
                      )}
                      <div>
                        <Link
                          to={`/user-profile/${post.author?._id}`}
                          className="font-semibold text-lg text-gray-800 hover:text-blue-500 transition duration-150 ease-in-out"
                        >
                          {post.author?.firstName || "Anonymous"}{" "}
                          {post.author?.lastName || "User"}
                        </Link>
                        <p className="text-gray-500 text-sm">
                          {formatTimeAgo(post.createdAt)}
                        </p>
                      </div>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out">
                      <DotsHorizontalIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="mb-4 text-gray-700">{post.content}</p>
                  {post.media && post.media.length > 0 && (
                    <ImageSlider images={post.media} />
                  )}
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="flex items-center space-x-6">
                      <button
                        onClick={() => handleLike(post._id)}
                        className="flex items-center text-gray-500 hover:text-red-500 transition duration-150 ease-in-out"
                      >
                        {post.likes.some((like) => like._id === userId) ? (
                          <HeartSolidIcon className="h-6 w-6 text-red-500" />
                        ) : (
                          <HeartIcon className="h-6 w-6" />
                        )}
                        <span className="ml-2 font-semibold">
                          {post.totalLikes}
                        </span>
                      </button>
                      <button
                        onClick={() => toggleComments(post._id)}
                        className="flex items-center text-gray-500 hover:text-blue-500 transition duration-150 ease-in-out"
                      >
                        <ChatIcon className="h-6 w-6" />
                        <span className="ml-2 font-semibold">
                          {post.totalComments}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {showComments[post._id] && (
                  <div className="border-t border-gray-200 p-4 bg-gray-50">
                    <h3 className="font-semibold mb-4 text-gray-700">
                      Comments
                    </h3>

                    {post.comments?.length > 0 ? (
                      post.comments.map((comment) => (
                        <div
                          key={comment._id}
                          className="flex items-start items-center gap-1 mb-4"
                        >
                          {comment.author?.profilePicture ? (
                            <img
                              src={comment.author?.profilePicture}
                              alt="Profile"
                              className="w-14 h-14 rounded-full mr-4 border-2 border-blue-500"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-full border-4 border-white shadow-lg bg-gray-200 flex  items-center justify-center">
                              <FaUser className="text-gray-400 text-4xl" />
                            </div>
                          )}
                          <div>
                            <Link
                              to={`/user-profile/${comment.author?._id}`}
                              className="font-semibold hover:text-blue-500 transition duration-150 ease-in-out"
                            >
                              {comment.author?.firstName}{" "}
                              {comment.author?.lastName}
                            </Link>
                            <p className="text-gray-700">{comment.content}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600">No comments yet.</p>
                    )}

                    <div className="mt-4">
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <input
                          type="text"
                          placeholder="Add a comment..."
                          value={commentText[post._id] || ""}
                          onChange={(e) =>
                            setCommentText((prev) => ({
                              ...prev,
                              [post._id]: e.target.value,
                            }))
                          }
                          className="flex-grow px-4 py-2 focus:outline-none"
                        />
                        <button
                          onClick={() => toggleEmojiPicker(post._id)}
                          className="bg-gray-100 text-gray-600 px-3 py-2 hover:bg-gray-200 transition duration-150 ease-in-out"
                        >
                          <FaSmile className="text-xl" />
                        </button>
                        <button
                          onClick={() => handleComment(post._id)}
                          className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition duration-150 ease-in-out"
                        >
                          <FaPaperPlane className="text-xl" />
                        </button>
                      </div>
                      {showEmojiPicker[post._id] && (
                        <div className="mt-2">
                          <EmojiPicker
                            onEmojiClick={(emojiObject) =>
                              handleEmojiClick(post._id, emojiObject)
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </main>
      </div>

      <SearchComp
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
      />

      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setFullscreenImage(null)}
        >
          <div className="max-w-full max-h-full">
            <ImageSlider images={fullscreenImage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedsPage;
