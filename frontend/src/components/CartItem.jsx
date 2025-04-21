import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Minus, Plus, Trash2 } from 'react-feather';

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
        <h3 className="cart-item-title">{product.name}</h3>
        <p className="cart-item-price">${product.price.toFixed(2)}</p>
        <div className="quantity-controls">
          <button 
            onClick={handleDecrement} 
            disabled={product.quantity <= 1} 
            className="quantity-btn"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="quantity-display">{product.quantity}</span>
          <button 
            onClick={handleIncrement} 
            className="quantity-btn"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      <button 
        onClick={() => removeFromCart(product._id)} 
        className="remove-btn"
        aria-label="Remove item"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default CartItem;
