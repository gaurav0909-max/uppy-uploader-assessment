import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * DropZone component for drag-and-drop file upload
 * @param {Object} props - Component props
 * @param {Object} props.uppy - Uppy instance
 * @param {boolean} props.disabled - Whether the dropzone is disabled
 */
const DropZone = ({ uppy, disabled = false }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const dragCounter = useRef(0);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;

    if (disabled || !uppy) return;

    const { files } = e.dataTransfer;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        try {
          uppy.addFile({
            name: file.name,
            type: file.type,
            data: file,
            source: 'Local',
          });
        } catch (error) {
          console.error('Error adding file:', error);
        }
      });
    }
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInput = (e) => {
    if (disabled || !uppy) return;

    const { files } = e.target;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        try {
          uppy.addFile({
            name: file.name,
            type: file.type,
            data: file,
            source: 'Local',
          });
        } catch (error) {
          console.error('Error adding file:', error);
        }
      });
    }

    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  return (
    <div
      className={`
        border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300
        ${isDragging
          ? 'border-primary-500 bg-primary-50 scale-105'
          : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
        disabled={disabled}
      />

      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Upload Icon */}
        <svg
          className={`w-16 h-16 ${isDragging ? 'text-primary-500' : 'text-gray-400'} transition-colors`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>

        {/* Text */}
        <div className="space-y-2">
          <p className="text-lg font-medium text-gray-700">
            {isDragging ? 'Drop images here' : 'Drag and drop images here'}
          </p>
          <p className="text-sm text-gray-500">
            or click to browse from your device
          </p>
          <p className="text-xs text-gray-400">
            Supports: JPG, PNG, GIF, WEBP (Max 10MB each)
          </p>
        </div>

        {/* Mobile Upload Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          disabled={disabled}
          className="
            md:hidden px-6 py-3 bg-primary-600 text-white rounded-lg
            hover:bg-primary-700 active:bg-primary-800
            disabled:bg-gray-300 disabled:cursor-not-allowed
            transition-colors font-medium
          "
        >
          Upload from Gallery
        </button>
      </div>
    </div>
  );
};

DropZone.propTypes = {
  uppy: PropTypes.object,
  disabled: PropTypes.bool,
};

export default DropZone;
