/**
 * Validates a file against size and type restrictions
 *
 * @param {File} file - The file to validate
 * @param {Object} options - Validation options
 * @param {number} options.maxSize - Maximum file size in bytes (default: 10MB)
 * @param {Array<string>} options.allowedTypes - Allowed MIME types (default: image/*)
 * @returns {Object} Validation result
 * @returns {boolean} return.isValid - Whether the file is valid
 * @returns {string} return.error - Error message if invalid
 *
 * @example
 * const result = validateFile(file, { maxSize: 10485760, allowedTypes: ['image/jpeg', 'image/png'] });
 * if (!result.isValid) {
 *   console.error(result.error);
 * }
 */
export const validateFile = (file, options = {}) => {
  const {
    maxSize = 10 * 1024 * 1024, // 10MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  } = options;

  // Check if file exists
  if (!file) {
    return {
      isValid: false,
      error: 'No file provided',
    };
  }

  // Check file size
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: `File size exceeds ${(maxSize / (1024 * 1024)).toFixed(0)}MB limit`,
    };
  }

  // Check file type
  if (!isImageFile(file)) {
    return {
      isValid: false,
      error: 'Only image files are allowed',
    };
  }

  // Check specific MIME types if provided
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `File type ${file.type} is not allowed`,
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

/**
 * Checks if a file is an image based on MIME type
 *
 * @param {File} file - The file to check
 * @returns {boolean} True if file is an image
 *
 * @example
 * if (isImageFile(file)) {
 *   console.log('File is an image');
 * }
 */
export const isImageFile = (file) => {
  if (!file || !file.type) {
    return false;
  }
  return file.type.startsWith('image/');
};

/**
 * Validates multiple files at once
 *
 * @param {Array<File>} files - Array of files to validate
 * @param {Object} options - Validation options
 * @returns {Object} Validation results
 * @returns {Array<File>} return.validFiles - Array of valid files
 * @returns {Array<Object>} return.invalidFiles - Array of invalid files with errors
 *
 * @example
 * const { validFiles, invalidFiles } = validateFiles(files);
 * console.log(`${validFiles.length} valid, ${invalidFiles.length} invalid`);
 */
export const validateFiles = (files, options = {}) => {
  const validFiles = [];
  const invalidFiles = [];

  files.forEach((file) => {
    const result = validateFile(file, options);
    if (result.isValid) {
      validFiles.push(file);
    } else {
      invalidFiles.push({ file, error: result.error });
    }
  });

  return { validFiles, invalidFiles };
};
