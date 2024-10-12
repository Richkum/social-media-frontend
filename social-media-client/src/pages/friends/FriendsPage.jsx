// import React from "react";
// import { Link } from "react-router-dom";

// function FriendsPage() {
//   return (
//     <>
//       <div className="flex flex-col items-center justify-center h-screen">
//         <h1 className="text-center font-bold">
//           Please This page is under construction
//         </h1>
//         <p className="text-lg text-center ">
//           Thank you! You may kindly go back to your feeds 👇
//         </p>
//         <Link to={"/home"}>
//           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//             {" "}
//             Feeds
//           </button>
//         </Link>
//       </div>
//     </>
//   );
// }

// export default FriendsPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUser, FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";
import SideBar from "../../components/sideBar/SideBar";

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userId = useSelector((state) => state.auth.user._id);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/follow/${userId}/friends`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFriends(response.data);
        console.log(response.data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching friends:", err);
        setError("Failed to fetch friends. Please try again later.");
        setLoading(false);
      }
    };

    fetchFriends();
  }, [userId, token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <FaSpinner className="animate-spin text-blue-500 text-4xl" />
      </div>
    );
  }

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
            <h1 className="text-xl font-semibold text-gray-800">
              Your Friends
            </h1>
          </div>
        </header>
        <main className="p-4">
          {friends.length === 0 ? (
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <p className="text-xl text-gray-700">
                You haven't connected with anyone yet.
              </p>
              <p className="mt-2 text-gray-600">
                Start following people to build your network and make new
                friends!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {friends.map((friend) => (
                <Link
                  key={friend._id}
                  to={`/user-profile/${friend._id}`}
                  className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
                >
                  <div className="p-4">
                    <div className="flex items-center">
                      {friend.profilePicture ? (
                        <img
                          src={friend.profilePicture}
                          alt={`${friend.firstName} ${friend.lastName}`}
                          className="w-16 h-16 rounded-full mr-4 border-2 border-blue-500"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                          <FaUser className="text-gray-400 text-2xl" />
                        </div>
                      )}
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                          {friend.firstName} {friend.lastName}
                        </h2>
                        <p className="text-sm text-gray-600">
                          @{friend.firstName.toLowerCase()}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default FriendsPage;
