// src/components/Header.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, Home, Settings } from 'react-feather';
import '../styles/Header.css'; 

const Header = () => {
  const { cart } = useCart();
  const location = useLocation();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/" className="logo-link">
              <h1>🛒 Shopping Cart</h1>
            </Link>
          </div>

          <nav className="nav">
            <ul className="nav-list">
              <li className="nav-item">
                <Link 
                  to="/" 
                  className={`nav-link ${isActive('/') ? 'active' : ''}`}
                >
                  <Home size={20} />
                  <span>Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/cart" 
                  className={`nav-link ${isActive('/cart') ? 'active' : ''}`}
                >
                  <div className="cart-icon-container">
                    <ShoppingCart size={20} />
                    {totalItems > 0 && (
                      <span className="cart-badge">{totalItems}</span>
                    )}
                  </div>
                  <span>Cart</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/admin" 
                  className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
                >
                  <Settings size={20} />
                  <span>Admin</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
