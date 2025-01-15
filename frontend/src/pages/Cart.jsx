import React from 'react';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';

const Cart = () => {
  const { cart } = useCart();

  return (
    <div className="cart-page">
      <h2 className="cart-title">Your Shopping Cart</h2>
      {cart.length > 0 ? (
        <div className="cart-container">
          <div className="cart-items">
            {cart.map((product) => (
              <CartItem key={product._id} product={product} />
            ))}
          </div>
          <CartSummary />
        </div>
      ) : (
        <p className="empty-cart">Your cart is empty!</p>
      )}
    </div>
  );
};

export default Cart;
