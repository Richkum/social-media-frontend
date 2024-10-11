// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { FaSpinner, FaUser } from "react-icons/fa";
// import {
//   HeartIcon,
//   ChatIcon,
//   DotsHorizontalIcon,
//   SearchIcon,
//   XIcon,
//   UserIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
// } from "@heroicons/react/outline";
// import { HeartIcon as HeartSolidIcon } from "@heroicons/react/solid";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import NewPostComponent from "../../components/post/NewPost";
// import { useSelector } from "react-redux";
// import SideBar from "../../components/sideBar/SideBar";

// const FeedsPage = () => {
//   const API_URL = import.meta.env.VITE_API_BASE_URL;

//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [showComments, setShowComments] = useState({});
//   const [commentText, setCommentText] = useState({});
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [searchMessage, setSearchMessage] = useState("");
//   const [searchHistory, setSearchHistory] = useState([]);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [fullscreenImage, setFullscreenImage] = useState(null);
//   const fetchingRef = useRef(false);
//   const observer = useRef();

//   const token = useSelector((state) => state.auth.token);

//   const lastPostElementRef = useCallback(
//     (node) => {
//       if (loading) return;
//       if (observer.current) observer.current.disconnect();
//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting && hasMore && !fetchingRef.current) {
//           fetchPosts();
//         }
//       });
//       if (node) observer.current.observe(node);
//     },
//     [loading, hasMore]
//   );

//   const fetchPosts = useCallback(async () => {
//     if (!hasMore || loading || fetchingRef.current) return;
//     fetchingRef.current = true;
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/posts/all-posts?page=${page}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const newPosts = response.data.posts;
//       console.log(newPosts);

