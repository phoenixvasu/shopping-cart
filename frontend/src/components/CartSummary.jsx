import React from 'react';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../utils/formatCurrency';

const CartSummary = () => {
  const { cart } = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-summary">
      <h3>Cart Summary</h3>
      <div className="summary-details">
        <p>Total Items: <strong>{cart.length}</strong></p>
        <p>Total Price: <strong>{formatCurrency(totalPrice)}</strong></p>
      </div>
      <button className="checkout-btn">Proceed to Checkout</button>
    </div>
  );
};

export default CartSummary;
