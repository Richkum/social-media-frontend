import React from "react";
import { FaEnvelope } from "react-icons/fa";

const EmailEntry = ({ register, errors }) => (
  <>
    <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
    <p className="mb-4 text-gray-600">
      Enter your email address to reset your password.
    </p>
    <div className="mb-4">
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Email Address
      </label>
      <div className="relative">
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-skyBlue-500 focus:border-skyBlue-500 sm:text-sm pl-10"
          placeholder="Enter your email"
        />
        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      {errors.email && (
        <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
      )}
    </div>
  </>
);

export default EmailEntry;
