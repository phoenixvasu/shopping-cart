import React from 'react';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import { ShoppingBag, CreditCard } from 'react-feather';

const CartSummary = () => {
  const { getTotalItems, getTotalPrice } = useCart();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <div className="cart-summary">
      <h3>Order Summary</h3>
      <div className="summary-row">
        <span>Items ({totalItems}):</span>
        <span>{formatCurrency(totalPrice)}</span>
      </div>
      <div className="summary-row">
        <span>Shipping:</span>
        <span>Free</span>
      </div>
      <div className="summary-row total">
        <span>Total:</span>
        <span>{formatCurrency(totalPrice)}</span>
      </div>
      <button className="checkout-btn" disabled={totalItems === 0}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummary;
