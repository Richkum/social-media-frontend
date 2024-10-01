import React from "react";
import { Controller } from "react-hook-form";

const DateOfBirthInput = ({ control, errors }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Date of Birth
      </label>
      <div className="mt-1 grid grid-cols-3 gap-3">
        <Controller
          name="birthMonth"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <select
              {...field}
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-skyBlue-500 focus:border-skyBlue-500 sm:text-sm"
            >
              <option value="">Month</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          )}
        />
        <Controller
          name="birthDay"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <select
              {...field}
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-skyBlue-500 focus:border-skyBlue-500 sm:text-sm"
            >
              <option value="">Day</option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          )}
        />
        <Controller
          name="birthYear"
          control={control}
          rules={{ required: true }}
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
                <option key={year} value={year}>
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
  );
};

export default DateOfBirthInput;
