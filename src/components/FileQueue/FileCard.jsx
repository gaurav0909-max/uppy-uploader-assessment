import React from 'react';
import PropTypes from 'prop-types';

/**
 * FileCard component to display individual file information
 * @param {Object} props - Component props
 * @param {Object} props.file - File object with metadata
 * @param {Function} props.onRemove - Callback to remove file
 * @param {Function} props.onRetry - Callback to retry upload
 * @param {string} props.thumbnail - Thumbnail URL
 */
const FileCard = ({ file, onRemove, onRetry, thumbnail }) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {thumbnail && (
            <img
              src={thumbnail}
              alt={file.name}
              className="w-12 h-12 object-cover rounded"
            />
          )}
          <div>
            <p className="font-medium text-gray-900">{file.name}</p>
            <p className="text-sm text-gray-500">
              {file.size ? `${(file.size / 1024).toFixed(2)} KB` : 'Unknown size'}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onRemove(file.id)}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Remove
          </button>
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
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onRetry: PropTypes.func.isRequired,
  thumbnail: PropTypes.string,
};

FileCard.defaultProps = {
  thumbnail: null,
};

export default FileCard;
