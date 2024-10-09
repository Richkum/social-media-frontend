import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import EmailEntry from "../../components/resetPassword/EmailEntry";
import VerificationCodeEntry from "../../components/resetPassword/VCodeEntry";
import NewPasswordEntry from "../../components/resetPassword/NewPassEntry";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const ResetPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [email, setEmail] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
  } = useForm();

  const watchPassword = watch("newPassword", "");
  const watchConfirmPassword = watch("confirmPassword", "");

  useEffect(() => {
    const passwordsMatch = watchPassword === watchConfirmPassword;
    if (watchPassword && watchConfirmPassword && !passwordsMatch) {
      setServerMessage("Passwords do not match");
    } else {
      setServerMessage("");
    }
  }, [watchPassword, watchConfirmPassword]);

  const onSubmit = async (data) => {
    setLoading(true);
    setServerMessage("");

    try {
      let response;
      switch (step) {
        case 1:
          response = await axios.post(`${API_URL}/forgot-password`, {
            email: data.email,
          });
          if (response.data.success) {
            setEmail(data.email);
            setStep(2);
          }
          break;
        case 2:
          const verificationCode = Object.values(data)
            .filter((value) => typeof value === "string")
            .join("");
          response = await axios.post(`${API_URL}/verify-verification-code`, {
            email,
            verificationCode,
          });
          if (response.data.success) {
            setStep(3);
          }
          break;
        case 3:
          response = await axios.post(`${API_URL}/reset-password`, {
            email,
            newPassword: data.newPassword,
            confirmPassword: data.confirmPassword,
          });
          if (response.data.success) {
            setServerMessage(
              "Password reset successfully. You can now log in with your new password."
            );
            navigate("/login");
          }
          break;
      }
    } catch (error) {
      setServerMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <EmailEntry register={register} errors={errors} />;
      case 2:
        return <VerificationCodeEntry control={control} errors={errors} />;
      case 3:
        return (
          <NewPasswordEntry
            register={register}
            errors={errors}
            watch={watch}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset Your Password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {loading ? (
              <div className="flex justify-center mb-4">
                <FaSpinner className="animate-spin text-skyBlue-600 h-8 w-8" />
              </div>
            ) : (
              renderStep()
            )}
            {serverMessage && (
              <p
                className={`mt-4 text-center ${
                  serverMessage.includes("successfully")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {serverMessage}
              </p>
            )}
            <div>
              <button
                type="submit"
                disabled={
                  loading ||
                  (step === 3 && watchPassword !== watchConfirmPassword)
                }
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-skyBlue-600 hover:bg-skyBlue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-skyBlue-500 ${
                  loading ||
                  (step === 3 && watchPassword !== watchConfirmPassword)
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {step === 3 ? "Reset Password" : "Next"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
