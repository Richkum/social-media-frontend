// import React, { useState, useEffect } from "react";
// import {
//   FaSpinner,
//   FaCamera,
//   FaEdit,
//   FaUser,
//   FaHeart,
//   FaComment,
//   FaImage,
// } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import NewPostComponent from "../../components/post/NewPost";
// import SideBar from "../../components/sideBar/SideBar";
// import { UserIcon } from "@heroicons/react/outline";
// const UserProfilePage = () => {
//   const API_URL = import.meta.env.VITE_API_BASE_URL;

//   const [userProfile, setUserProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [editedFields, setEditedFields] = useState({});
//   const [errors, setErrors] = useState({});
//   const [submitStatus, setSubmitStatus] = useState(null);
//   const [submitLoading, setSubmitLoading] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const token = useSelector((state) => state.auth.token);

//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   const fetchUserProfile = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/api/users/my-profile`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       const data = response.data;
//       console.log(data);

//       setUserProfile(data.user);
//       setEditedFields({
//         firstName: data.user.firstName,
//         lastName: data.user.lastName,
//         bio: data.user.bio || "",
//       });
//     } catch (error) {
//       console.error("Error fetching user profile:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = () => {
//     setEditing(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedFields((prev) => ({ ...prev, [name]: value }));
//     validateField(name, value);
//   };

//   const validateField = (name, value) => {
//     let newErrors = { ...errors };
//     switch (name) {
//       case "firstName":
//       case "lastName":
//         if (value.length < 2) {
//           newErrors[name] = "Must be at least 2 characters long";
//         } else if (/\d/.test(value)) {
//           newErrors[name] = "Must not contain numbers";
//         } else {
//           delete newErrors[name];
//         }
//         break;
//       default:
//         break;
//     }
//     setErrors(newErrors);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (Object.keys(errors).length > 0) {
//       return;
//     }
//     setSubmitLoading(true);
//     setSubmitStatus(null);

