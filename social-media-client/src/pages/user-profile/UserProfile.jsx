// import React, { useState, useEffect } from "react";
// import {
//   FaUser,
//   FaCalendarAlt,
//   FaHeart,
//   FaComment,
//   FaTimes,
//   FaChevronLeft,
//   FaChevronRight,
// } from "react-icons/fa";

// const UserProfilePage = ({ userId }) => {
//   // Static user data for demonstration
//   const [user] = useState({
//     id: userId,
//     firstName: "John",
//     lastName: "Doe",
//     username: "johndoe",
//     profilePicture: "https://via.placeholder.com/150",
//     bio: "Passionate developer and tech enthusiast",
//     followers: [
//       {
//         id: 1,
//         firstName: "Alice",
//         lastName: "Smith",
//         profilePicture: "https://via.placeholder.com/50",
//       },
//       {
//         id: 2,
//         firstName: "Bob",
//         lastName: "Johnson",
//         profilePicture: "https://via.placeholder.com/50",
//       },
//       {
//         id: 3,
//         firstName: "Eve",
//         lastName: "Brown",
//         profilePicture: "https://via.placeholder.com/50",
//       },
//       {
//         id: 4,
//         firstName: "Frank",
//         lastName: "Davis",
//         profilePicture: "https://via.placeholder.com/50",
//       },
//       {
//         id: 5,
//         firstName: "Grace",
//         lastName: "Wilson",
//         profilePicture: "https://via.placeholder.com/50",
//       },
//       {
//         id: 6,
//         firstName: "Henry",
//         lastName: "Taylor",
//         profilePicture: "https://via.placeholder.com/50",
//       },
//       {
//         id: 7,
//         firstName: "Ivy",
//         lastName: "Lee",
//         profilePicture: "https://via.placeholder.com/50",
//       },
//     ],
//     following: [
//       {
//         id: 3,
//         firstName: "Charlie",
//         lastName: "Brown",
//         profilePicture: "https://via.placeholder.com/50",
//       },
//       {
//         id: 4,
//         firstName: "Diana",
//         lastName: "Prince",
//         profilePicture: "https://via.placeholder.com/50",
//       },
//       {
//         id: 5,
//         firstName: "Ethan",
//         lastName: "Hunt",
//         profilePicture: "https://via.placeholder.com/50",
//       },
//     ],
//     joinDate: "2022-01-01",
//     posts: [
//       {
//         id: 1,
//         content: "Just launched my new project!",
//         images: [
//           "https://via.placeholder.com/500x300",
//           "https://via.placeholder.com/500x300",
//         ],
//         likes: 42,
//         comments: [
//           {
//             id: 1,
//             user: "Alice",
//             content: "Congratulations!",
//             createdAt: "2023-05-15T10:30:00Z",
//           },
//           {
//             id: 2,
//             user: "Bob",
//             content: "Looks great!",
//             createdAt: "2023-05-15T11:00:00Z",
//           },
//         ],
//         createdAt: "2023-05-15T10:00:00Z",
//       },
//       {
//         id: 2,
//         content: "Beautiful day for coding ☀️",
//         images: [],
//         likes: 37,
//         comments: [
//           {
//             id: 3,
//             user: "Charlie",
//             content: "Enjoy!",
//             createdAt: "2023-05-14T15:00:00Z",
//           },
//         ],
//         createdAt: "2023-05-14T14:30:00Z",
//       },
//       {
//         id: 3,
//         content: "Check out this amazing tech conference!",
//         images: [
//           "https://via.placeholder.com/500x300",
//           "https://via.placeholder.com/500x300",
//           "https://via.placeholder.com/500x300",
//         ],
//         likes: 56,
//         comments: [
//           {
//             id: 4,
//             user: "Diana",
//             content: "Wish I could be there!",
//             createdAt: "2023-05-13T10:00:00Z",
//           },
//           {
//             id: 5,
//             user: "Eve",
//             content: "Looks interesting!",
//             createdAt: "2023-05-13T11:30:00Z",
//           },
//         ],
//         createdAt: "2023-05-13T09:15:00Z",
//       },
//     ],
//   });

