import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/App.css'; // Import global styles
import App from './App'; // Import your main App component
import { CartProvider } from './contexts/CartContext';
// Create the root element and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>
    <App />
    </CartProvider>
  </React.StrictMode>
);