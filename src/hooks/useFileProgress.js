import { useState, useEffect } from 'react';

/**
 * Custom hook to track file upload progress
 *
 * Monitors individual file progress and calculates overall upload progress
 * across all files in the queue.
 *
 * @param {Array} files - Array of file objects from Uppy
 * @returns {Object} Progress tracking data
 * @returns {Object} return.progress - Per-file progress (fileId: percentage)
 * @returns {number} return.overallProgress - Overall progress percentage (0-100)
 * @returns {number} return.completedFiles - Number of completed uploads
 * @returns {number} return.failedFiles - Number of failed uploads
 * @returns {string} return.uploadSpeed - Current upload speed (formatted)
 * @returns {string} return.timeRemaining - Estimated time remaining (formatted)
 *
 * @example
 * const { progress, overallProgress, completedFiles } = useFileProgress(files);
 */
const useFileProgress = (files = []) => {
  const [progress, setProgress] = useState({});
  const [overallProgress, setOverallProgress] = useState(0);
  const [completedFiles, setCompletedFiles] = useState(0);
  const [failedFiles, setFailedFiles] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState('0 KB/s');
  const [timeRemaining, setTimeRemaining] = useState('--:--');

  useEffect(() => {
    if (!files || files.length === 0) {
      setProgress({});
      setOverallProgress(0);
      setCompletedFiles(0);
      setFailedFiles(0);
      setUploadSpeed('0 KB/s');
      setTimeRemaining('--:--');
      return;
    }

    // Calculate per-file progress
    const progressMap = {};
    let totalProgress = 0;
    let completed = 0;
    let failed = 0;

    files.forEach((file) => {
      progressMap[file.id] = file.progress || 0;
      totalProgress += file.progress || 0;

      if (file.status === 'success') {
        completed++;
      } else if (file.status === 'error') {
        failed++;
      }
    });

    setProgress(progressMap);
    setCompletedFiles(completed);
    setFailedFiles(failed);

    // Calculate overall progress
    const overall = files.length > 0 ? Math.round(totalProgress / files.length) : 0;
    setOverallProgress(overall);

    // Calculate upload speed and time remaining (simplified)
    // In a real implementation, you would track bytes uploaded over time
    const uploadingFiles = files.filter((f) => f.status === 'uploading');
    if (uploadingFiles.length > 0) {
      // Simplified calculation - in production, track actual bytes/time
      const avgProgress = uploadingFiles.reduce((sum, f) => sum + (f.progress || 0), 0) / uploadingFiles.length;

      // Estimate remaining time based on average progress
      if (avgProgress > 0 && avgProgress < 100) {
        const estimatedSeconds = Math.round((100 - avgProgress) * 2); // Rough estimate
        const mins = Math.floor(estimatedSeconds / 60);
        const secs = estimatedSeconds % 60;
        setTimeRemaining(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
      } else {
        setTimeRemaining('--:--');
      }
    } else {
      setTimeRemaining('--:--');
      setUploadSpeed('0 KB/s');
    }
  }, [files]);

  return {
    progress,
    overallProgress,
    completedFiles,
    failedFiles,
    uploadSpeed,
    timeRemaining,
  };
};

export default useFileProgress;
