import React from 'react';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import { ShoppingBag } from 'react-feather';

const Cart = () => {
  const { cart, isLoading } = useCart();

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <div className="cart-page fade-in">
      <div className="container">
        <h2 className="cart-title">Your Shopping Cart</h2>
        {cart.length > 0 ? (
          <div className="cart-container">
            <div className="cart-items">
              {cart.map((product) => (
                <CartItem key={product._id} product={product} />
              ))}
            </div>
            <CartSummary />
          </div>
        ) : (
          <div className="empty-state">
            <ShoppingBag size={64} color="var(--light-text)" />
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <a href="/" className="btn">
              Continue Shopping
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
