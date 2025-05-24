import React from 'react';
import '../styles/App.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner; 