// import React from "react";
// import { useFormContext } from "react-hook-form";

// const GenderSelect = () => {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();

//   return (
//     <div>
//       <label className="block text-sm font-medium text-gray-700">Gender</label>
//       <div className="mt-2 space-y-2">
//         {["Male", "Female", "Other"].map((gender) => (
//           <div key={gender} className="flex items-center">
//             {/* <input
//               id={gender}
//               type="radio"
//               value={gender}
//               {...register("gender", { required: true })}
//               className="focus:ring-skyBlue-500 h-4 w-4 text-skyBlue-600 border-gray-300"
//             /> */}
//             <input
//               id={gender}
//               type="radio"
//               value={gender}
//               {...register("gender", { required: true })}
//               className={`focus:ring-skyBlue-500 h-4 w-4 text-skyBlue-600 border-gray-300 ${
//                 errors.gender ? "border-red-500" : ""
//               }`}
//               aria-invalid={errors.gender ? "true" : "false"}
//             />

//             <label
//               htmlFor={gender}
//               className="ml-3 block text-sm font-medium text-gray-700"
//             >
//               {gender}
//             </label>
//           </div>
//         ))}
//       </div>
//       {errors.gender && (
//         <p className="mt-2 text-sm text-red-600">Please select a gender</p>
//       )}
//     </div>
//   );
// };

// export default GenderSelect;

// import React from "react";
// import { useFormContext } from "react-hook-form";

// const GenderSelect = () => {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();

//   return (
//     <div>
//       <label className="block text-sm font-medium text-gray-700">Gender</label>
//       <div className="mt-2 space-y-2">
//         {["Male", "Female", "Other"].map((gender) => (
//           <div key={gender} className="flex items-center">
//             <input
//               id={gender}
//               type="radio"
//               value={gender}
//               {...register("gender", { required: true })}
//               className={`focus:ring-skyBlue-500 h-4 w-4 text-skyBlue-600 border-gray-300 ${
//                 errors.gender ? "border-red-500" : ""
//               }`}
//               aria-invalid={errors.gender ? "true" : "false"}
//             />
//             <label
//               htmlFor={gender}
//               className="ml-3 block text-sm font-medium text-gray-700"
//             >
//               {gender}
//             </label>
//           </div>
//         ))}
//       </div>
//       {errors.gender && (
//         <p className="mt-2 text-sm text-red-600">Please select a gender</p>
//       )}
//     </div>
//   );
// };

// export default GenderSelect;
