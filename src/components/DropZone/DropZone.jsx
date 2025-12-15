import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * DropZone component for drag-and-drop file upload
 * @param {Object} props - Component props
 * @param {Function} props.onFilesAdded - Callback when files are added
 */
const DropZone = ({ onFilesAdded }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    // TODO: Implement file handling
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragging
          ? 'border-primary-500 bg-primary-50'
          : 'border-gray-300 hover:border-primary-400'
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <p className="text-gray-600">
        Drag and drop images here, or click to browse
      </p>
    </div>
  );
};

DropZone.propTypes = {
  onFilesAdded: PropTypes.func.isRequired,
};

export default DropZone;
