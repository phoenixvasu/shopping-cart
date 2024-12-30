// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // For navigation
import { useCart } from '../contexts/CartContext'; // Access cart context to display cart items count
import '../styles/Header.css'; 

const Header = () => {
  const { cart } = useCart(); // Access the cart from the context

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <h1>🛒 Shopping Cart</h1> {/* Logo with an icon */}
        </Link>
      </div>

      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link> {/* Link to homepage */}
          </li>
          <li>
            <Link to="/cart">
              Cart <span className="cart-count">({cart.length})</span> {/* Link to cart page with styled count */}
            </Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link> {/* Link to admin page */}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
