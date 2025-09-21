import React from "react";

const Step1PersonalDetails = ({
  formData,
  setFormData,
  errors,
  setErrors,
  nextStep,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      alert("File too large! Max allowed is 2 MB.");
      e.target.value = null;
      return;
    }
    setFormData({ ...formData, resume: file });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone must be 10 digits";

    if (!formData.resume) {
      newErrors.resume = "Resume is required";
    } else if (formData.resume.size > 2 * 1024 * 1024) {
      const fileSizeMB = (formData.resume.size / 1024 / 1024).toFixed(2);
      newErrors.resume = `Resume size is ${fileSizeMB} MB. Max allowed is 2 MB`;
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
      className="space-y-6 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 transition-colors"
    >
      <div>
        <label className="block mb-1 font-medium text-gray-900 dark:text-gray-100">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-900 dark:text-gray-100">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
        />
        {errors.email && (
          <p className="text-red-500 dark:text-red-400 text-sm">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-900 dark:text-gray-100">
          Phone
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-900 dark:text-gray-100">
          Resume
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
          accept=".pdf,.doc,.docx"
        />
        {formData.resume && (
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
            {formData.resume.name}
          </p>
        )}
        {errors.resume && (
          <p className="text-red-500 text-sm">{errors.resume}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Step1PersonalDetails;
