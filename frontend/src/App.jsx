import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext'; // Import CartProvider to wrap the app with the context
import Header from './components/Header'; // Import Header component
import Footer from './components/Footer'; // Import Footer component
import ProductList from './components/ProductList'; // Import ProductList to show products
import Cart from './pages/Cart'; // Import Cart page to show cart items
import Home from './pages/Home'; // Import Home page for the main view
import Admin from './pages/Admin';
import './styles/App.css'; // Import global styles

const App = () => {
  return (
    <CartProvider>
      <Router>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
        <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
