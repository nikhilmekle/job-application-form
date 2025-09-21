import React, { useState, useEffect } from "react";
const mockJobs = [
  { id: 1, role: "Frontend Developer", fields: ["techStack"] },
  { id: 2, role: "Backend Developer", fields: ["preferredLanguage"] },
  { id: 3, role: "Designer", fields: ["portfolioUrl"] },
];
const Step2JobPreferences = ({
  formData,
  setFormData,
  errors,
  setErrors,
  nextStep,
  prevStep,
}) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setJobs(mockJobs);
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.role) newErrors.role = "Role is required";

    const selectedJob = jobs.find((job) => job.role === formData.role);
    if (selectedJob) {
      selectedJob.fields.forEach((field) => {
        if (!formData[field]?.trim()) newErrors[field] = `${field} is required`;
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validate()) nextStep();
  };
  return (
    <form
      onSubmit={handleNext}
      className="space-y-6 p-4 bg-white dark:bg-gray-800 rounded shadow text-gray-900 dark:text-gray-100"
    >
      <div>
        <label className="block mb-1 font-medium text-gray-900 dark:text-gray-100">
          Job Role
        </label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="">Select Role</option>
          {jobs.map((job) => (
            <option key={job.id} value={job.role}>
              {job.role}
            </option>
          ))}
        </select>
        {errors.role && (
          <p className="text-red-500 dark:text-red-400 text-sm">
            {errors.role}
          </p>
        )}
      </div>
      {/* Dynamic Fields */}
      {formData.role &&
        jobs
          .find((job) => job.role === formData.role)
          ?.fields.map((field) => (
            <div key={field}>
              <label className="block mb-1 font-medium text-gray-900 dark:text-gray-100">
                {field}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors[field] && (
                <p className="text-red-500 dark:text-red-400 text-sm">
                  {errors[field]}
                </p>
              )}
            </div>
          ))}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-400 dark:bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 dark:hover:bg-gray-500"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Step2JobPreferences;
