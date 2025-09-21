import React from "react";
import toast from "react-hot-toast";

const Step3PreviewSubmit = ({ formData, prevStep }) => {
  const handleSubmit = () => {
    console.log("Form Submitted:", formData);
    toast.success("Form submitted successfully!");
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow space-y-4 transition-colors duration-300">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Preview Your Details
      </h2>

      <div className="text-gray-900 dark:text-gray-100">
        <p>
          <strong>Name:</strong> {formData.name}
        </p>
        <p>
          <strong>Email:</strong> {formData.email}
        </p>
        <p>
          <strong>Phone:</strong> {formData.phone}
        </p>
        <p>
          <strong>Resume:</strong> {formData.resume?.name}
        </p>
      </div>

      <div className="text-gray-900 dark:text-gray-100">
        <p>
          <strong>Job Role:</strong> {formData.role}
        </p>
        {formData.role === "Frontend Developer" && (
          <p>
            <strong>Tech Stack:</strong> {formData.techStack}
          </p>
        )}
        {formData.role === "Backend Developer" && (
          <p>
            <strong>Preferred Language:</strong> {formData.preferredLanguage}
          </p>
        )}
        {formData.role === "Designer" && (
          <p>
            <strong>Portfolio URL:</strong> {formData.portfolioUrl}
          </p>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          className="bg-gray-400 dark:bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 dark:hover:bg-gray-500 transition-colors duration-300"
        >
          Back
        </button>

        <button
          onClick={handleSubmit}
          className="bg-green-600 dark:bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 dark:hover:bg-green-600 transition-colors duration-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Step3PreviewSubmit;
