import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import VerificationCode from "./Verification";

const RegistrationPage = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    if (!data.agreeTerms) {
      setShowPopup(true);
      return;
    }

    setLoading(true);
    setServerError("");

    try {
      // Combine date of birth fields into a single string
      const dateOfBirth = `${data.birthYear}-${data.birthMonth.padStart(
        2,
        "0"
      )}-${data.birthDay.padStart(2, "0")}`;

      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          dateOfBirth,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      } else {
        openModal();
      }
    } catch (error) {
      setServerError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* First Name */}
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
                      required: "First name is required",
                      minLength: {
                        value: 2,
                        message:
                          "First name must be at least 2 characters long",
                      },
                      maxLength: {
                        value: 15,
                        message: "First name must not exceed 15 characters",
                      },
                    })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-skyBlue-500 focus:border-skyBlue-500 sm:text-sm"
                  />
                  {errors.firstName && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Last Name */}
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
                      required: "Last name is required",
                      minLength: {
                        value: 2,
                        message: "Last name must be at least 2 characters long",
                      },
                      maxLength: {
                        value: 15,
                        message: "Last name must not exceed 15 characters",
                      },
                    })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-skyBlue-500 focus:border-skyBlue-500 sm:text-sm"
                  />
                  {errors.lastName && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
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
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Please enter a valid email address",
                      },
                    })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-skyBlue-500 focus:border-skyBlue-500 sm:text-sm"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Password */}
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
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                      },
                    })}
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
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <div className="mt-2 space-y-2">
                  {["Male", "Female", "Other"].map((gender) => (
                    <div key={gender} className="flex items-center">
                      <input
                        id={gender}
                        type="radio"
                        value={gender}
                        {...register("gender", {
                          required: "Please select a gender",
                        })}
                        className="focus:ring-skyBlue-500 h-4 w-4 text-skyBlue-600 border-gray-300"
                      />
                      <label
                        htmlFor={gender}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {gender}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.gender && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <div className="mt-1 grid grid-cols-3 gap-3">
                  <Controller
                    name="birthMonth"
                    control={control}
                    rules={{ required: "Month is required" }}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-skyBlue-500 focus:border-skyBlue-500 sm:text-sm"
                      >
                        <option value="">Month</option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                          (month) => (
                            <option
                              key={month}
                              value={month.toString().padStart(2, "0")}
                            >
                              {month}
                            </option>
                          )
                        )}
                      </select>
                    )}
                  />
                  <Controller
                    name="birthDay"
                    control={control}
                    rules={{ required: "Day is required" }}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-skyBlue-500 focus:border-skyBlue-500 sm:text-sm"
                      >
                        <option value="">Day</option>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(
                          (day) => (
                            <option
                              key={day}
                              value={day.toString().padStart(2, "0")}
                            >
                              {day}
                            </option>
                          )
                        )}
                      </select>
                    )}
                  />
                  {/* <Controller
                    name="birthYear"
                    control={control}
                    rules={{ required: "Year is required" }}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-skyBlue-500 focus:border-skyBlue-500 sm:text-sm"
                      >
                        <option value="">Year</option>
                        {Array.from(
                          { length: 100 },
                          (_, i) => new Date().getFullYear() - i
                        ).map((year) => (
                          <option key={year} value={year.toString()}>
                            {year}
                          </option>
                        ))}
                      </select>
                    )}
                  /> */}
                  <Controller
                    name="birthYear"
                    control={control}
                    rules={{ required: "Year is required" }}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-skyBlue-500 focus:border-skyBlue-500 sm:text-sm"
                      >
                        <option value="">Year</option>
                        {Array.from(
                          { length: 2008 - 1900 + 1 },
                          (_, i) => 2008 - i
                        ).map((year) => (
                          <option key={year} value={year.toString()}>
                            {year}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>
                {(errors.birthMonth || errors.birthDay || errors.birthYear) && (
                  <p className="mt-2 text-sm text-red-600">
                    Please enter your full date of birth
                  </p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-center">
                <input
                  id="agreeTerms"
                  type="checkbox"
                  {...register("agreeTerms")}
                  className="h-4 w-4 text-skyBlue-600 focus:ring-skyBlue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="agreeTerms"
                  className="ml-2 block text-sm text-gray-900"
                >
                  I agree to the{" "}
                  <Link
                    to={"/terms-and-conditions"}
                    className="text-skyBlue-600 hover:text-skyBlue-700"
                  >
                    Terms and Conditions
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={!isValid || loading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-skyBlue-600 hover:bg-skyBlue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-skyBlue-500 ${
                    (!isValid || loading) && "opacity-50 cursor-not-allowed"
                  }`}
                >
                  {loading ? (
                    <FaSpinner className="animate-spin text-white h-5 w-5" />
                  ) : (
                    "Next"
                  )}
                </button>
              </div>

              {/* Server Error Message */}
              {serverError && (
                <p className="mt-2 text-sm text-red-600 text-center">
                  {serverError}
                </p>
              )}

              <p className="font-semibold text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-skyBlue-600 hover:text-skyBlue-700"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>

        {showPopup && (
          <div
            className="fixed z-10 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
              ></div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title"
                      >
                        Terms and Conditions
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Please agree to the terms and conditions to continue.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-skyBlue-600 text-base font-medium text-white hover:bg-skyBlue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-skyBlue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setShowPopup(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {isModalOpen && (
        <VerificationCode
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          onSuccess={() => {
            navigate("/login");
          }}
        />
      )}
    </>
  );
};

export default RegistrationPage;