//   const [isFollowing, setIsFollowing] = useState(false);
//   const [fullscreenImage, setFullscreenImage] = useState(null);
//   const [showFollowersModal, setShowFollowersModal] = useState(false);
//   const [showFollowingModal, setShowFollowingModal] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [showComments, setShowComments] = useState({});
//   const [newComments, setNewComments] = useState({});

//   useEffect(() => {
//     if (showFollowersModal || showFollowingModal) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }

//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [showFollowersModal, showFollowingModal]);

//   const handleFollow = () => {
//     setIsFollowing(!isFollowing);
//     // Here you would typically make an API call to follow/unfollow the user
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "numeric",
//       minute: "numeric",
//     });
//   };

//   const handleImageClick = (images, index) => {
//     setFullscreenImage(images);
//     setCurrentImageIndex(index);
//   };

//   const handlePrevImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === 0 ? fullscreenImage.length - 1 : prevIndex - 1
//     );
//   };

//   const handleNextImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === fullscreenImage.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const toggleComments = (postId) => {
//     setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
//   };

//   const handleNewCommentChange = (postId, value) => {
//     setNewComments((prev) => ({ ...prev, [postId]: value }));
//   };

//   const handleAddComment = (postId) => {
//     const newComment = newComments[postId];
//     if (newComment) {
//       // Here you would typically make an API call to add the comment
//       const updatedPosts = user.posts.map((post) => {
//         if (post.id === postId) {
//           return {
//             ...post,
//             comments: [
//               ...post.comments,
//               {
//                 id: Date.now(),
//                 user: user.firstName,
//                 content: newComment,
//                 createdAt: new Date().toISOString(),
//               },
//             ],
//           };
//         }
//         return post;
//       });
//       // Update the user state with the new posts
//       // This is a simplified approach for the static example
//       user.posts = updatedPosts;
//       setNewComments((prev) => ({ ...prev, [postId]: "" }));
//     }
//   };

