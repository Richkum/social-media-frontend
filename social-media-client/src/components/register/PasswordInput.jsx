import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ register, errors, showPassword, setShowPassword }) => {
  return (
    <div>
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700"
      >
        Password
      </label>
      <div className="mt-1 relative">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          {...register("password", { required: true, minLength: 8 })}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-skyBlue-500 focus:border-skyBlue-500 sm:text-sm"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {errors.password && (
        <p className="mt-2 text-sm text-red-600">
          Password must be at least 8 characters long
        </p>
      )}
    </div>
  );
};

export default PasswordInput;
