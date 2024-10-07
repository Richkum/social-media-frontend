import React from "react";

const EmailInput = ({ register, errors }) => {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Email address
      </label>
      <div className="mt-1">
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email", {
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-skyBlue-500 focus:border-skyBlue-500 sm:text-sm"
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-600">
            Please enter a valid email address
          </p>
        )}
      </div>
    </div>
  );
};

export default EmailInput;
