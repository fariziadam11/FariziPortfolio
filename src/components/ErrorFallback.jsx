import React from 'react';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert" className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-center p-4">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
      <pre className="text-gray-600 dark:text-gray-300 mb-6 max-w-md overflow-x-auto">
        {error.message}
      </pre>
      <button 
        onClick={resetErrorBoundary}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorFallback;