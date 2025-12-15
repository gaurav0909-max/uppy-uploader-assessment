import React from 'react';
import PropTypes from 'prop-types';

/**
 * OverallProgress component for aggregate upload progress
 * @param {Object} props - Component props
 * @param {number} props.totalProgress - Overall progress percentage (0-100)
 * @param {number} props.filesCount - Total number of files
 * @param {number} props.completedCount - Number of completed files
 */
const OverallProgress = ({ totalProgress, filesCount, completedCount }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-900">Overall Progress</h3>
        <span className="text-sm text-gray-600">
          {completedCount} / {filesCount} files
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-green-600 h-3 rounded-full transition-all duration-300"
          style={{ width: `${totalProgress}%` }}
        />
      </div>
      <p className="text-sm text-gray-600 mt-2 text-center">{totalProgress}%</p>
    </div>
  );
};

OverallProgress.propTypes = {
  totalProgress: PropTypes.number.isRequired,
  filesCount: PropTypes.number.isRequired,
  completedCount: PropTypes.number.isRequired,
};

export default OverallProgress;
