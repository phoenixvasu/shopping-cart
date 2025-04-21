import React from 'react';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import { ShoppingBag, CreditCard } from 'react-feather';

const CartSummary = () => {
  const { cart, getTotalItems, getTotalPrice } = useCart();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const shippingCost = totalPrice > 50 ? 0 : 5.99;
  const finalTotal = Number(totalPrice) + shippingCost;

  return (
    <div className="cart-summary">
      <h3 className="summary-title">Order Summary</h3>
      <div className="summary-items">
        <div className="summary-item">
          <span>Subtotal</span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
        <div className="summary-item">
          <span>Shipping</span>
          <span>
            {shippingCost === 0 ? (
              <span className="free-shipping">Free</span>
            ) : (
              formatCurrency(shippingCost)
            )}
          </span>
        </div>
        <div className="summary-total">
          <span>Total</span>
          <span>{formatCurrency(finalTotal)}</span>
        </div>
      </div>
      <button className="checkout-btn">
        <CreditCard size={20} />
        <span>Proceed to Checkout</span>
      </button>
      {shippingCost > 0 && (
        <p className="shipping-note">
          Add ${(50 - totalPrice).toFixed(2)} more to get free shipping!
        </p>
      )}
    </div>
  );
};

export default CartSummary;
