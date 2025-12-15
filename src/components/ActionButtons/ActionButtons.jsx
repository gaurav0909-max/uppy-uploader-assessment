import React from 'react';
import PropTypes from 'prop-types';

/**
 * ActionButtons component for upload controls
 * @param {Object} props - Component props
 * @param {Function} props.onUpload - Callback to start upload
 * @param {Function} props.onCancel - Callback to cancel upload
 * @param {Function} props.onRetry - Callback to retry failed uploads
 * @param {Function} props.onClear - Callback to clear completed uploads
 * @param {boolean} props.disabled - Whether buttons are disabled
 * @param {boolean} props.hasFiles - Whether there are files in queue
 */
const ActionButtons = ({
  onUpload,
  onCancel,
  onRetry,
  onClear,
  disabled,
  hasFiles,
}) => {
  return (
    <div className="flex space-x-3 mt-4">
      <button
        onClick={onUpload}
        disabled={disabled || !hasFiles}
        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        Upload All
      </button>
      <button
        onClick={onCancel}
        disabled={!hasFiles}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
      >
        Cancel
      </button>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
      >
        Retry Failed
      </button>
      <button
        onClick={onClear}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        Clear Completed
      </button>
    </div>
  );
};

ActionButtons.propTypes = {
  onUpload: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onRetry: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  hasFiles: PropTypes.bool,
};

ActionButtons.defaultProps = {
  disabled: false,
  hasFiles: false,
};

export default ActionButtons;
