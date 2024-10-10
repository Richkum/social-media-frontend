import React from "react";
import { Link } from "react-router-dom";

function FriendsPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-center font-bold">
          Please This page is under construction
        </h1>
        <p className="text-lg text-center ">
          Thank you! You may kindly go back to your feeds 👇
        </p>
        <Link to={"/home"}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            {" "}
            Feeds
          </button>
        </Link>
      </div>
    </>
  );
}

export default FriendsPage;
