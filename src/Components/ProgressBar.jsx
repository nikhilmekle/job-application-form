const ProgressBar = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-6">
      {/* Progress bar background */}
      <div className="w-full bg-gray-200 h-2 rounded-full">
        {/* Filled portion */}
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Percentage text */}
      <div className="text-right text-sm mt-1 font-medium">
        {Math.floor(progressPercentage)}%
      </div>
    </div>
  );
};

export default ProgressBar;
