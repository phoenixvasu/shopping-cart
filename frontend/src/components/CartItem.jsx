import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Minus, Plus, Trash2 } from 'react-feather';
import { formatCurrency } from '../utils/formatCurrency';

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const { product, quantity } = item;

  if (!product) return null;

  const handleIncrement = () => updateQuantity(product._id, quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product._id, quantity - 1);
    }
  };

  return (
    <div className="cart-item">
      <img src={product.image} alt={product.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h3 className="cart-item-name">{product.name}</h3>
        <p className="cart-item-price">{formatCurrency(product.price)}</p>
        <div className="quantity-controls">
          <button 
            onClick={handleDecrement} 
            disabled={quantity <= 1} 
            className="quantity-btn"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="quantity-display">{quantity}</span>
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
