import React from "react";
import { Controller } from "react-hook-form";

const VerificationCodeEntry = ({ control, errors }) => (
  <>
    <h2 className="text-2xl font-bold mb-4">Enter Verification Code</h2>
    <p className="mb-4 text-gray-600">
      We've sent a 6-digit verification code to your email. Please enter it
      below.
    </p>
    <div className="mb-4">
      <label
        htmlFor="verificationCode"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Verification Code
      </label>
      <div className="flex justify-between">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <Controller
            key={index}
            name={`verificationCode${index}`}
            control={control}
            rules={{ required: true, pattern: /^[0-9]$/ }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-skyBlue-500 focus:border-skyBlue-500 text-lg"
                onKeyUp={(e) => {
                  if (e.key !== "Backspace" && index < 5) {
                    const nextInput = document.getElementById(
                      `verificationCode${index + 1}`
                    );
                    if (nextInput) nextInput.focus();
                  }
                }}
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
    </div>
  </>
);

export default VerificationCodeEntry;

// import React, { useEffect } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";

// interface VerificationModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (code: string) => void;
//   title: string;
//   message: string;
// }

// const VerificationModal: React.FC<VerificationModalProps> = ({
//   isOpen,
//   onClose,
//   onSubmit,
//   title,
//   message,
// }) => {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     watch,
//   } = useForm({
//     defaultValues: {
//       verificationCode: ["", "", "", "", "", ""],
//     },
//   });

//   const verificationCode = watch("verificationCode");

//   useEffect(() => {
//     if (verificationCode.every((digit) => digit !== "")) {
//       handleSubmit(onFormSubmit)();
//     }
//   }, [verificationCode, handleSubmit]);

//   const onFormSubmit = (data: { verificationCode: string[] }) => {
//     const code = data.verificationCode.join("");
//     onSubmit(code);
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>{title}</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit(onFormSubmit)}>
//           <p className="mb-4 text-gray-600">{message}</p>
//           <div className="mb-4">
//             <div className="flex justify-between">
//               {[0, 1, 2, 3, 4, 5].map((index) => (
//                 <Controller
//                   key={index}
//                   name={`verificationCode.${index}`}
//                   control={control}
//                   rules={{ required: true, pattern: /^[0-9]$/ }}
//                   render={({ field }) => (
//                     <input
//                       {...field}
//                       type="text"
//                       maxLength={1}
//                       className="w-12 h-12 text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-skyBlue-500 focus:border-skyBlue-500 text-lg"
//                       onKeyUp={(e) => {
//                         if (e.key !== "Backspace" && index < 5 && field.value) {
//                           const nextInput = document.getElementById(
//                             `verificationCode.${index + 1}`
//                           );
//                           if (nextInput) nextInput.focus();
//                         } else if (e.key === "Backspace" && index > 0 && !field.value) {
//                           const prevInput = document.getElementById(
//                             `verificationCode.${index - 1}`
//                           );
//                           if (prevInput) prevInput.focus();
//                         }
//                       }}
//                       onChange={(e) => {
//                         const value = e.target.value;
//                         if (value.match(/^[0-9]$/)) {
//                           setValue(`verificationCode.${index}`, value);
//                         } else {
//                           setValue(`verificationCode.${index}`, "");
//                         }
//                       }}
//                     />
//                   )}
//                 />
//               ))}
//             </div>
//             {errors.verificationCode && (
//               <p className="mt-2 text-sm text-red-600">
//                 Please enter a valid 6-digit code
//               </p>
//             )}
//           </div>
//           <div className="flex justify-end space-x-2">
//             <Button type="button" variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button type="submit">Verify</Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default VerificationModal;
