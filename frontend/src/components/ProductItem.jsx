import React from 'react';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../utils/formatCurrency';

const ProductItem = ({ product }) => {
  const { cart, addToCart, updateQuantity } = useCart();

  // Find the product in the cart to get its quantity
  const cartItem = cart.find((item) => item._id === product._id);
  const quantity = cartItem ? cartItem.quantity : 0;

  // Handle increase and decrease actions
  const handleIncrease = () => addToCart(product);
  const handleDecrease = () => {
    if (quantity > 0) {
      updateQuantity(product._id, quantity - 1);
    }
  };

  return (
    <div className="product-item">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">{formatCurrency(product.price)}</p>
      <div className="quantity-controls">
        <button onClick={handleDecrease} disabled={quantity === 0} className="quantity-btn">
          −
        </button>
        <span className="quantity-display">{quantity}</span>
        <button onClick={handleIncrease} className="quantity-btn">
          +
        </button>
      </div>
      <button onClick={handleIncrease} className="add-to-cart-btn">
        {quantity > 0 ? "Add More" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductItem;
