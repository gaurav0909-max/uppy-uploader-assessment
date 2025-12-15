/**
 * Formats bytes into a human-readable string
 *
 * Converts a byte value into KB, MB, GB, or TB with appropriate decimal places.
 *
 * @param {number} bytes - The number of bytes to format
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted string (e.g., "1.5 MB", "500 KB")
 *
 * @example
 * formatBytes(1024); // "1.00 KB"
 * formatBytes(1536000); // "1.46 MB"
 * formatBytes(1536000, 0); // "1 MB"
 */
export const formatBytes = (bytes, decimals = 2) => {
  if (!bytes || bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

/**
 * Formats upload speed in bytes per second to a readable format
 *
 * @param {number} bytesPerSecond - Upload speed in bytes per second
 * @returns {string} Formatted speed (e.g., "1.5 MB/s")
 *
 * @example
 * formatSpeed(1536000); // "1.46 MB/s"
 */
export const formatSpeed = (bytesPerSecond) => {
  return `${formatBytes(bytesPerSecond)}/s`;
};

/**
 * Formats time in seconds to MM:SS format
 *
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time (e.g., "02:30")
 *
 * @example
 * formatTime(150); // "02:30"
 * formatTime(65); // "01:05"
 */
export const formatTime = (seconds) => {
  if (!seconds || seconds < 0 || !isFinite(seconds)) {
    return '--:--';
  }

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Calculates estimated time remaining for upload
 *
 * @param {number} bytesUploaded - Bytes already uploaded
 * @param {number} totalBytes - Total bytes to upload
 * @param {number} uploadSpeed - Current upload speed in bytes per second
 * @returns {string} Formatted time remaining
 *
 * @example
 * calculateTimeRemaining(512000, 1536000, 256000); // "00:04"
 */
export const calculateTimeRemaining = (bytesUploaded, totalBytes, uploadSpeed) => {
  if (!uploadSpeed || uploadSpeed === 0) {
    return '--:--';
  }

  const remainingBytes = totalBytes - bytesUploaded;
  const secondsRemaining = remainingBytes / uploadSpeed;

  return formatTime(secondsRemaining);
};
