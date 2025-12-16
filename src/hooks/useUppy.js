import { useState, useEffect, useCallback } from 'react';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import ThumbnailGenerator from '@uppy/thumbnail-generator';
import { getCloudinaryConfig } from '../utils/cloudinaryConfig';
import { validateFile } from '../utils/fileValidation';

/**
 * Custom hook to manage Uppy instance and file uploads
 *
 * This hook initializes and manages an Uppy instance with Cloudinary integration.
 * It handles file state, upload progress, and provides methods to control uploads.
 *
 * @returns {Object} Uppy instance, files array, and control methods
 * @returns {Object} return.uppy - Uppy instance
 * @returns {Array} return.files - Array of file objects with metadata
 * @returns {Function} return.uploadAll - Start uploading all files
 * @returns {Function} return.cancelAll - Cancel all uploads
 * @returns {Function} return.retryAll - Retry failed uploads
 * @returns {Function} return.clearCompleted - Clear completed uploads from queue
 *
 * @example
 * const { uppy, files, uploadAll, cancelAll } = useUppy();
 */
const useUppy = () => {
  const [uppy, setUppy] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Get Cloudinary configuration
    const cloudinaryConfig = getCloudinaryConfig();

    // Initialize Uppy with restrictions
    const uppyInstance = new Uppy({
      id: 'uppy',
      autoProceed: false,
      allowMultipleUploadBatches: true,
      restrictions: {
        maxFileSize: 10 * 1024 * 1024, // 10MB
        maxNumberOfFiles: 10,
        minNumberOfFiles: 1,
        allowedFileTypes: ['image/*'],
      },
      meta: {
        upload_preset: cloudinaryConfig.uploadPreset,
        folder: cloudinaryConfig.folder,
      },
      onBeforeFileAdded: (currentFile) => {
        // Validate file before adding
        const validation = validateFile(currentFile.data);
        if (!validation.isValid) {
          uppyInstance.info(validation.error, 'error', 5000);
          return false;
        }
        return true;
      },
    });

    // Configure XHRUpload for Cloudinary
    uppyInstance.use(XHRUpload, {
      endpoint: cloudinaryConfig.uploadUrl,
      method: 'POST',
      formData: true,
      fieldName: 'file',
      // Send upload_preset and folder as form fields
      allowedMetaFields: ['upload_preset', 'folder'],
      limit: 3, // Concurrent uploads
      timeout: 120000, // 2 minutes
      getResponseData: (responseText) => {
        try {
          const response = JSON.parse(responseText);
          return {
            uploadURL: response.secure_url,
            url: response.secure_url,
            publicId: response.public_id,
          };
        } catch (error) {
          return { error: 'Failed to parse response' };
        }
      },
    });

    // Add ThumbnailGenerator plugin
    uppyInstance.use(ThumbnailGenerator, {
      id: 'ThumbnailGenerator',
      thumbnailWidth: 200,
      thumbnailHeight: 200,
      thumbnailType: 'image/jpeg',
      waitForThumbnailsBeforeUpload: false,
    });

    // Subscribe to Uppy events
    uppyInstance.on('file-added', (file) => {
      setFiles((prevFiles) => [
        ...prevFiles,
        {
          id: file.id,
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'pending',
          progress: 0,
          thumbnail: null,
          uploadURL: null,
          error: null,
        },
      ]);
    });

    uppyInstance.on('file-removed', (file) => {
      setFiles((prevFiles) => prevFiles.filter((f) => f.id !== file.id));
    });

    uppyInstance.on('thumbnail:generated', (file, preview) => {
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.id === file.id ? { ...f, thumbnail: preview } : f
        )
      );
    });

    uppyInstance.on('upload-start', () => {
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.status === 'pending' ? { ...f, status: 'uploading' } : f
        )
      );
    });

    uppyInstance.on('upload-progress', (file, progress) => {
      const percentage = Math.round((progress.bytesUploaded / progress.bytesTotal) * 100);
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.id === file.id
            ? { ...f, progress: percentage, status: 'uploading' }
            : f
        )
      );
    });

    uppyInstance.on('upload-success', (file, response) => {
      const uploadURL = response.body?.secure_url || response.uploadURL;
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.id === file.id
            ? { ...f, status: 'success', progress: 100, uploadURL }
            : f
        )
      );
    });

    uppyInstance.on('upload-error', (file, error, response) => {
      const xhr = response?.request;
      const actualResponse = xhr?.responseText;

      let errorMessage = 'Upload failed';
      if (actualResponse) {
        try {
          const parsed = JSON.parse(actualResponse);
          errorMessage = parsed?.error?.message || errorMessage;
        } catch (e) {
          errorMessage = actualResponse || errorMessage;
        }
      } else {
        errorMessage = response?.body?.error?.message || error.message || errorMessage;
      }

      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.id === file.id
            ? { ...f, status: 'error', error: errorMessage }
            : f
        )
      );
    });

    uppyInstance.on('complete', () => {
      // Upload complete
    });

    setUppy(uppyInstance);

    // Cleanup on unmount
    return () => {
      if (uppyInstance) {
        uppyInstance.cancelAll();
        uppyInstance.clear();
      }
    };
  }, []);

  const uploadAll = useCallback(() => {
    if (uppy) {
      uppy.upload().catch(() => {
        // Error handled by upload-error event
      });
    }
  }, [uppy]);

  const cancelAll = useCallback(() => {
    if (uppy) {
      uppy.cancelAll();
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.status === 'uploading' ? { ...f, status: 'pending', progress: 0 } : f
        )
      );
    }
  }, [uppy]);

  const retryAll = useCallback(() => {
    if (uppy) {
      const failedFiles = files.filter((f) => f.status === 'error');
      failedFiles.forEach((file) => {
        uppy.retryUpload(file.id);
      });
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.status === 'error' ? { ...f, status: 'pending', error: null } : f
        )
      );
    }
  }, [uppy, files]);

  const clearCompleted = useCallback(() => {
    if (uppy) {
      const completedFiles = files.filter((f) => f.status === 'success');
      completedFiles.forEach((file) => {
        uppy.removeFile(file.id);
      });
      setFiles((prevFiles) => prevFiles.filter((f) => f.status !== 'success'));
    }
  }, [uppy, files]);

  return {
    uppy,
    files,
    uploadAll,
    cancelAll,
    retryAll,
    clearCompleted,
  };
};

export default useUppy;
