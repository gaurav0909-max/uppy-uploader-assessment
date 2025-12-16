import React from 'react';
import PropTypes from 'prop-types';
import { formatBytes } from '../../utils/formatBytes';

/**
 * FileCard component to display individual file information
 * @param {Object} props - Component props
 * @param {Object} props.file - File object with metadata
 * @param {Function} props.onRemove - Callback to remove file
 * @param {Function} props.onRetry - Callback to retry upload
 */
const FileCard = ({ file, onRemove, onRetry }) => {
  const getStatusIcon = () => {
    switch (file.status) {
      case 'success':
        return (
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'uploading':
        return (
          <svg className="w-5 h-5 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const getStatusText = () => {
    switch (file.status) {
      case 'success':
        return <span className="text-green-600 font-medium">Uploaded</span>;
      case 'error':
        return <span className="text-red-600 font-medium">Failed</span>;
      case 'uploading':
        return <span className="text-blue-600 font-medium">Uploading {file.progress}%</span>;
      default:
        return <span className="text-gray-600">Pending</span>;
    }
  };

  return (
    <div className={`
      border rounded-lg p-4 bg-white shadow-sm transition-all duration-300
      ${file.status === 'success' ? 'border-green-200 bg-green-50' : ''}
      ${file.status === 'error' ? 'border-red-200 bg-red-50' : ''}
      ${file.status === 'uploading' ? 'border-blue-200 bg-blue-50' : ''}
    `}>
      <div className="flex items-start space-x-4">
        {/* Thumbnail */}
        <div className="flex-shrink-0">
          {file.thumbnail ? (
            <img
              src={file.thumbnail}
              alt={file.name}
              className="w-16 h-16 object-cover rounded-lg shadow-sm"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

        {/* File Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {file.name}
              </p>
              <p className="text-xs text-gray-500">
                {formatBytes(file.size)}
              </p>
            </div>
            <div className="flex items-center space-x-2 ml-2">
              {getStatusIcon()}
            </div>
          </div>

          {/* Status Text */}
          <div className="mb-2">
            {getStatusText()}
          </div>

          {/* Progress Bar (only show when uploading) */}
          {file.status === 'uploading' && (
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${file.progress}%` }}
              />
            </div>
          )}

          {/* Error Message */}
          {file.status === 'error' && file.error && (
            <p className="text-xs text-red-600 mb-2">
              {file.error}
            </p>
          )}

          {/* Cloudinary URL (on success) */}
          {file.status === 'success' && file.uploadURL && (
            <div className="mt-2">
              <a
                href={file.uploadURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800 underline break-all"
              >
                View on Cloudinary
              </a>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2 mt-2">
            {file.status === 'error' && (
              <button
                onClick={() => onRetry(file.id)}
                className="px-3 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
              >
                Retry
              </button>
            )}
            {file.status !== 'uploading' && (
              <button
                onClick={() => onRemove(file.id)}
                className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

FileCard.propTypes = {
  file: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
    status: PropTypes.oneOf(['pending', 'uploading', 'success', 'error']).isRequired,
    progress: PropTypes.number,
    thumbnail: PropTypes.string,
    uploadURL: PropTypes.string,
    error: PropTypes.string,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default FileCard;
