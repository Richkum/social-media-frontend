import React from "react";

const NameInput = ({ register, errors }) => {
  return (
    <>
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700"
        >
          First Name
        </label>
        <div className="mt-1">
          <input
            id="firstName"
            type="text"
            {...register("firstName", {
              required: true,
              minLength: 2,
              maxLength: 15,
            })}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-skyBlue-500 focus:border-skyBlue-500 sm:text-sm"
          />
          {errors.firstName && (
            <p className="mt-2 text-sm text-red-600">
              First name must be 2-15 characters long
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700"
        >
          Last Name
        </label>
        <div className="mt-1">
          <input
            id="lastName"
            type="text"
            {...register("lastName", {
              required: true,
              minLength: 2,
              maxLength: 15,
            })}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-skyBlue-500 focus:border-skyBlue-500 sm:text-sm"
          />
          {errors.lastName && (
            <p className="mt-2 text-sm text-red-600">
              Last name must be 2-15 characters long
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default NameInput;
