import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/App.css'; // Import global styles
import App from './App'; // Import your main App component
import { ProductProvider } from './contexts/ProductContext';
import { CartProvider } from './contexts/CartContext';
// Create the root element and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProductProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductProvider>
  </React.StrictMode>
);