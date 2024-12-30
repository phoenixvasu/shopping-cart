// src/components/CartSummary.jsx
import React from 'react';
import { useCart } from '../contexts/CartContext'; // Access cart context
import { formatCurrency } from '../utils/formatCurrency'; // Utility to format price into currency

const CartSummary = () => {
  const { cart } = useCart(); // Get the cart items from the context

  // Calculate the total price of the items in the cart
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-summary">
      <h3>Cart Summary</h3>
      
      <div className="summary-details">
        <p>Total Items: {cart.length}</p>
        <p>Total Price: {formatCurrency(totalPrice)}</p>
      </div>
      
      <button className="checkout-btn">Proceed to Checkout</button>
    </div>
  );
};

export default CartSummary;
