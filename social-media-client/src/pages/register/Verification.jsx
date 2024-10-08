import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Modal from "react-modal";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

function VerificationCode({ isOpen, onRequestClose, onSuccess }) {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleVerification = async (data) => {
    setLoading(true);
    setServerError("");

    const verificationCode = Object.values(data).join("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/verify-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: verificationCode }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Verification failed");
      }

      navigate("/login");
      onSuccess();
      onRequestClose();
    } catch (error) {
      setServerError(error.message);
      setError("verificationCode", { type: "manual", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyUp = (e, index) => {
    if (e.key !== "Backspace" && index < 5) {
      const nextInput = document.getElementById(`verificationCode${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Verification Modal"
      className="modal-content fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      overlayClassName="modal-overlay"
    >
      <div className="p-4 bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Enter Verification Code</h2>
        <p className="mb-4 text-gray-600">
          We've sent a 6-digit verification code to your email. Please enter it
          below.
        </p>

        {loading && (
          <div className="flex justify-center mb-4">
            <FaSpinner className="animate-spin text-skyBlue-600 h-8 w-8" />
          </div>
        )}

        <form onSubmit={handleSubmit(handleVerification)}>
          <div className="flex justify-between mb-4">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <Controller
                key={index}
                name={`verificationCode${index}`}
                control={control}
                defaultValue=""
                rules={{ required: true, pattern: /^[0-9]$/ }}
                render={({ field }) => (
                  <input
                    {...field}
                    id={`verificationCode${index}`}
                    type="text"
                    maxLength={1}
                    className="w-12 h-12 text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-skyBlue-500 focus:border-skyBlue-500 text-lg"
                    onKeyUp={(e) => handleKeyUp(e, index)}
                  />
                )}
              />
            ))}
          </div>

          {errors.verificationCode && (
            <p className="mt-2 text-sm text-red-600">
              Please enter a valid 6-digit code
            </p>
          )}

          {serverError && (
            <p className="mt-2 text-sm text-red-600">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-skyBlue-600 hover:bg-skyBlue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-skyBlue-500"
          >
            {loading ? "Verifying..." : "Submit Code"}
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default VerificationCode;
