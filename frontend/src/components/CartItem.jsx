import React from 'react';
import { useCart } from '../contexts/CartContext'; // Access the cart functions

const CartItem = ({ product }) => {
  const { removeFromCart, updateQuantity } = useCart(); // Access cart functions

  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    updateQuantity(product._id, newQuantity);
  };

  return (
    <div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <input
        type="number"
        value={product.quantity || 1}
        min="1"
        onChange={handleQuantityChange}
      />
      <button onClick={() => removeFromCart(product._id)}>Remove</button>
    </div>
  );
};

export default CartItem;
