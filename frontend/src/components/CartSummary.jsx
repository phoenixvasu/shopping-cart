import React from 'react';
import { useCart } from '../contexts/CartContext';
import { CreditCard } from 'react-feather';
import { useNavigate } from 'react-router-dom';

const CartSummary = () => {
  const { getTotalItems, getTotalPrice } = useCart();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (totalItems > 0) {
      navigate('/checkout');
    }
  };

  return (
    <div className="cart-summary">
      <h3>Order Summary</h3>
      <div className="summary-row">
        <span>Items ({totalItems}):</span>
        <span className="price">{totalPrice.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>Shipping:</span>
        <span className="price">Free</span>
      </div>
      <div className="summary-total">
        <span>Total:</span>
        <span className="price">{totalPrice.toFixed(2)}</span>
      </div>
      <button 
        className="checkout-btn" 
        disabled={totalItems === 0}
        onClick={handleCheckout}
      >
        <CreditCard size={20} style={{ marginRight: '8px' }} />
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummary;
