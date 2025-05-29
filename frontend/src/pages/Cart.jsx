import React from 'react';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import { ShoppingBag } from 'react-feather';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, isLoading, getTotalItems } = useCart();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="cart-page fade-in">
      <div className="container">
        <h2 className="cart-title">Your Shopping Cart</h2>
        {getTotalItems() > 0 ? (
          <div className="cart-container">
            <div className="cart-items">
              {cart.map((item) => (
                <CartItem 
                  key={item.product._id} 
                  item={item} 
                />
              ))}
            </div>
            <CartSummary />
          </div>
        ) : (
          <div className="empty-state">
            <ShoppingBag size={64} color="var(--light-text)" />
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/" className="btn">
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