//     try {
//       const response = await axios.put(
//         `${API_URL}/api/users/update-profile`,
//         editedFields,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         setUserProfile((prev) => ({ ...prev, ...response.data }));
//         setEditing(false);
//         setSubmitStatus({
//           type: "success",
//           message: "Profile updated successfully!",
//         });
//       } else {
//         throw new Error("Failed to update profile");
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       setSubmitStatus({
//         type: "error",
//         message: "Failed to update profile. Please try again.",
//       });
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setEditedFields((prev) => ({ ...prev, profilePicture: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-100">
//         <FaSpinner className="animate-spin text-blue-500 text-4xl" />
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* <Navbar /> */}

//       <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
//         {/* <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100"> */}
//         <SideBar
//           isMobileMenuOpen={isMobileMenuOpen}
//           setIsMobileMenuOpen={setIsMobileMenuOpen}
//         />
//         <div className="flex-1 lg:w-3/5 lg:ml-[20%] lg:mr-[20%]">
//           <header className="bg-white shadow-md p-4 sticky top-0 z-20">
//             <div className="flex justify-between items-center">
//               <button
//                 onClick={() => setIsMobileMenuOpen(true)}
//                 className="lg:hidden text-gray-500 hover:text-gray-700"
//               >
//                 <svg
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               </button>
//               <h1 className="text-xl font-semibold text-gray-800">
//                 Your Profile
//               </h1>
//               <div className="lg:hidden">
//                 <UserIcon className="h-6 w-6 text-gray-500" />
//               </div>
//             </div>
//           </header>
//           <div className="relative h-48 sm:h-64 bg-gradient-to-r from-blue-400 to-indigo-500">
//             <div className="absolute inset-0 bg-black opacity-30"></div>
//             <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//               <h1 className="text-3xl sm:text-4xl font-bold">
//                 {userProfile.firstName} {userProfile.lastName}
//               </h1>
//               <p className="mt-2 text-sm sm:text-base">
//                 {userProfile.bio || "Add a description about yourself"}
//               </p>
//             </div>
//           </div>
//           <div className="relative">
//             <div className="absolute -top-16 left-6">
//               <div className="relative">
//                 {userProfile.profilePicture ? (
//                   <img
//                     src={
//                       editedFields.profilePicture || userProfile.profilePicture
//                     }
//                     alt="Profile"
//                     className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
//                   />
//                 ) : (
//                   <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
//                     <FaUser className="text-gray-400 text-4xl" />
//                   </div>
//                 )}
//                 {editing && (
//                   <label
//                     htmlFor="profilePicture"
//                     className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer shadow-md"
//                   >
//                     <FaCamera className="text-gray-600" />
//                     <input
//                       type="file"
//                       id="profilePicture"
//                       accept="image/*"
//                       className="hidden"
//                       onChange={handleImageUpload}
//                     />
//                   </label>
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="pt-24 pb-8 px-6 sm:px-8">
//             <div className="flex flex-wrap justify-between items-center mb-6">
//               <div className="flex space-x-4 mb-4 sm:mb-0">
//                 <button className="text-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
//                   <span className="block font-bold text-lg">
//                     {userProfile.followers ? userProfile.followers.length : 0}
//                   </span>
//                   <span className="text-sm">Followers</span>
//                 </button>
//                 <button className="text-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
//                   <span className="block font-bold text-lg">
//                     {userProfile.following ? userProfile.following.length : 0}
//                   </span>
//                   <span className="text-sm">Following</span>
//                 </button>
//               </div>
//               {!editing && (
//                 <button
//                   onClick={handleEdit}
//                   className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                 >
//                   <FaEdit className="mr-2" />
//                   Edit Profile
//                 </button>
//               )}
//             </div>
//             <div className="grid grid-cols-3 gap-4 mb-6">
//               <div className="text-center p-3 bg-gray-100 rounded-lg">
//                 <FaHeart className="text-red-500 text-2xl mx-auto mb-2" />
//                 <span className="block font-bold text-lg">
//                   {userProfile.totalLikes || 0}
//                 </span>
//                 <span className="text-sm text-gray-600">Total Likes</span>
//               </div>
//               <div className="text-center p-3 bg-gray-100 rounded-lg">
//                 <FaComment className="text-blue-500 text-2xl mx-auto mb-2" />
//                 <span className="block font-bold text-lg">
//                   {userProfile.totalComments || 0}
//                 </span>
//                 <span className="text-sm text-gray-600">Total Comments</span>
//               </div>
//               <div className="text-center p-3 bg-gray-100 rounded-lg">
//                 <FaImage className="text-green-500 text-2xl mx-auto mb-2" />
//                 <span className="block font-bold text-lg">
//                   {userProfile.totalPosts || 0}
//                 </span>
//                 <span className="text-sm text-gray-600">Total Posts</span>
//               </div>
//             </div>

//             <NewPostComponent />
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div>
//                   <label
//                     htmlFor="firstName"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     First Name
//                   </label>
//                   <input
//                     type="text"
//                     id="firstName"
//                     name="firstName"
//                     value={
//                       editing ? editedFields.firstName : userProfile.firstName
//                     }
//                     onChange={handleInputChange}
//                     disabled={!editing}
//                     className={`mt-1 block w-full rounded-md shadow-sm ${
//                       editing
//                         ? "border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
//                         : "bg-gray-100 border-transparent"
//                     } transition duration-300 ease-in-out`}
//                   />
//                   {errors.firstName && (
//                     <p className="mt-1 text-sm text-red-600">
//                       {errors.firstName}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="lastName"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Last Name
//                   </label>
//                   <input
//                     type="text"
//                     id="lastName"
//                     name="lastName"
//                     value={
//                       editing ? editedFields.lastName : userProfile.lastName
//                     }
//                     onChange={handleInputChange}
//                     disabled={!editing}
//                     className={`mt-1 block w-full rounded-md shadow-sm ${
//                       editing
//                         ? "border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
//                         : "bg-gray-100 border-transparent"
//                     } transition duration-300 ease-in-out`}
//                   />
//                   {errors.lastName && (
//                     <p className="mt-1 text-sm text-red-600">
//                       {errors.lastName}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     value={userProfile.email}
//                     disabled
//                     className="mt-1 block w-full rounded-md border-transparent bg-gray-100 shadow-sm"
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="dateOfBirth"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Date of Birth
//                   </label>
//                   <input
//                     type="text"
//                     id="dateOfBirth"
//                     value={formatDate(userProfile.dateOfBirth)}
//                     disabled
//                     className="mt-1 block w-full rounded-md border-transparent bg-gray-100 shadow-sm"
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="gender"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Gender
//                   </label>
//                   <input
//                     type="text"
//                     id="gender"
//                     value={userProfile.gender}
//                     disabled
//                     className="mt-1 block w-full rounded-md border-transparent bg-gray-100 shadow-sm"
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="joinDate"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Joined On
//                   </label>
//                   <input
//                     type="text"
//                     id="joinDate"
//                     value={formatDate(userProfile.joinDate)}
//                     disabled
//                     className="mt-1 block w-full rounded-md border-transparent bg-gray-100 shadow-sm"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label
//                   htmlFor="bio"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Bio
//                 </label>
//                 <textarea
//                   id="bio"
//                   name="bio"
//                   rows="3"
//                   value={editing ? editedFields.bio : userProfile.bio}
//                   onChange={handleInputChange}
//                   disabled={!editing}
//                   placeholder={
//                     editing ? "Add a description about yourself" : ""
//                   }
//                   className={`mt-1 block w-full rounded-md shadow-sm ${
//                     editing
//                       ? "border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
//                       : "bg-gray-100 border-transparent"
//                   } transition duration-300 ease-in-out`}
//                 ></textarea>
//               </div>
//               {editing && (
//                 <div className="flex justify-end space-x-3">
//                   <button
//                     type="button"
//                     onClick={() => setEditing(false)}
//                     className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={submitLoading || Object.keys(errors).length > 0}
//                     className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out disabled:opacity-50"
//                   >
//                     {submitLoading ? (
//                       <FaSpinner className="animate-spin mx-auto" />
//                     ) : (
//                       "Save Changes"
//                     )}
//                   </button>
//                 </div>
//               )}
//             </form>
//           </div>
//         </div>
//         {submitStatus && (
//           <div
//             className={`mt-4 p-4 rounded-md ${
//               submitStatus.type === "success"
//                 ? "bg-green-100 text-green-700"
//                 : "bg-red-100 text-red-700"
//             } transition duration-300 ease-in-out`}
//           >
//             {submitStatus.message}
//           </div>
//         )}
//         {/* </div> */}
//       </div>
//     </>
//   );
// };

// export default UserProfilePage;

// import React, { useState, useEffect } from "react";
// import {
//   FaSpinner,
//   FaCamera,
//   FaEdit,
//   FaUser,
//   FaHeart,
//   FaComment,
//   FaImage,
//   FaTimes,
// } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import NewPostComponent from "../../components/post/NewPost";
// import SideBar from "../../components/sideBar/SideBar";
// import { UserIcon } from "@heroicons/react/outline";

// const UserProfilePage = () => {
//   const API_URL = import.meta.env.VITE_API_BASE_URL;

//   const [userProfile, setUserProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [editedFields, setEditedFields] = useState({});
//   const [errors, setErrors] = useState({});
//   const [submitStatus, setSubmitStatus] = useState(null);
//   const [submitLoading, setSubmitLoading] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("details");
//   const [showFollowersModal, setShowFollowersModal] = useState(false);
//   const [showFollowingModal, setShowFollowingModal] = useState(false);

//   const token = useSelector((state) => state.auth.token);

//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   const fetchUserProfile = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/api/users/my-profile`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       const data = response.data;
//       setUserProfile(data.user);
//       setEditedFields({
//         firstName: data.user.firstName,
//         lastName: data.user.lastName,
//         bio: data.user.bio || "",
//       });
//     } catch (error) {
//       console.error("Error fetching user profile:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = () => {
//     setEditing(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedFields((prev) => ({ ...prev, [name]: value }));
//     validateField(name, value);
//   };

//   const validateField = (name, value) => {
//     let newErrors = { ...errors };
//     switch (name) {
//       case "firstName":
//       case "lastName":
//         if (value.length < 2) {
//           newErrors[name] = "Must be at least 2 characters long";
//         } else if (/\d/.test(value)) {
//           newErrors[name] = "Must not contain numbers";
//         } else {
//           delete newErrors[name];
//         }
//         break;
//       default:
//         break;
//     }
//     setErrors(newErrors);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (Object.keys(errors).length > 0) {
//       return;
//     }
//     setSubmitLoading(true);
//     setSubmitStatus(null);

//     try {
//       const response = await axios.put(
//         `${API_URL}/api/users/update-profile`,
//         editedFields,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         setUserProfile((prev) => ({ ...prev, ...response.data }));
//         setEditing(false);
//         setSubmitStatus({
//           type: "success",
//           message: "Profile updated successfully!",
//         });
//       } else {
//         throw new Error("Failed to update profile");
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       setSubmitStatus({
//         type: "error",
//         message: "Failed to update profile. Please try again.",
//       });
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setEditedFields((prev) => ({ ...prev, profilePicture: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const FollowModal = ({ title, users, onClose }) => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-80 max-h-96 overflow-hidden">
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
//           {users && users.length > 0 ? (
//             <ul>
//               {users.map((user) => (
//                 <li key={user._id} className="flex items-center mb-3">
//                   {user.profilePicture ? (
//                     <img
//                       src={user.profilePicture}
//                       alt="Profile"
//                       className="w-10 h-10 rounded-full mr-3"
//                     />
//                   ) : (
//                     <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
//                       <FaUser className="text-gray-400" />
//                     </div>
//                   )}
//                   <span>
//                     {user.firstName} {user.lastName}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-500">No {title.toLowerCase()} yet.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-100">
//         <FaSpinner className="animate-spin text-blue-500 text-4xl" />
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
//       <SideBar
//         isMobileMenuOpen={isMobileMenuOpen}
//         setIsMobileMenuOpen={setIsMobileMenuOpen}
//       />
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
//             <h1 className="text-xl font-semibold text-gray-800">
//               Your Profile
//             </h1>
//             <div className="lg:hidden">
//               <UserIcon className="h-6 w-6 text-gray-500" />
//             </div>
//           </div>
//         </header>
//         <div className="relative h-48 sm:h-64 bg-gradient-to-r from-blue-400 to-indigo-500">
//           <div className="absolute inset-0 bg-black opacity-30"></div>
//           <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//             <h1 className="text-3xl sm:text-4xl font-bold">
//               {userProfile.firstName} {userProfile.lastName}
//             </h1>
//             <p className="mt-2 text-sm sm:text-base">
//               {userProfile.bio || "Add a description about yourself"}
//             </p>
//           </div>
//         </div>
//         <div className="relative">
//           <div className="absolute -top-16 left-6">
//             <div className="relative">
//               {userProfile.profilePicture ? (
//                 <img
//                   src={
//                     editedFields.profilePicture || userProfile.profilePicture
//                   }
//                   alt="Profile"
//                   className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
//                 />
//               ) : (
//                 <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
//                   <FaUser className="text-gray-400 text-4xl" />
//                 </div>
//               )}
//               {editing && (
//                 <label
//                   htmlFor="profilePicture"
//                   className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer shadow-md"
//                 >
//                   <FaCamera className="text-gray-600" />
//                   <input
//                     type="file"
//                     id="profilePicture"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={handleImageUpload}
//                   />
//                 </label>
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="pt-24 pb-8 px-6 sm:px-8">
//           <div className="flex flex-wrap justify-between items-center mb-6">
//             <div className="flex space-x-4 mb-4 sm:mb-0">
//               <button
//                 onClick={() => setShowFollowersModal(true)}
//                 className="text-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
//               >
//                 <span className="block font-bold text-lg">
//                   {userProfile.followers ? userProfile.followers.length : 0}
//                 </span>
//                 <span className="text-sm">Followers</span>
//               </button>
//               <button
//                 onClick={() => setShowFollowingModal(true)}
//                 className="text-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
//               >
//                 <span className="block font-bold text-lg">
//                   {userProfile.following ? userProfile.following.length : 0}
//                 </span>
//                 <span className="text-sm">Following</span>
//               </button>
//             </div>
//             {!editing && (
//               <button
//                 onClick={handleEdit}
//                 className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//               >
//                 <FaEdit className="mr-2" />
//                 Edit Profile
//               </button>
//             )}
//           </div>
//           <div className="grid grid-cols-3 gap-4 mb-6">
//             <div className="text-center p-3 bg-gray-100 rounded-lg">
//               <FaHeart className="text-red-500 text-2xl mx-auto mb-2" />
//               <span className="block font-bold text-lg">
//                 {userProfile.totalLikes || 0}
//               </span>
//               <span className="text-sm text-gray-600">Total Likes</span>
//             </div>
//             <div className="text-center p-3 bg-gray-100 rounded-lg">
//               <FaComment className="text-blue-500 text-2xl mx-auto mb-2" />
//               <span className="block font-bold text-lg">
//                 {userProfile.totalComments || 0}
//               </span>
//               <span className="text-sm text-gray-600">Total Comments</span>
//             </div>
//             <div className="text-center p-3 bg-gray-100 rounded-lg">
//               <FaImage className="text-green-500 text-2xl mx-auto mb-2" />
//               <span className="block font-bold text-lg">
//                 {userProfile.totalPosts || 0}
//               </span>
//               <span className="text-sm text-gray-600">Total Posts</span>
//             </div>
//           </div>

//           <div className="mb-6">
//             <div className="flex border-b border-gray-200">
//               <button
//                 className={`py-2 px-4 ${
//                   activeTab === "details"
//                     ? "border-b-2 border-blue-500 text-blue-500"
//                     : "text-gray-500"
//                 }`}
//                 onClick={() => setActiveTab("details")}
//               >
//                 Details
//               </button>
//               <button
//                 className={`py-2 px-4 ${
//                   activeTab === "posts"
//                     ? "border-b-2 border-blue-500 text-blue-500"
//                     : "text-gray-500"
//                 }`}
//                 onClick={() => setActiveTab("posts")}
//               >
//                 Posts
//               </button>
//               <button
//                 className={`py-2 px-4 ${
//                   activeTab === "media"
//                     ? "border-b-2 border-blue-500 text-blue-500"
//                     : "text-gray-500"
//                 }`}
//                 onClick={() => setActiveTab("media")}
//               >
//                 Media
//               </button>
//               <button
//                 className={`py-2 px-4 ${
//                   activeTab === "status"
//                     ? "border-b-2 border-blue-500 text-blue-500"
//                     : "text-gray-500"
//                 }`}
//                 onClick={() => setActiveTab("status")}
//               >
//                 Status
//               </button>
//             </div>
//           </div>

//           {activeTab === "details" && (
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
//                 <div className="bg-white p-4 rounded-lg shadow">
//                   <label
//                     htmlFor="firstName"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     First Name
//                   </label>
//                   <input
//                     type="text"
//                     id="firstName"
//                     name="firstName"
//                     value={
//                       editing ? editedFields.firstName : userProfile.firstName
//                     }
//                     onChange={handleInputChange}
//                     disabled={!editing}
//                     className={`mt-1 block w-full rounded-md shadow-sm ${
//                       editing
//                         ? "border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
//                         : "bg-gray-100 border-transparent"
//                     } transition duration-300 ease-in-out text-lg font-semibold`}
//                   />
//                   {errors.firstName && (
//                     <p className="mt-1 text-sm text-red-600">
//                       {errors.firstName}
//                     </p>
//                   )}
//                 </div>
//                 <div className="bg-white p-4 rounded-lg shadow">
//                   <label
//                     htmlFor="lastName"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Last Name
//                   </label>
//                   <input
//                     type="text"
//                     id="lastName"
//                     name="lastName"
//                     value={
//                       editing ? editedFields.lastName : userProfile.lastName
//                     }
//                     onChange={handleInputChange}
//                     disabled={!editing}
//                     className={`mt-1 block w-full rounded-md shadow-sm ${
//                       editing
//                         ? "border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
//                         : "bg-gray-100 border-transparent"
//                     } transition duration-300 ease-in-out text-lg font-semibold`}
//                   />
//                   {errors.lastName && (
//                     <p className="mt-1 text-sm text-red-600">
//                       {errors.lastName}
//                     </p>
//                   )}
//                 </div>
//                 <div className="bg-white p-4 rounded-lg shadow">
//                   <label
//                     htmlFor="email"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     value={userProfile.email}
//                     disabled
//                     className="mt-1 block w-full rounded-md border-transparent bg-gray-100 shadow-sm text-lg font-semibold"
//                   />
//                 </div>
//                 <div className="bg-white p-4 rounded-lg shadow">
//                   <label
//                     htmlFor="dateOfBirth"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Date of Birth
//                   </label>
//                   <input
//                     type="text"
//                     id="dateOfBirth"
//                     value={formatDate(userProfile.dateOfBirth)}
//                     disabled
//                     className="mt-1 block w-full rounded-md border-transparent bg-gray-100 shadow-sm text-lg font-semibold"
//                   />
//                 </div>
//                 <div className="bg-white p-4 rounded-lg shadow">
//                   <label
//                     htmlFor="gender"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Gender
//                   </label>
//                   <input
//                     type="text"
//                     id="gender"
//                     value={userProfile.gender}
//                     disabled
//                     className="mt-1 block w-full rounded-md border-transparent bg-gray-100 shadow-sm text-lg font-semibold"
//                   />
//                 </div>
//                 <div className="bg-white p-4 rounded-lg shadow">
//                   <label
//                     htmlFor="joinDate"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Joined On
//                   </label>
//                   <input
//                     type="text"
//                     id="joinDate"
//                     value={formatDate(userProfile.joinDate)}
//                     disabled
//                     className="mt-1 block w-full rounded-md border-transparent bg-gray-100 shadow-sm text-lg font-semibold"
//                   />
//                 </div>
//               </div>
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <label
//                   htmlFor="bio"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Bio
//                 </label>
//                 <textarea
//                   id="bio"
//                   name="bio"
//                   rows="3"
//                   value={editing ? editedFields.bio : userProfile.bio}
//                   onChange={handleInputChange}
//                   disabled={!editing}
//                   placeholder={
//                     editing ? "Add a description about yourself" : ""
//                   }
//                   className={`mt-1 block w-full rounded-md shadow-sm ${
//                     editing
//                       ? "border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
//                       : "bg-gray-100 border-transparent"
//                   } transition duration-300 ease-in-out text-lg`}
//                 ></textarea>
//               </div>
//               {editing && (
//                 <div className="flex justify-end space-x-3">
//                   <button
//                     type="button"
//                     onClick={() => setEditing(false)}
//                     className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={submitLoading || Object.keys(errors).length > 0}
//                     className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out disabled:opacity-50"
//                   >
//                     {submitLoading ? (
//                       <FaSpinner className="animate-spin mx-auto" />
//                     ) : (
//                       "Save Changes"
//                     )}
//                   </button>
//                 </div>
//               )}
//             </form>
//           )}

//           {activeTab === "posts" && <NewPostComponent />}

//           {activeTab === "media" && (
//             <div className="bg-white p-4 rounded-lg shadow">
//               <h2 className="text-xl font-semibold mb-4">Media</h2>
//               <p>Your media content will be displayed here.</p>
//             </div>
//           )}

//           {activeTab === "status" && (
//             <div className="bg-white p-4 rounded-lg shadow">
//               <h2 className="text-xl font-semibold mb-4">Status</h2>
//               <p>Your current status and updates will be shown here.</p>
//             </div>
//           )}
//         </div>
//         {submitStatus && (
//           <div
//             className={`mt-4 p-4 rounded-md ${
//               submitStatus.type === "success"
//                 ? "bg-green-100 text-green-700"
//                 : "bg-red-100 text-red-700"
//             } transition duration-300 ease-in-out`}
//           >
//             {submitStatus.message}
//           </div>
//         )}
//       </div>

//       {showFollowersModal && (
//         <FollowModal
//           title="Followers"
//           users={userProfile.followers}
//           onClose={() => setShowFollowersModal(false)}
//         />
//       )}

//       {showFollowingModal && (
//         <FollowModal
//           title="Following"
//           users={userProfile.following}
//           onClose={() => setShowFollowingModal(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default UserProfilePage;

import React, { useState, useEffect } from "react";
import {
  FaSpinner,
  FaCamera,
  FaEdit,
  FaUser,
  FaHeart,
  FaComment,
  FaImage,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import NewPostComponent from "../../components/post/NewPost";
import SideBar from "../../components/sideBar/SideBar";
import { UserIcon } from "@heroicons/react/outline";

const UserProfilePage = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editedFields, setEditedFields] = useState({});
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [fullscreenMedia, setFullscreenMedia] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/users/my-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      setUserProfile(data.user);
      setUserPosts(data.posts);
      setEditedFields({
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        bio: data.user.bio || "",
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // ... (keep all other functions as they are)
  const handleEdit = () => {
    setEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedFields((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };
    switch (name) {
      case "firstName":
      case "lastName":
        if (value.length < 2) {
          newErrors[name] = "Must be at least 2 characters long";
        } else if (/\d/.test(value)) {
          newErrors[name] = "Must not contain numbers";
        } else {
          delete newErrors[name];
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      return;
    }
    setSubmitLoading(true);
    setSubmitStatus(null);

    try {
      const response = await axios.put(
        `${API_URL}/api/users/update-profile`,
        editedFields,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setUserProfile((prev) => ({ ...prev, ...response.data }));
        setEditing(false);
        setSubmitStatus({
          type: "success",
          message: "Profile updated successfully!",
        });
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setSubmitStatus({
        type: "error",
        message: "Failed to update profile. Please try again.",
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedFields((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const FollowModal = ({ title, users, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 max-h-96 overflow-hidden">
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
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
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

  const handleFullscreenMedia = (media, index) => {
    setFullscreenMedia(media);
    setCurrentMediaIndex(index);
  };

  const handlePrevMedia = () => {
    setCurrentMediaIndex((prevIndex) =>
      prevIndex === 0 ? fullscreenMedia.length - 1 : prevIndex - 1
    );
  };

  const handleNextMedia = () => {
    setCurrentMediaIndex((prevIndex) =>
      prevIndex === fullscreenMedia.length - 1 ? 0 : prevIndex + 1
    );
  };

  const getAllMedia = () => {
    return userPosts.reduce((acc, post) => {
      if (post.media && post.media.length > 0) {
        acc.push(...post.media);
      }
      return acc;
    }, []);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <FaSpinner className="animate-spin text-blue-500 text-4xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <SideBar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <div className="flex-1 lg:w-3/5 lg:ml-[20%] lg:mr-[20%]">
        {/* ... (keep the header and user info section as they are) */}
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
              Your Profile
            </h1>
            <div className="lg:hidden">
              <UserIcon className="h-6 w-6 text-gray-500" />
            </div>
          </div>
        </header>
        <div className="relative h-48 sm:h-64 bg-gradient-to-r from-blue-400 to-indigo-500">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-3xl sm:text-4xl font-bold">
              {userProfile.firstName} {userProfile.lastName}
            </h1>
            <p className="mt-2 text-sm sm:text-base">
              {userProfile.bio || "Add a description about yourself"}
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-16 left-6">
            <div className="relative">
              {userProfile.profilePicture ? (
                <img
                  src={
                    editedFields.profilePicture || userProfile.profilePicture
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
                  <FaUser className="text-gray-400 text-4xl" />
                </div>
              )}
              {editing && (
                <label
                  htmlFor="profilePicture"
                  className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer shadow-md"
                >
                  <FaCamera className="text-gray-600" />
                  <input
                    type="file"
                    id="profilePicture"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="pt-24 pb-8 px-6 sm:px-8">
          {/* ... (keep the followers/following buttons and edit profile button as they are) */}
          <div className="flex flex-wrap justify-between items-center mb-6">
            <div className="flex space-x-4 mb-4 sm:mb-0">
              <button
                onClick={() => setShowFollowersModal(true)}
                className="text-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                <span className="block font-bold text-lg">
                  {userProfile.followers ? userProfile.followers.length : 0}
                </span>
                <span className="text-sm">Followers</span>
              </button>
              <button
                onClick={() => setShowFollowingModal(true)}
                className="text-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                <span className="block font-bold text-lg">
                  {userProfile.following ? userProfile.following.length : 0}
                </span>
                <span className="text-sm">Following</span>
              </button>
            </div>
            {!editing && (
              <button
                onClick={handleEdit}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <FaEdit className="mr-2" />
                Edit Profile
              </button>
            )}
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-gray-100 rounded-lg">
              <FaHeart className="text-red-500 text-2xl mx-auto mb-2" />
              <span className="block font-bold text-lg">
                {userProfile.totalLikes || 0}
              </span>
              <span className="text-sm text-gray-600">Total Likes</span>
            </div>
            <div className="text-center p-3 bg-gray-100 rounded-lg">
              <FaComment className="text-blue-500 text-2xl mx-auto mb-2" />
              <span className="block font-bold text-lg">
                {userProfile.totalComments || 0}
              </span>
              <span className="text-sm text-gray-600">Total Comments</span>
            </div>
            <div className="text-center p-3 bg-gray-100 rounded-lg">
              <FaImage className="text-green-500 text-2xl mx-auto mb-2" />
              <span className="block font-bold text-lg">
                {userProfile.totalPosts || 0}
              </span>
              <span className="text-sm text-gray-600">Total Posts</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex border-b border-gray-200">
              <button
                className={`py-2 px-4 ${
                  activeTab === "details"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("details")}
              >
                Details
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === "posts"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("posts")}
              >
                Posts
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === "media"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("media")}
              >
                Media
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === "status"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("status")}
              >
                Status
              </button>
            </div>
          </div>

          {activeTab === "details" && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ... (keep the user details form as it is) */}
              <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
                <div className="bg-white p-4 rounded-lg shadow">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={
                      editing ? editedFields.firstName : userProfile.firstName
                    }
                    onChange={handleInputChange}
                    disabled={!editing}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      editing
                        ? "border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        : "bg-gray-100 border-transparent"
                    } transition duration-300 ease-in-out text-lg font-semibold`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={
                      editing ? editedFields.lastName : userProfile.lastName
                    }
                    onChange={handleInputChange}
                    disabled={!editing}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      editing
                        ? "border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        : "bg-gray-100 border-transparent"
                    } transition duration-300 ease-in-out text-lg font-semibold`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.lastName}
                    </p>
                  )}
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={userProfile.email}
                    disabled
                    className="mt-1 block w-full rounded-md border-transparent bg-gray-100 shadow-sm text-lg font-semibold"
                  />
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="text"
                    id="dateOfBirth"
                    value={formatDate(userProfile.dateOfBirth)}
                    disabled
                    className="mt-1 block w-full rounded-md border-transparent bg-gray-100 shadow-sm text-lg font-semibold"
                  />
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Gender
                  </label>
                  <input
                    type="text"
                    id="gender"
                    value={userProfile.gender}
                    disabled
                    className="mt-1 block w-full rounded-md border-transparent bg-gray-100 shadow-sm text-lg font-semibold"
                  />
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <label
                    htmlFor="joinDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Joined On
                  </label>
                  <input
                    type="text"
                    id="joinDate"
                    value={formatDate(userProfile.joinDate)}
                    disabled
                    className="mt-1 block w-full rounded-md border-transparent bg-gray-100 shadow-sm text-lg font-semibold"
                  />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows="3"
                  value={editing ? editedFields.bio : userProfile.bio}
                  onChange={handleInputChange}
                  disabled={!editing}
                  placeholder={
                    editing ? "Add a description about yourself" : ""
                  }
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    editing
                      ? "border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      : "bg-gray-100 border-transparent"
                  } transition duration-300 ease-in-out text-lg`}
                ></textarea>
              </div>
              {editing && (
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitLoading || Object.keys(errors).length > 0}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out disabled:opacity-50"
                  >
                    {submitLoading ? (
                      <FaSpinner className="animate-spin mx-auto" />
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              )}
            </form>
          )}

          {activeTab === "posts" && (
            <div className="space-y-6">
              <NewPostComponent />
              {userPosts.map((post) => (
                <div
                  key={post._id}
                  className=" mx-auto bg-white rounded-lg shadow-md mb-8 p-4 w-full md:w-2/3"
                >
                  <p className="text-gray-800 mb-4">{post.content}</p>
                  {post.media && post.media.length > 0 && (
                    <img
                      src={post.media[0]}
                      alt="Post media"
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <FaHeart className="text-red-500 mr-2" />
                      <span>{post.likes.length}</span>
                    </div>
                    <div className="flex items-center">
                      <FaComment className="text-blue-500 mr-2" />
                      <span>{post.comments.length}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "media" && (
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Media</h2>
              <div className="grid grid-cols-2 gap-4">
                {getAllMedia().map((mediaUrl, index) => (
                  <img
                    key={index}
                    src={mediaUrl}
                    alt={`Media ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg cursor-pointer"
                    onClick={() => handleFullscreenMedia(getAllMedia(), index)}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === "status" && (
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Status</h2>
              <p>Your current status and updates will be shown here.</p>
            </div>
          )}
        </div>

        {/* ... (keep the submit status message as it is) */}
        {submitStatus && (
          <div
            className={`mt-4 p-4 rounded-md ${
              submitStatus.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            } transition duration-300 ease-in-out`}
          >
            {submitStatus.message}
          </div>
        )}
      </div>

      {/* ... (keep the followers and following modals as they are) */}

      {showFollowersModal && (
        <FollowModal
          title="Followers"
          users={userProfile.followers}
          onClose={() => setShowFollowersModal(false)}
        />
      )}

      {showFollowingModal && (
        <FollowModal
          title="Following"
          users={userProfile.following}
          onClose={() => setShowFollowingModal(false)}
        />
      )}

      {fullscreenMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <button
            onClick={() => setFullscreenMedia(null)}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            <FaTimes />
          </button>
          <button
            onClick={handlePrevMedia}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl"
          >
            <FaChevronLeft />
          </button>
          <img
            src={fullscreenMedia[currentMediaIndex]}
            alt="Full-size media"
            className="max-w-full max-h-full object-contain"
          />
          <button
            onClick={handleNextMedia}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
