// src/pages/Cart.jsx
import React from 'react';
import { useCart } from '../contexts/CartContext'; // Access cart context to manage cart items
import CartItem from '../components/CartItem'; // Import the CartItem component to display each item
import CartSummary from '../components/CartSummary'; // Import CartSummary component to show total price and checkout

const Cart = () => {
  const { cart } = useCart(); // Access the cart state from context

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>
      
      {/* Displaying cart items */}
      {cart.length > 0 ? (
        <div className="cart-items">
          {cart.map((product) => (
            <CartItem key={product._id} product={product} /> // Render each cart item
          ))}
        </div>
      ) : (
        <p>Your cart is empty!</p> // Message when cart is empty
      )}
      
      {/* Cart summary and checkout button */}
      <CartSummary />
    </div>
  );
};

export default Cart;
