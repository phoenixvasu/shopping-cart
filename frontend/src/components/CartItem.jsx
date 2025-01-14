import React from 'react';
import { useCart } from '../contexts/CartContext'; // Access the cart functions

const CartItem = ({ product }) => {
  const { removeFromCart, updateQuantity } = useCart(); // Access cart functions

  const handleIncrement = () => {
    updateQuantity(product._id, product.quantity + 1);
  };

  const handleDecrement = () => {
    if (product.quantity > 1) {
      updateQuantity(product._id, product.quantity - 1);
    }
  };

  return (
    <div className="cart-item">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <div className="quantity-controls">
        <button onClick={handleDecrement} disabled={product.quantity <= 1}>−</button>
        <span>{product.quantity}</span>
        <button onClick={handleIncrement}>+</button>
      </div>
      <button onClick={() => removeFromCart(product._id)}>Remove</button>
    </div>
  );
};

export default CartItem;
