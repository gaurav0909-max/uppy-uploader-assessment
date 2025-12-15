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

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Files ({files.length})</h3>
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
