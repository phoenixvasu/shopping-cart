import React from 'react';
import { useCart } from '../contexts/CartContext';

const CartItem = ({ product }) => {
  const { removeFromCart, updateQuantity } = useCart();

  const handleIncrement = () => updateQuantity(product._id, product.quantity + 1);
  const handleDecrement = () => {
    if (product.quantity > 1) {
      updateQuantity(product._id, product.quantity - 1);
    }
  };

  return (
    <div className="cart-item">
      <img src={product.image} alt={product.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h3>{product.name}</h3>
        <p>${product.price.toFixed(2)}</p>
        <div className="quantity-controls">
          <button onClick={handleDecrement} disabled={product.quantity <= 1} className="quantity-btn">
            −
          </button>
          <span className="quantity-display">{product.quantity}</span>
          <button onClick={handleIncrement} className="quantity-btn">+</button>
        </div>
      </div>
      <button onClick={() => removeFromCart(product._id)} className="remove-btn">
        Remove
      </button>
    </div>
  );
};

export default CartItem;
