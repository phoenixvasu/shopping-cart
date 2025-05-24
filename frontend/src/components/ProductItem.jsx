import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../utils/formatCurrency';

const ProductItem = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <div className="product-item fade-in">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="loaded"
        />
      </div>
      <h3>{product.name}</h3>
      <p className="price">${product.price.toFixed(2)}</p>
      <div className="quantity-controls">
        <button
          className="quantity-btn"
          onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="quantity-display">{quantity}</span>
        <button
          className="quantity-btn"
          onClick={() => setQuantity(prev => prev + 1)}
        >
          +
        </button>
      </div>
      <button
        className="add-to-cart-btn"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;
