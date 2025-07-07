import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingCart, Home, Heart } from 'react-feather';
import { useWishlist } from '../contexts/WishlistContext';

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const { wishlist } = useWishlist();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="logo-container">
            <span className="logo-icon">🛒</span>
            <span className="logo-text">
              <span className="logo-nex">Nex</span>
              <span className="logo-cart">Cart</span>
            </span>
          </div>
        </Link>

        <div className="navbar-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          
          <Link 
            to="/cart" 
            className={`nav-link cart-link ${location.pathname === '/cart' ? 'active' : ''}`}
          >
            <ShoppingCart size={20} />
            <span>Cart</span>
            {cartItemsCount > 0 && (
              <span className="cart-badge">{cartItemsCount}</span>
            )}
          </Link>

          {user && user.role === 'admin' && (
          <Link 
            to="/admin" 
            className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
          >
            Admin
          </Link>
          )}

          {user && (
            <Link 
              to="/wishlist" 
              className={`nav-link wishlist-link ${location.pathname === '/wishlist' ? 'active' : ''}`}
            >
              <Heart size={20} />
              <span>Wishlist</span>
              {wishlist.length > 0 && (
                <span className="wishlist-badge">{wishlist.length}</span>
              )}
            </Link>
          )}

          {!user ? (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/orders" className="nav-link">Orders</Link>
              <span className="nav-user">{user.name}{user.role === 'admin' && <span className="admin-badge">Admin</span>}</span>
              <button className="nav-link logout-btn" onClick={logout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 