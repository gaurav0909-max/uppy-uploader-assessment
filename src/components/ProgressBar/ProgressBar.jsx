import React from 'react';
import PropTypes from 'prop-types';

/**
 * ProgressBar component for individual file upload progress
 * @param {Object} props - Component props
 * @param {number} props.progress - Progress percentage (0-100)
 * @param {string} props.fileName - Name of the file being uploaded
 */
const ProgressBar = ({ progress, fileName }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{fileName}</span>
        <span className="text-sm font-medium text-gray-700">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-primary-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  fileName: PropTypes.string.isRequired,
};

export default ProgressBar;
