// Get Cloudinary config from environment variables
export const getCloudinaryConfig = () => {
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
  const folder = process.env.REACT_APP_CLOUDINARY_FOLDER || '';

  // Validate required environment variables
  if (!cloudName) {
    throw new Error(
      'REACT_APP_CLOUDINARY_CLOUD_NAME is not defined in environment variables'
    );
  }

  if (!uploadPreset) {
    throw new Error(
      'REACT_APP_CLOUDINARY_UPLOAD_PRESET is not defined in environment variables'
    );
  }

  // Construct upload URL
  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  return {
    cloudName,
    uploadPreset,
    folder,
    uploadUrl,
  };
};

/**
 * Validates Cloudinary configuration
 *
 * @returns {Object} Validation result
 * @returns {boolean} return.isValid - Whether configuration is valid
 * @returns {Array<string>} return.errors - Array of error messages
 *
 * @example
 * const { isValid, errors } = validateCloudinaryConfig();
 * if (!isValid) {
 *   console.error('Cloudinary config errors:', errors);
 * }
 */
export const validateCloudinaryConfig = () => {
  const errors = [];

  if (!process.env.REACT_APP_CLOUDINARY_CLOUD_NAME) {
    errors.push('Missing REACT_APP_CLOUDINARY_CLOUD_NAME');
  }

  if (!process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET) {
    errors.push('Missing REACT_APP_CLOUDINARY_UPLOAD_PRESET');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Builds form data for Cloudinary upload
 *
 * @param {File} file - File to upload
 * @param {Object} options - Additional upload options
 * @returns {FormData} FormData object ready for upload
 *
 * @example
 * const formData = buildUploadFormData(file, { tags: 'profile,avatar' });
 */
export const buildUploadFormData = (file, options = {}) => {
  const config = getCloudinaryConfig();
  const formData = new FormData();

  formData.append('file', file);
  formData.append('upload_preset', config.uploadPreset);

  if (config.folder) {
    formData.append('folder', config.folder);
  }

  // Add optional parameters
  if (options.tags) {
    formData.append('tags', options.tags);
  }

  if (options.context) {
    formData.append('context', options.context);
  }

  return formData;
};
