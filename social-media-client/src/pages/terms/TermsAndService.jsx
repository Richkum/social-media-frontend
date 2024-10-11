// import React from "react";

// const TermsAndConditions = () => {
//   const todaysDate = new Date();
//   const year = todaysDate.getFullYear();

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
//         <h1 className="text-3xl font-bold text-gray-900 mb-6">
//           Terms and Conditions
//         </h1>

//         <p className="text-gray-700 mb-4">
//           Welcome to YouGram! These Terms and Conditions outline the rules and
//           regulations for the use of YouGram's services.
//         </p>

//         <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
//           1. Acceptance of Terms
//         </h2>
//         <p className="text-gray-700 mb-4">
//           By accessing or using our services, you agree to comply with these
//           Terms and Conditions. If you do not agree, please do not use our
//           services.
//         </p>

//         <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
//           2. Changes to Terms
//         </h2>
//         <p className="text-gray-700 mb-4">
//           We reserve the right to modify these Terms at any time. Changes will
//           be effective immediately upon posting on our platform. Your continued
//           use constitutes acceptance of the modified Terms.
//         </p>

//         <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
//           3. User Accounts
//         </h2>
//         <p className="text-gray-700 mb-4">
//           To access certain features, you may need to create an account. You are
//           responsible for maintaining the confidentiality of your account
//           information and for all activities that occur under your account.
//         </p>

//         <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
//           4. User Content
//         </h2>
//         <p className="text-gray-700 mb-4">
//           You are responsible for all content you post on YouGram. By posting
//           content, you grant YouGram a non-exclusive, royalty-free, worldwide
//           license to use, modify, reproduce, and distribute your content.
//         </p>

//         <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
//           5. Prohibited Activities
//         </h2>
//         <p className="text-gray-700 mb-4">
//           You agree not to engage in any of the following prohibited activities:
//         </p>
//         <ul className="list-disc list-inside text-gray-700 mb-4">
//           <li>Posting false or misleading information.</li>
//           <li>Harassing or threatening other users.</li>
//           <li>Using automated systems to access our services.</li>
//           <li>
//             Violating any{" "}
//             <a
//               href="#"
//               className="text-blue-500 hover:text-blue-700 hover:font-bold"
//             >
//               {" "}
//               applicable laws
//             </a>{" "}
//             or regulations.
//           </li>
//         </ul>

//         <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
//           6. Intellectual Property
//         </h2>
//         <p className="text-gray-700 mb-4">
//           YouGram and its original content, features, and functionality are
//           owned by YouGram and are protected by international copyright,
//           trademark, patent, trade secret, and other intellectual property or
//           proprietary rights laws.
//         </p>

//         <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
//           7. Limitation of Liability
//         </h2>
//         <p className="text-gray-700 mb-4">
//           In no event shall YouGram be liable for any indirect, incidental,
//           special, consequential, or punitive damages arising from your use of
//           the service.
//         </p>

//         <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
//           8. Governing Law
//         </h2>
//         <p className="text-gray-700 mb-4">
//           These Terms shall be governed by and construed in accordance with the
//           laws of the jurisdiction in which YouGram operates, without regard to
//           its conflict of law principles.
//         </p>

//         <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
//           9. Contact Information
//         </h2>
//         <p className="text-gray-700 mb-4">
//           If you have any questions about these Terms and Conditions, please
//           contact us at <span className="font-bold"> support@yougram.com</span>.
//         </p>

//         <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
//           10. Effective Date
//         </h2>
//         <p className="text-gray-700 mb-4">
//           These Terms are effective as of{" "}
//           <span className="font-bold"> {new Date().toLocaleDateString()}</span>.
//         </p>

//         <p className="text-gray-700 mb-4">
//           Thank you for being a part of YouGram!
//         </p>
//       </div>
//     </div>
//   );
// };

// export default TermsAndConditions;

import React, { useState } from "react";

const Modal = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`fixed left-0 top-0 w-1/3 h-full bg-white p-6 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Applicable Laws</h2>
        <ul className="list-disc list-inside mb-4">
          <li>No user shall post content that violates copyright laws.</li>
          <li>All users must adhere to community guidelines.</li>
          <li>Users are responsible for their interactions with others.</li>
          <li>
            Any form of harassment or discrimination is strictly prohibited.
          </li>
          <li>Users must comply with data protection and privacy laws.</li>
        </ul>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const TermsAndConditions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const todaysDate = new Date();
  const year = todaysDate.getFullYear();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Terms and Conditions
        </h1>

        <p className="text-gray-700 mb-4">
          Welcome to YouGram! These Terms and Conditions outline the rules and
          regulations for the use of YouGram's services.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
          1. Acceptance of Terms
        </h2>
        <p className="text-gray-700 mb-4">
          By accessing or using our services, you agree to comply with these
          Terms and Conditions. If you do not agree, please do not use our
          services.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
          2. Changes to Terms
        </h2>
        <p className="text-gray-700 mb-4">
          We reserve the right to modify these Terms at any time. Changes will
          be effective immediately upon posting on our platform. Your continued
          use constitutes acceptance of the modified Terms.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
          3. User Accounts
        </h2>
        <p className="text-gray-700 mb-4">
          To access certain features, you may need to create an account. You are
          responsible for maintaining the confidentiality of your account
          information and for all activities that occur under your account.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
          4. User Content
        </h2>
        <p className="text-gray-700 mb-4">
          You are responsible for all content you post on YouGram. By posting
          content, you grant YouGram a non-exclusive, royalty-free, worldwide
          license to use, modify, reproduce, and distribute your content.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
          5. Prohibited Activities
        </h2>
        <p className="text-gray-700 mb-4">
          You agree not to engage in any of the following prohibited activities:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Posting false or misleading information.</li>
          <li>Harassing or threatening other users.</li>
          <li>Using automated systems to access our services.</li>
          <li>
            Violating any{" "}
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-blue-500 hover:text-blue-700 hover:font-bold focus:outline-none"
            >
              applicable laws
            </button>{" "}
            or regulations.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
          6. Intellectual Property
        </h2>
        <p className="text-gray-700 mb-4">
          YouGram and its original content, features, and functionality are
          owned by YouGram and are protected by international copyright,
          trademark, patent, trade secret, and other intellectual property or
          proprietary rights laws.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
          7. Limitation of Liability
        </h2>
        <p className="text-gray-700 mb-4">
          In no event shall YouGram be liable for any indirect, incidental,
          special, consequential, or punitive damages arising from your use of
          the service.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
          8. Governing Law
        </h2>
        <p className="text-gray-700 mb-4">
          These Terms shall be governed by and construed in accordance with the
          laws of the jurisdiction in which YouGram operates, without regard to
          its conflict of law principles.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
          9. Contact Information
        </h2>
        <p className="text-gray-700 mb-4">
          If you have any questions about these Terms and Conditions, please
          contact us at <span className="font-bold"> support@yougram.com</span>.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
          10. Effective Date
        </h2>
        <p className="text-gray-700 mb-4">
          These Terms are effective as of{" "}
          <span className="font-bold"> {todaysDate.toLocaleDateString()}</span>.
        </p>

        <p className="text-gray-700 mb-4">
          Thank you for being a part of YouGram!
        </p>
      </div>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default TermsAndConditions;
