import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProgressBar from "./ProgressBar";
import Step1PersonalDetails from "./Step1PersonalDetails";
import Step2JobPreferences from "./Step2JobPreferences";

import Step3PreviewSubmit from "./Step3PreviewSubmit";

const JobApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  //Dark mode
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  //    form data
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("jobFormData");
    return saved
      ? JSON.parse(saved)
      : {
          name: "",
          email: "",
          phone: "",
          resume: null,
          role: "",
          techStack: "",
          preferredLanguage: "",
          portfolioUrl: "",
        };
  });

  useEffect(() => {
    const dataToStore = { ...formData, resume: formData.resume?.name || null };
    localStorage.setItem("jobFormData", JSON.stringify(dataToStore));
  }, [formData]);

  return (
    <div className={darkMode ? " dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
        <div className="flex justify-end p-4">
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
        <div className="max-w-3xl mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
            Job Application Form
          </h1>

          {/*prograss bar */}
          <ProgressBar currentStep={currentStep} totalSteps={3} />
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              {currentStep === 1 && (
                <Step1PersonalDetails
                  formData={formData}
                  setFormData={setFormData}
                  errors={errors}
                  setErrors={setErrors}
                  nextStep={nextStep}
                />
              )}

              {currentStep === 2 && (
                <Step2JobPreferences
                  formData={formData}
                  setFormData={setFormData}
                  errors={errors}
                  setErrors={setErrors}
                  nextStep={nextStep}
                  prevStep={prevStep}
                />
              )}

              {currentStep === 3 && (
                <Step3PreviewSubmit formData={formData} prevStep={prevStep} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationForm;
