import React from "react";
import { FaEye, FaEyeSlash, FaExclamationCircle } from "react-icons/fa";

const NewPasswordEntry = ({
  register,
  errors,
  watch,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  passwordsMatch,
}) => {
  const watchPassword = watch("newPassword", "");
  const watchConfirmPassword = watch("confirmPassword", "");

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Set New Password</h2>
      <p className="mb-4 text-gray-600">Please enter your new password.</p>
      <div className="mb-4">
        <label
          htmlFor="newPassword"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          New Password
        </label>
        <div className="relative">
          <input
            id="newPassword"
            type={showPassword ? "text" : "password"}
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-skyBlue-500 focus:border-skyBlue-500 sm:text-sm pr-10"
            placeholder="Enter new password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEyeSlash className="text-gray-400" />
            ) : (
              <FaEye className="text-gray-400" />
            )}
          </button>
        </div>
        {errors.newPassword && (
          <p className="mt-2 text-sm text-red-600">
            {errors.newPassword.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Confirm New Password
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (val) => {
                if (watchPassword !== val) {
                  return "Your passwords do not match";
                }
              },
            })}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-skyBlue-500 focus:border-skyBlue-500 sm:text-sm pr-10"
            placeholder="Confirm new password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <FaEyeSlash className="text-gray-400" />
            ) : (
              <FaEye className="text-gray-400" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-2 text-sm text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      {!passwordsMatch && (
        <div className="mb-4 flex items-center text-red-500">
          <FaExclamationCircle className="mr-2" />
          <span>Passwords do not match</span>
        </div>
      )}
    </>
  );
};

export default NewPasswordEntry;
