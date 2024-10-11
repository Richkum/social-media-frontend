import React from "react";

const LogoutModal = ({ onConfirm, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
        <h2 className=" text-xl mb-4 font-bold">
          Are you sure you want to logout?
        </h2>
        <div className="flex justify-around mt-6">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
            onClick={onConfirm}
          >
            logout
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
            onClick={onClose}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