//   const FollowModal = ({ title, users, onClose }) => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-80 h-96">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">{title}</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <FaTimes />
//           </button>
//         </div>
//         <div className="overflow-y-auto h-72">
//           <ul>
//             {users.map((user) => (
//               <li key={user.id} className="flex items-center mb-3">
//                 <img
//                   src={user.profilePicture}
//                   alt={`${user.firstName} ${user.lastName}`}
//                   className="w-10 h-10 rounded-full mr-3"
//                 />
//                 <span>
//                   {user.firstName} {user.lastName}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="bg-gray-100 min-h-screen py-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
//           <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
//             <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/50 to-transparent">
//               <h1 className="text-3xl font-bold text-white">
//                 {user.firstName} {user.lastName}
//               </h1>
//               <p className="text-sm text-gray-200">@{user.username}</p>
//             </div>
//           </div>
//           <div className="relative px-6 py-4">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//               <div className="flex items-center mb-4 sm:mb-0">
//                 <img
//                   src={user.profilePicture}
//                   alt={`${user.firstName} ${user.lastName}`}
//                   className="w-24 h-24 rounded-full border-4 border-white shadow-lg cursor-pointer"
//                   onClick={() => handleImageClick([user.profilePicture], 0)}
//                 />
//                 <div className="ml-4">
//                   <p className="text-gray-600">{user.bio}</p>
//                   <p className="text-sm text-gray-500 mt-1 flex items-center">
//                     <FaCalendarAlt className="mr-2" />
//                     Joined {formatDate(user.joinDate)}
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={handleFollow}
//                 className={`px-4 py-2 rounded-full text-sm font-medium ${
//                   isFollowing
//                     ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
//                     : "bg-blue-500 text-white hover:bg-blue-600"
//                 } transition duration-300 ease-in-out`}
//               >
//                 {isFollowing ? "Unfollow" : "Follow"}
//               </button>
//             </div>
//             <div className="flex justify-around mt-6 border-t border-b border-gray-200 py-4">
//               <button
//                 onClick={() => setShowFollowersModal(true)}
//                 className="text-center text-blue-500 hover:text-blue-700"
//               >
//                 <p className="text-2xl font-bold">
//                   {user.followers.length.toLocaleString()}
//                 </p>
//                 <p className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
//                   Followers
//                 </p>
//               </button>
//               <button
//                 onClick={() => setShowFollowingModal(true)}
//                 className="text-center text-blue-500 hover:text-blue-700"
//               >
//                 <p className="text-2xl font-bold">
//                   {user.following.length.toLocaleString()}
//                 </p>
//                 <p className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
//                   Following
//                 </p>
//               </button>
//               <div className="text-center">
//                 <p className="text-2xl font-bold text-gray-800">
//                   {user.posts.length}
//                 </p>
//                 <p className="text-gray-600">Posts</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="space-y-6">
//           <h2 className="text-xl font-semibold text-gray-800">Posts</h2>
//           {user.posts.map((post) => (
//             <div
//               key={post.id}
//               className="bg-white shadow-lg rounded-lg overflow-hidden"
//             >
//               <div className="p-4">
//                 <div className="flex items-center mb-2">
//                   <img
//                     src={user.profilePicture}
//                     alt={`${user.firstName} ${user.lastName}`}
//                     className="w-10 h-10 rounded-full mr-3"
//                   />
//                   <div>
//                     <p className="font-semibold">
//                       {user.firstName} {user.lastName}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       {formatDate(post.createdAt)}
//                     </p>
//                   </div>
//                 </div>
//                 <p className="text-gray-800 mb-4">{post.content}</p>
//                 {post.images.length > 0 && (
//                   <div className="relative mb-4">
//                     <img
//                       src={post.images[0]}
//                       alt="Post"
//                       className="w-full h-64 object-cover cursor-pointer"
//                       onClick={() => handleImageClick(post.images, 0)}
//                     />
//                     {post.images.length > 1 && (
//                       <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
//                         +{post.images.length - 1}
//                       </div>
//                     )}
//                   </div>
//                 )}
//                 <div className="flex items-center space-x-4">
//                   <button className="flex items-center text-gray-500 hover:text-blue-500">
//                     <FaHeart className="mr-1" />
//                     <span>{post.likes}</span>
//                   </button>
//                   <button
//                     className="flex items-center text-gray-500 hover:text-blue-500"
//                     onClick={() => toggleComments(post.id)}
//                   >
//                     <FaComment className="mr-1" />
//                     <span>{post.comments.length}</span>
//                   </button>
//                 </div>
//               </div>
//               {showComments[post.id] && (
//                 <div className="px-4 py-2 bg-gray-50">
//                   {post.comments.map((comment) => (
//                     <div key={comment.id} className="mb-2">
//                       <p className="font-semibold">{comment.user}</p>
//                       <p className="text-sm">{comment.content}</p>
//                       <p className="text-xs text-gray-500">
//                         {formatDate(comment.createdAt)}
//                       </p>
//                     </div>
//                   ))}
//                   <div className="mt-2 flex">
//                     <input
//                       type="text"
//                       placeholder="Add a comment..."
//                       value={newComments[post.id] || ""}
//                       onChange={(e) =>
//                         handleNewCommentChange(post.id, e.target.value)
//                       }
//                       className="flex-grow border rounded-l-md px-2 py-1"
//                     />
//                     <button
//                       onClick={() => handleAddComment(post.id)}
//                       className="bg-blue-500 text-white px-4 py-1 rounded-r-md hover:bg-blue-600"
//                     >
//                       Post
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {fullscreenImage && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//           <button
//             onClick={() => setFullscreenImage(null)}
//             className="absolute top-4 right-4 text-white text-2xl"
//           >
//             <FaTimes />
//           </button>
//           <button
//             onClick={handlePrevImage}
//             className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl"
//           >
//             <FaChevronLeft />
//           </button>
//           <img
//             src={fullscreenImage[currentImageIndex]}
//             alt="Full-size"
//             className="max-w-full max-h-full"
//           />
//           <button
//             onClick={handleNextImage}
//             className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl"
//           >
//             <FaChevronRight />
//           </button>
//         </div>
//       )}

//       {showFollowersModal && (
//         <FollowModal
//           title="Followers"
//           users={user.followers}
//           onClose={() => setShowFollowersModal(false)}
//         />
//       )}

//       {showFollowingModal && (
//         <FollowModal
//           title="Following"
//           users={user.following}
//           onClose={() => setShowFollowingModal(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default UserProfilePage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
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

const UserProfilePage = () => {
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

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/profile/${userId}`
        );
        setUser(response.data);
        console.log(response.data);

        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch user profile");
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  useEffect(() => {
    if (showFollowersModal || showFollowingModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showFollowersModal, showFollowingModal]);

  const handleFollow = async () => {
    try {
      await axios.post(`http://localhost:5000/api/users/${userId}/follow`);
      setIsFollowing(!isFollowing);
    } catch (err) {
      console.error("Failed to follow/unfollow user", err);
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
        await axios.post(`http://localhost:5000/api/posts/${postId}/comments`, {
          content: newComment,
        });
        const updatedUserResponse = await axios.get(
          `http://localhost:5000/api/users/profile/${userId}`
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
          <ul>
            {user.user.map((user) => (
              <li key={user.id} className="flex items-center mb-3">
                <img
                  src={user.profilePicture}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span>
                  {user.firstName} {user.lastName}
                </span>
              </li>
            ))}
          </ul>
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
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto">
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
                <img
                  src={user.user.profilePicture}
                  alt={`${user.user.firstName} ${user.user.lastName}`}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg cursor-pointer"
                  onClick={() =>
                    handleImageClick([user.user.profilePicture], 0)
                  }
                />
                <div className="ml-4">
                  <p className="text-gray-600">{user.user.bio}</p>
                  <p className="text-sm text-gray-500 mt-1 flex items-center">
                    <FaCalendarAlt className="mr-2" />
                    Joined {formatDate(user.user.joinedDate)}
                  </p>
                </div>
              </div>
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
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Posts</h2>
          {user.posts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <img
                    src={user.user.profilePicture}
                    alt={`${user.user.firstName} ${user.user.lastName}`}
                    className="w-10 h-10 rounded-full mr-3"
                  />
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
                    <span>{post.likes}</span>
                  </button>
                  <button
                    className="flex items-center text-gray-500 hover:text-blue-500"
                    onClick={() => toggleComments(post.id)}
                  >
                    <FaComment className="mr-1" />
                    <span>{post.comments.length}</span>
                  </button>
                </div>
              </div>
              {showComments[post.id] && (
                <div className="px-4 py-2 bg-gray-50">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="mb-2">
                      <p className="font-semibold">{comment.user}</p>
                      <p className="text-sm">{comment.content}</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(comment.createdAt)}
                      </p>
                    </div>
                  ))}
                  <div className="mt-2 flex">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={newComments[post.id] || ""}
                      onChange={(e) =>
                        handleNewCommentChange(post.id, e.target.value)
                      }
                      className="flex-grow border rounded-l-md px-2 py-1"
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="bg-blue-500 text-white px-4 py-1 rounded-r-md hover:bg-blue-600"
                    >
                      Post
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
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
          users={user.followers}
          onClose={() => setShowFollowersModal(false)}
        />
      )}

      {showFollowingModal && (
        <FollowModal
          title="Following"
          users={user.following}
          onClose={() => setShowFollowingModal(false)}
        />
      )}
    </div>
  );
};

export default UserProfilePage;
