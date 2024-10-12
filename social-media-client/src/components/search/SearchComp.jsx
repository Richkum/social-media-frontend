import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUser, FaSearch } from "react-icons/fa";
import axios from "axios";
import { XIcon, UserIcon } from "@heroicons/react/outline";

function SearchComp({ isSearchOpen, setIsSearchOpen }) {
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const [searchHistory, setSearchHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");
  // const [isSearchOpen, setIsSearchOpen] = useState(false);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

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
          setSearchMessage(error.message || "No results found");
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

  return (
    <>
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
    </>
  );
}

export default SearchComp;
