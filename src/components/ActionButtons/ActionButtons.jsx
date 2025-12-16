import React from 'react';
import PropTypes from 'prop-types';

/**
 * ActionButtons component for upload controls
 * @param {Object} props - Component props
 * @param {Function} props.onUpload - Callback to start upload
 * @param {Function} props.onCancel - Callback to cancel upload
 * @param {Function} props.onRetry - Callback to retry failed uploads
 * @param {Function} props.onClear - Callback to clear completed uploads
 * @param {Array} props.files - Array of file objects to determine state
 * @param {boolean} props.isUploading - Whether files are currently uploading
 */
const ActionButtons = ({
  onUpload,
  onCancel,
  onRetry,
  onClear,
  files = [],
  isUploading = false,
}) => {
  const hasPendingFiles = files.some(f => f.status === 'pending');
  const hasFailedFiles = files.some(f => f.status === 'error');
  const hasCompletedFiles = files.some(f => f.status === 'success');
  const hasFiles = files.length > 0;

  if (!hasFiles) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      {/* Upload All Button */}
      {hasPendingFiles && !isUploading && (
        <button
          onClick={onUpload}
          className="px-6 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 active:bg-primary-800 transition-colors shadow-sm"
        >
          <span className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span>Upload All</span>
          </span>
        </button>
      )}

      {/* Cancel Button (only show when uploading) */}
      {isUploading && (
        <button
          onClick={onCancel}
          className="px-6 py-2.5 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 active:bg-gray-800 transition-colors shadow-sm"
        >
          <span className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Cancel Upload</span>
          </span>
        </button>
      )}

      {/* Retry Failed Button */}
      {hasFailedFiles && (
        <button
          onClick={onRetry}
          className="px-6 py-2.5 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 active:bg-yellow-700 transition-colors shadow-sm"
        >
          <span className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Retry Failed</span>
          </span>
        </button>
      )}

      {/* Clear Completed Button */}
      {hasCompletedFiles && (
        <button
          onClick={onClear}
          className="px-6 py-2.5 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 active:bg-red-700 transition-colors shadow-sm"
        >
          <span className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Clear Completed</span>
          </span>
        </button>
      )}
    </div>
  );
};

ActionButtons.propTypes = {
  onUpload: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onRetry: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  files: PropTypes.array,
  isUploading: PropTypes.bool,
};

export default ActionButtons;
