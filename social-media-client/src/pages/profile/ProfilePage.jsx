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

// const UserProfilePage = () => {
//   const [userProfile, setUserProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [editedFields, setEditedFields] = useState({});
//   const [errors, setErrors] = useState({});
//   const [submitStatus, setSubmitStatus] = useState(null);
//   const [submitLoading, setSubmitLoading] = useState(false);

//   const token = useSelector((state) => state.auth.token);

//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   const fetchUserProfile = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/users/my-profile",
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch user profile");
//       }
//       const data = await response.json();
//       console.log(data);

//       setUserProfile(data.user);
//       setEditedFields({
//         firstName: data.firstName,
//         lastName: data.lastName,
//         dateOfBirth: data.dateOfBirth,
//         bio: data.bio || "",
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
//       case "dateOfBirth":
//         if (!value) {
//           newErrors[name] = "Date of birth is required";
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
//       // Use axios directly for PUT request
//       const response = await axios.put(
//         "http://localhost:5000/api/users/update-profile",
//         editedFields, // Pass the editedFields directly
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // Include the token in the headers
//           },
//         }
//       );

//       // Check response status and update state accordingly
//       if (response.status === 200) {
//         setUserProfile((prev) => ({ ...prev, ...response.data })); // Update profile data
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

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-100">
//         <FaSpinner className="animate-spin text-blue-500 text-4xl" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white shadow-xl rounded-lg overflow-hidden">
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
//                     value={editedFields.firstName}
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
//                     value={editedFields.lastName}
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
//                     type="date"
//                     id="dateOfBirth"
//                     name="dateOfBirth"
//                     value={editedFields.dateOfBirth}
//                     onChange={handleInputChange}
//                     disabled={!editing}
//                     className={`mt-1 block w-full rounded-md shadow-sm ${
//                       editing
//                         ? "border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
//                         : "bg-gray-100 border-transparent"
//                     } transition duration-300 ease-in-out`}
//                   />
//                   {errors.dateOfBirth && (
//                     <p className="mt-1 text-sm text-red-600">
//                       {errors.dateOfBirth}
//                     </p>
//                   )}
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
//                     value={new Date(userProfile.joinDate).toLocaleDateString()}
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
//                   value={editedFields.bio}
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
//       </div>
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
} from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import NewPostComponent from "../../components/post/NewPost";

const UserProfilePage = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editedFields, setEditedFields] = useState({});
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

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
      console.log(data);

      setUserProfile(data.user);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <FaSpinner className="animate-spin text-blue-500 text-4xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
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
            <div className="flex flex-wrap justify-between items-center mb-6">
              <div className="flex space-x-4 mb-4 sm:mb-0">
                <button className="text-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
                  <span className="block font-bold text-lg">
                    {userProfile.followers ? userProfile.followers.length : 0}
                  </span>
                  <span className="text-sm">Followers</span>
                </button>
                <button className="text-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
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

            <NewPostComponent />
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
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
                    } transition duration-300 ease-in-out`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
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
                    } transition duration-300 ease-in-out`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.lastName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={userProfile.email}
                    disabled
                    className="mt-1 block w-full rounded-md border-transparent bg-gray-100 shadow-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="text"
                    id="dateOfBirth"
                    value={formatDate(userProfile.dateOfBirth)}
                    disabled
                    className="mt-1 block w-full rounded-md border-transparent bg-gray-100 shadow-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gender
                  </label>
                  <input
                    type="text"
                    id="gender"
                    value={userProfile.gender}
                    disabled
                    className="mt-1 block w-full rounded-md border-transparent bg-gray-100 shadow-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="joinDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Joined On
                  </label>
                  <input
                    type="text"
                    id="joinDate"
                    value={formatDate(userProfile.joinDate)}
                    disabled
                    className="mt-1 block w-full rounded-md border-transparent bg-gray-100 shadow-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700"
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
                  } transition duration-300 ease-in-out`}
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
          </div>
        </div>
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
    </div>
  );
};

export default UserProfilePage;

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

// const UserProfilePage = () => {
//   const [userProfile, setUserProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [editedFields, setEditedFields] = useState({
//     firstName: "",
//     lastName: "",
//     bio: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [submitStatus, setSubmitStatus] = useState(null);
//   const [submitLoading, setSubmitLoading] = useState(false);

//   const token = useSelector((state) => state.auth.token);

//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   const fetchUserProfile = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/users/my-profile",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const data = response.data;
//       console.log(data);

//       setUserProfile(data.user);
//       setEditedFields({
//         firstName: data.user.firstName || "",
//         lastName: data.user.lastName || "",
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
//         "http://localhost:5000/api/users/update-profile",
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
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
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
//     <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white shadow-xl rounded-lg overflow-hidden">
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
//                     value={editing ? editedFields.firstName : userProfile.firstName}
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
//                     value={editing ? editedFields.lastName : userProfile.lastName}
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
//       </div>
//     </div>
//   );
// };

// export default UserProfilePage;