//       if (newPosts.length === 0) {
//         setHasMore(false);
//       } else {
//         setPosts((prevPosts) => {
//           const uniquePosts = newPosts.filter(
//             (newPost) =>
//               !prevPosts.some((prevPost) => prevPost._id === newPost._id)
//           );
//           return [...prevPosts, ...uniquePosts].sort(
//             (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//           );
//         });
//         setPage((prevPage) => prevPage + 1);
//       }
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//       setError("Failed to fetch posts. Please try again later.");
//     } finally {
//       setLoading(false);
//       fetchingRef.current = false;
//     }
//   }, [page, hasMore, token]);

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   useEffect(() => {
//     const storedHistory = localStorage.getItem("searchHistory");
//     if (storedHistory) {
//       setSearchHistory(JSON.parse(storedHistory));
//     }
//   }, []);

//   const handleLike = async (postId) => {
//     try {
//       await axios.post(
//         `${API_URL}/api/posts/${postId}/like`,
//         {},
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setPosts((prevPosts) =>
//         prevPosts.map((post) =>
//           post._id === postId
//             ? {
//                 ...post,
//                 isLiked: !post.isLiked,
//                 totalLikes: post.isLiked
//                   ? post.totalLikes - 1
//                   : post.totalLikes + 1,
//               }
//             : post
//         )
//       );
//     } catch (error) {
//       console.error("Error liking post:", error);
//     }
//   };

//   const handleComment = async (postId) => {
//     const comment = commentText[postId];
//     if (!comment || comment.trim() === "") return;

//     try {
//       const response = await axios.post(
//         `${API_URL}/api/posts/${postId}/comment`,
//         { content: comment },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const newComment = response.data;
//       setPosts((prevPosts) =>
//         prevPosts.map((post) =>
//           post._id === postId
//             ? {
//                 ...post,
//                 comments: [...post.comments, newComment],
//                 totalComments: post.totalComments + 1,
//               }
//             : post
//         )
//       );

//       setCommentText((prev) => ({ ...prev, [postId]: "" }));
//     } catch (error) {
//       console.error("Error posting comment:", error);
//     }
//   };

//   const toggleComments = (postId) => {
//     setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (searchQuery.trim() !== "") {
//       try {
//         const response = await axios.get(
//           `${API_URL}/api/users/search-users?query=${searchQuery}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         if (response.data.length === 0) {
//           setSearchMessage("No results found");
//           setSearchResults([]);
//         } else {
//           setSearchResults(response.data.users);
//           setSearchMessage("");
//         }

//         const newHistory = [
//           searchQuery,
//           ...searchHistory.filter((item) => item !== searchQuery).slice(0, 4),
//         ];
//         setSearchHistory(newHistory);
//         localStorage.setItem("searchHistory", JSON.stringify(newHistory));
//       } catch (error) {
//         console.error("Error searching users:", error);
//         setSearchMessage("No Results Found", error.message);
//         setSearchResults([]);
//       } finally {
//         setSearchQuery("");
//       }
//     }
//   };

//   const handleDeleteSearch = (searchItem) => {
//     const newHistory = searchHistory.filter((item) => item !== searchItem);
//     setSearchHistory(newHistory);
//     localStorage.setItem("searchHistory", JSON.stringify(newHistory));
//   };

//   const formatTimeAgo = (date) => {
//     const now = new Date();
//     const diffInSeconds = Math.floor((now - new Date(date)) / 1000);
//     const intervals = [
//       { label: "year", seconds: 31536000 },
//       { label: "month", seconds: 2592000 },
//       { label: "week", seconds: 604800 },
//       { label: "day", seconds: 86400 },
//       { label: "hour", seconds: 3600 },
//       { label: "minute", seconds: 60 },
//     ];

//     for (let i = 0; i < intervals.length; i++) {
//       const interval = intervals[i];
//       const count = Math.floor(diffInSeconds / interval.seconds);
//       if (count >= 1) {
//         if (interval.label === "week" && count > 1) {
//           return new Date(date).toLocaleDateString();
//         }
//         return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
//       }
//     }
//     return "Just now";
//   };

//   const ImageSlider = ({ images }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);

//     const goToPrevious = () => {
//       const isFirstSlide = currentIndex === 0;
//       const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
//       setCurrentIndex(newIndex);
//     };

//     const goToNext = () => {
//       const isLastSlide = currentIndex === images.length - 1;
//       const newIndex = isLastSlide ? 0 : currentIndex + 1;
//       setCurrentIndex(newIndex);
//     };

//     return (
//       <div className="relative w-full h-96">
//         <img
//           src={images[currentIndex]}
//           alt={`Slide ${currentIndex + 1}`}
//           className="w-full h-full object-cover rounded-lg"
//           onClick={() => setFullscreenImage(images[currentIndex])}
//         />
//         {images.length > 1 && (
//           <>
//             <button
//               onClick={goToPrevious}
//               className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
//             >
//               <ChevronLeftIcon className="h-6 w-6" />
//             </button>
//             <button
//               onClick={goToNext}
//               className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
//             >
//               <ChevronRightIcon className="h-6 w-6" />
//             </button>
//           </>
//         )}
//       </div>
//     );
//   };

//   if (error) {
//     return <div className="text-center text-red-500 mt-4">{error}</div>;
//   }

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
//       {/* Left Sidebar */}
//       <SideBar
//         isMobileMenuOpen={isMobileMenuOpen}
//         setIsMobileMenuOpen={setIsMobileMenuOpen}
//       />

//       {/* Main content */}
//       <div className="flex-1 lg:w-3/5 lg:ml-[20%] lg:mr-[20%]">
//         <header className="bg-white shadow-md p-4 sticky top-0 z-20">
//           <div className="flex justify-between items-center">
//             <button
//               onClick={() => setIsMobileMenuOpen(true)}
//               className="lg:hidden text-gray-500 hover:text-gray-700"
//             >
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//             </button>
//             <h1 className="text-xl font-semibold text-gray-800">Your Feed</h1>
//             <div className="lg:hidden">
//               <UserIcon className="h-6 w-6 text-gray-500" />
//             </div>
//           </div>
//           {/* Mobile search field */}
//           <div className="mt-4 lg:hidden">
//             <form onSubmit={handleSearch}>
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Find friends..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                 />
//                 <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//               </div>
//             </form>
//           </div>
//         </header>
//         <NewPostComponent />
//         <main className="p-4 w-full md:w-2/3 mx-auto">
//           {posts.map((post, index) => (
//             <div
//               key={post._id}
//               className="bg-white shadow-lg rounded-lg mb-6 overflow-hidden"
//               ref={index === posts.length - 1 ? lastPostElementRef : null}
//             >
//               <div className="p-4">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center">
//                     {post.author.profilePicture ? (
//                       <img
//                         src={post.author.profilePicture}
//                         alt="Profile"
//                         className="w-20 h-20 rounded-full mr-4 border-2 border-blue-500"
//                       />
//                     ) : (
//                       <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
//                         <FaUser className="text-gray-400 text-4xl" />
//                       </div>
//                     )}
//                     <div>
//                       <Link
//                         to={`/user-profile/${post.author?._id}`}
//                         className="font-semibold text-lg text-gray-800 hover:text-blue-500 transition duration-150 ease-in-out"
//                       >
//                         {post.author?.firstName || "Anonymous"}{" "}
//                         {post.author?.lastName || "User"}
//                       </Link>
//                       <p className="text-gray-500 text-sm">
//                         {formatTimeAgo(post.createdAt)}
//                       </p>
//                     </div>
//                   </div>
//                   <button className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out">
//                     <DotsHorizontalIcon className="h-5 w-5" />
//                   </button>
//                 </div>
//                 <p className="mb-4 text-gray-700">{post.content}</p>
//                 {post.media && post.media.length > 0 && (
//                   <ImageSlider images={post.media} />
//                 )}
//                 <div className="flex items-center justify-between border-t border-gray-200 pt-4">
//                   <div className="flex items-center space-x-6">
//                     <button
//                       onClick={() => handleLike(post._id)}
//                       className="flex items-center text-gray-500 hover:text-red-500 transition duration-150 ease-in-out"
//                     >
//                       {post.isLiked ? (
//                         <HeartSolidIcon className="h-6 w-6 text-red-500" />
//                       ) : (
//                         <HeartIcon className="h-6 w-6" />
//                       )}
//                       <span className="ml-2 font-semibold">
//                         {post.totalLikes}
//                       </span>
//                     </button>
//                     <button
//                       onClick={() => toggleComments(post._id)}
//                       className="flex items-center text-gray-500 hover:text-blue-500 transition duration-150 ease-in-out"
//                     >
//                       <ChatIcon className="h-6 w-6" />
//                       <span className="ml-2 font-semibold">
//                         {post.totalComments}
//                       </span>
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {showComments[post._id] && (
//                 <div className="border-t border-gray-200 p-4 bg-gray-50">
//                   <h3 className="font-semibold mb-4 text-gray-700">Comments</h3>

//                   {post.comments?.length > 0 ? (
//                     post.comments.map((comment) => (
//                       <div key={comment._id} className="flex items-start mb-4">
//                         {comment.author?.profilePicture ? (
//                           <img
//                             src={comment.author?.profilePicture}
//                             alt="Profile"
//                             className="w-14 h-14 rounded-full mr-4 border-2 border-blue-500"
//                           />
//                         ) : (
//                           <div className="w-16 h-16 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
//                             <FaUser className="text-gray-400 text-4xl" />
//                           </div>
//                         )}
//                         <div>
//                           <Link
//                             to={`/user-profile/${comment.author?._id}`}
//                             className="font-semibold hover:text-blue-500 transition duration-150 ease-in-out"
//                           >
//                             {comment.author?.firstName}{" "}
//                             {comment.author?.lastName || "User"}
//                           </Link>
//                           <p className="text-gray-700">{comment.content}</p>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-gray-600">No comments yet.</p>
//                   )}

//                   <div className="flex items-center mt-4">
//                     <input
//                       type="text"
//                       placeholder="Add a comment..."
//                       value={commentText[post._id] || ""}
//                       onChange={(e) =>
//                         setCommentText((prev) => ({
//                           ...prev,
//                           [post._id]: e.target.value,
//                         }))
//                       }
//                       className="flex-grow border rounded-l-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                     />
//                     <button
//                       onClick={() => handleComment(post._id)}
//                       className="bg-blue-500 text-white px-6 py-2 rounded-r-full hover:bg-blue-600 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300"
//                     >
//                       Post
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//           {loading && (
//             <div className="flex justify-center items-center h-screen bg-gray-100">
//               <FaSpinner className="animate-spin text-blue-500 text-4xl" />
//             </div>
//           )}
//         </main>
//       </div>

//       {/* Right Sidebar */}
//       <div className="lg:w-1/5 bg-white shadow-lg p-4 hidden lg:block fixed right-0 top-0 bottom-0 z-30 overflow-y-auto">
//         <div className="h-full flex flex-col">
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">
//               Search Users
//             </h2>
//             <form onSubmit={handleSearch}>
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Find friends..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                 />
//                 <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//               </div>
//             </form>
//           </div>
//           <div className="flex-grow overflow-y-auto">
//             {searchMessage && (
//               <p className="text-gray-600 mb-4">{searchMessage}</p>
//             )}
//             {searchResults.length > 0 ? (
//               <div>
//                 <h3 className="font-semibold text-gray-700 mb-3">
//                   Search Results
//                 </h3>
//                 <ul className="space-y-2">
//                   {searchResults.map((user) => (
//                     <li
//                       key={user._id}
//                       className="flex items-center py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-150 ease-in-out"
//                     >
//                       {user.profilePicture ? (
//                         <img
//                           src={user.profilePicture}
//                           alt="Profile"
//                           className="w-14 h-14 rounded-full mr-4 border-2 border-blue-500"
//                         />
//                       ) : (
//                         <div className="w-14 h-14 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
//                           <FaUser className="text-gray-400 text-4xl" />
//                         </div>
//                       )}
//                       <Link
//                         to={`/user-profile/${user._id}`}
//                         className="text-gray-700 hover:text-blue-500"
//                       >
//                         {user.firstName} {user.lastName}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ) : (
//               <div>
//                 <h3 className="font-semibold text-gray-700 mb-3">
//                   Recent Searches
//                 </h3>
//                 <ul className="space-y-2">
//                   {searchHistory.map((search, index) => (
//                     <li
//                       key={index}
//                       className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-150 ease-in-out"
//                     >
//                       <div className="flex items-center">
//                         <UserIcon className="h-5 w-5 text-gray-400 mr-3" />
//                         <span className="text-gray-700">{search}</span>
//                         {/* <p>
//                           <Link
//                             to={`/user-profile/${user._id}`}
//                             className="text-gray-700 hover:text-blue-500"
//                           >
//                             {user.firstName} {user.lastName}
//                           </Link>
//                         </p> */}
//                       </div>
//                       <button
//                         onClick={() => handleDeleteSearch(search)}
//                         className="text-gray-400 hover:text-red-500 transition duration-150 ease-in-out"
//                       >
//                         <XIcon className="h-4 w-4" />
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Fullscreen Image Modal */}
//       {fullscreenImage && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
//           onClick={() => setFullscreenImage(null)}
//         >
//           <img
//             src={fullscreenImage}
//             alt="Fullscreen"
//             className="max-w-full max-h-full"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default FeedsPage;

import React, { useState, useEffect, useRef } from "react";
import {
  FaSpinner,
  FaUser,
  FaSearch,
  FaSync,
  FaPaperPlane,
} from "react-icons/fa";
import {
  HeartIcon,
  ChatIcon,
  DotsHorizontalIcon,
  XIcon,
  UserIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import axios from "axios";
import NewPostComponent from "../../components/post/NewPost";
import { useSelector } from "react-redux";
import SideBar from "../../components/sideBar/SideBar";
import EmojiPicker from "emoji-picker-react";
import { jwtDecode } from "jwt-decode";

const FeedsPage = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  // getting the user Id
  const tokenn = localStorage.getItem("token");

  // Decode the token to get the payload (including userId)
  let userId;
  if (tokenn) {
    const decodedToken = jwtDecode(tokenn); // Decode the token

    userId = decodedToken.id; // Use 'id', not '_id', based on your token structure
  }

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showComments, setShowComments] = useState({});
  const [commentText, setCommentText] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState({});

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
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
      console.log(response.data.posts);

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
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                isLiked: !post.isLiked,
                totalLikes: post.isLiked
                  ? post.totalLikes - 1
                  : post.totalLikes + 1,
              }
            : post
        )
      );
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
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const toggleComments = (postId) => {
    setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      try {
        const response = await axios.get(
          `${API_URL}/api/users/search-users?query=${searchQuery}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.length === 0) {
          setSearchMessage("No results found");
          setSearchResults([]);
        } else {
          setSearchResults(response.data.users);
          setSearchMessage("");
        }

        const newHistory = [
          searchQuery,
          ...searchHistory.filter((item) => item !== searchQuery).slice(0, 4),
        ];
        setSearchHistory(newHistory);
        localStorage.setItem("searchHistory", JSON.stringify(newHistory));
      } catch (error) {
        console.error("Error searching users:", error);
        setSearchMessage("No Results Found");
        setSearchResults([]);
      } finally {
        setSearchQuery("");
      }
    }
  };

  const handleDeleteSearch = (searchItem) => {
    const newHistory = searchHistory.filter((item) => item !== searchItem);
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
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

  // const onEmojiClick = (event, emojiObject, postId) => {
  //   setCommentText((prev) => ({
  //     ...prev,
  //     [postId]: (prev[postId] || "") + emojiObject.emoji,
  //   }));
  //   setShowEmojiPicker((prev) => ({ ...prev, [postId]: false }));
  // };

  const handleEmojiClick = (emojiObject) => {
    setCommentText((prevText) => prevText + emojiObject.emoji);
    setShowEmojiPicker(false);
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
                    <div className="flex items-center">
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
                        {/* {post.isLiked ? (
                          <HeartSolidIcon className="h-6 w-6 text-red-500" />
                        ) : (
                          <HeartIcon className="h-6 w-6" />
                        )} */}
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
                          className="flex items-start mb-4"
                        >
                          {comment.author?.profilePicture ? (
                            <img
                              src={comment.author?.profilePicture}
                              alt="Profile"
                              className="w-14 h-14 rounded-full mr-4 border-2 border-blue-500"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
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

                    {/* <div className="flex items-center mt-4">
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
                        className="flex-grow border rounded-l-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                      <button
                        onClick={() =>
                          setShowEmojiPicker((prev) => ({
                            ...prev,
                            [post._id]: !prev[post._id],
                          }))
                        }
                        className="bg-gray-200 text-gray-600 px-3 py-2 hover:bg-gray-300 transition duration-150 ease-in-out"
                      >
                        
                      </button>
                      <button
                        onClick={() => handleComment(post._id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-r-full hover:bg-blue-600 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300"
                      >
                        <FaPaperPlane />
                      </button>
                    </div> */}
                    <div className="flex items-center mt-4 border rounded-full overflow-hidden">
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
                        className="flex-grow px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                      <button
                        onClick={() =>
                          setShowEmojiPicker((prev) => ({
                            ...prev,
                            [post._id]: !prev[post._id],
                          }))
                        }
                        className="bg-gray-200 text-gray-600 px-3 py-2 hover:bg-gray-300 transition duration-150 ease-in-out"
                      >
                        😊
                      </button>
                      <button
                        onClick={() => handleComment(post._id)}
                        className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition duration-150 ease-in-out"
                      >
                        <FaPaperPlane />
                      </button>
                    </div>

                    {/* {showEmojiPicker[post._id] && (
                      <div className="mt-2">
                        <EmojiPicker
                          onEmojiClick={(event, emojiObject) =>
                            onEmojiClick(event, emojiObject, post._id)
                          }
                        />
                      </div>
                    )} */}
                    {showEmojiPicker && (
                      <div className="mt-2">
                        <EmojiPicker
                          onEmojiClick={(event, emojiObject) =>
                            handleEmojiClick(event, emojiObject, post._id)
                          }
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </main>
      </div>

      <div
        className={`lg:w-1/5 bg-white shadow-lg p-4 fixed right-0 top-0 bottom-0 z-30 overflow-y-auto transition-transform duration-300 ease-in-out ${
          isSearchOpen ? "translate-x-0" : "translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Search Users
            </h2>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Find friends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <FaSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </form>
          <div className="flex-grow overflow-y-auto mt-4">
            {searchMessage && (
              <p className="text-gray-600 mb-4">{searchMessage}</p>
            )}
            {searchResults.length > 0 ? (
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">
                  Search Results
                </h3>
                <ul className="space-y-2">
                  {searchResults.map((user) => (
                    <li
                      key={user._id}
                      className="flex items-center py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-150 ease-in-out"
                    >
                      {user.profilePicture ? (
                        <img
                          src={user.profilePicture}
                          alt="Profile"
                          className="w-14 h-14 rounded-full mr-4 border-2 border-blue-500"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
                          <FaUser className="text-gray-400 text-4xl" />
                        </div>
                      )}
                      <Link
                        to={`/user-profile/${user._id}`}
                        className="text-gray-700 hover:text-blue-500"
                      >
                        {user.firstName} {user.lastName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
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
            )}
          </div>
        </div>
      </div>

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
