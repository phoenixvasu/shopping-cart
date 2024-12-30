// src/components/ProductItem.jsx
import React from 'react';
import { useCart } from '../contexts/CartContext'; // Access cart context
import { formatCurrency } from '../utils/formatCurrency'; // Utility to format price into currency

const ProductItem = ({ product }) => {
  const { addToCart } = useCart(); // Access the addToCart function from context

  const handleAddToCart = () => {
    addToCart(product); // Adds the product to the cart
  };

  return (
    <div className="product-item">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">{formatCurrency(product.price)}</p>
      <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
    </div>
  );
};

export default ProductItem;
