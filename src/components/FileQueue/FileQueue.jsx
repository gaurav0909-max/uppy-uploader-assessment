import React from 'react';
import PropTypes from 'prop-types';
import FileCard from './FileCard';

/**
 * FileQueue component to display list of uploaded files
 * @param {Object} props - Component props
 * @param {Array} props.files - Array of file objects
 * @param {Function} props.onRemove - Callback to remove a file
 * @param {Function} props.onRetry - Callback to retry upload
 */
const FileQueue = ({ files, onRemove, onRetry }) => {
  if (!files || files.length === 0) {
    return null;
  }

  // Calculate status counts
  const statusCounts = files.reduce((acc, file) => {
    acc[file.status] = (acc[file.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Files ({files.length})
        </h3>
        <div className="flex space-x-3 text-sm">
          {statusCounts.success > 0 && (
            <span className="text-green-600 font-medium">
              ✓ {statusCounts.success} uploaded
            </span>
          )}
          {statusCounts.uploading > 0 && (
            <span className="text-blue-600 font-medium">
              ↻ {statusCounts.uploading} uploading
            </span>
          )}
          {statusCounts.error > 0 && (
            <span className="text-red-600 font-medium">
              ✗ {statusCounts.error} failed
            </span>
          )}
        </div>
      </div>
      <div className="space-y-3">
        {files.map((file) => (
          <FileCard
            key={file.id}
            file={file}
            onRemove={onRemove}
            onRetry={onRetry}
          />
        ))}
      </div>
    </div>
  );
};

FileQueue.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default FileQueue;
