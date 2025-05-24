import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-container">
      <h2>Error</h2>
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn">
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage; 