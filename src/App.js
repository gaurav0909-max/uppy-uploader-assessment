import React from 'react';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import DropZone from './components/DropZone/DropZone';
import FileQueue from './components/FileQueue/FileQueue';
import ActionButtons from './components/ActionButtons/ActionButtons';
import OverallProgress from './components/ProgressBar/OverallProgress';
import useUppy from './hooks/useUppy';
import useFileProgress from './hooks/useFileProgress';

function App() {
  const { uppy, files, uploadAll, cancelAll, retryAll, clearCompleted } = useUppy();
  const { overallProgress, completedFiles } = useFileProgress(files);

  const isUploading = files.some((f) => f.status === 'uploading');

  const handleRemoveFile = (fileId) => {
    if (uppy) {
      uppy.removeFile(fileId);
    }
  };

  const handleRetryFile = (fileId) => {
    if (uppy) {
      uppy.retryUpload(fileId);
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Image Uploader
            </h1>
            <p className="text-lg text-gray-600">
              Upload your images to Cloudinary with drag and drop
            </p>
          </header>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            {/* Drop Zone */}
            <DropZone uppy={uppy} disabled={isUploading} />

            {/* Overall Progress */}
            {isUploading && files.length > 0 && (
              <div className="mt-6">
                <OverallProgress
                  totalProgress={overallProgress}
                  filesCount={files.length}
                  completedCount={completedFiles}
                />
              </div>
            )}

            {/* Action Buttons */}
            <ActionButtons
              onUpload={uploadAll}
              onCancel={cancelAll}
              onRetry={retryAll}
              onClear={clearCompleted}
              files={files}
              isUploading={isUploading}
            />

            {/* File Queue */}
            <FileQueue
              files={files}
              onRemove={handleRemoveFile}
              onRetry={handleRetryFile}
            />
          </div>

          {/* Footer */}
          <footer className="text-center text-sm text-gray-500">
            <p>
              Powered by{' '}
              <a
                href="https://uppy.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 underline"
              >
                Uppy
              </a>{' '}
              and{' '}
              <a
                href="https://cloudinary.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 underline"
              >
                Cloudinary
              </a>
            </p>
          </footer>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
