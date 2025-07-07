import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../styles/checkout.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm() {
  const { cart, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    name: '', email: '', street: '', city: '', zip: '', country: ''
  });
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null); // Store paymentMethodId and intent
  const stripe = useStripe();
  const elements = useElements();

  const handleAddressChange = e => setAddress({ ...address, [e.target.name]: e.target.value });
  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  // Calculate total and map items robustly
  const items = cart.map(item => ({
    product: item._id || item.product?._id,
    name: item.name || item.product?.name || 'Product',
    quantity: item.quantity,
    price: item.price || item.product?.price || 0
  }));
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Handle payment in payment step
  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error('Card input not found.');
      const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card', card: cardElement, billing_details: { name: address.name, email: address.email }
      });
      if (pmError) { setError(pmError.message); setLoading(false); return; }
      setPaymentInfo({ paymentMethodId: paymentMethod.id });
      setStep(3);
    } catch (err) {
      setError(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  // Place order in review step
  const handlePlaceOrder = async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ items, address, paymentMethodId: paymentInfo.paymentMethodId, total })
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Order failed');
      setOrderId(data.order._id);
      clearCart();
      setStep(4);
    } catch (err) {
      setError(err.message || 'Order failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="demo-banner">Demo Mode: No real payment or shipping. Use Stripe test card 4242 4242 4242 4242.</div>
      <div className="checkout-card">
        <h2>Checkout</h2>
        <div className="checkout-steps">
          <div className={`step ${step === 1 ? 'active' : ''}`}>1. Address</div>
          <div className={`step ${step === 2 ? 'active' : ''}`}>2. Payment</div>
          <div className={`step ${step === 3 ? 'active' : ''}`}>3. Review</div>
        </div>
        {step === 1 && (
          <form className="checkout-form" onSubmit={e => { e.preventDefault(); handleNext(); }}>
            <h3>Shipping Address</h3>
            <input name="name" value={address.name} onChange={handleAddressChange} placeholder="Full Name" required />
            <input name="email" value={address.email} onChange={handleAddressChange} placeholder="Email" type="email" required />
            <input name="street" value={address.street} onChange={handleAddressChange} placeholder="Street Address" required />
            <input name="city" value={address.city} onChange={handleAddressChange} placeholder="City" required />
            <input name="zip" value={address.zip} onChange={handleAddressChange} placeholder="ZIP/Postal Code" required />
            <input name="country" value={address.country} onChange={handleAddressChange} placeholder="Country" required />
            <div className="checkout-actions">
              <button type="submit" className="checkout-btn">Next</button>
            </div>
          </form>
        )}
        {step === 2 && (
          <form className="checkout-form" onSubmit={handlePayment}>
            <h3>Payment (Stripe Test Mode)</h3>
            <div className="test-card-banner">
              <span>Demo Mode: Use Stripe test card <strong>4242 4242 4242 4242</strong>, any future expiry, any CVC.</span>
              <button
                type="button"
                className="copy-test-card-btn"
                onClick={() => {
                  navigator.clipboard.writeText('4242 4242 4242 4242');
                }}
                style={{ marginLeft: '1rem', padding: '0.2rem 0.7rem', fontSize: '0.95rem', cursor: 'pointer' }}
              >
                Copy test card
              </button>
            </div>
            <CardElement options={{ style: { base: { fontSize: '1rem' } } }} />
            {error && (
              <div className="error-message">
                {error === 'Your card number is invalid.'
                  ? 'Your card number is invalid. For demo, use 4242 4242 4242 4242.'
                  : error}
              </div>
            )}
            <div className="checkout-actions">
              <button type="button" className="checkout-btn" onClick={handleBack}>Back</button>
              <button type="submit" className="checkout-btn primary" disabled={loading}>{loading ? 'Processing...' : 'Pay & Review'}</button>
            </div>
          </form>
        )}
        {step === 3 && (
          <div className="checkout-review">
            <h3>Review & Confirm</h3>
            <div className="review-section">
              <strong>Shipping Address:</strong>
              <div>{address.name}, {address.email}</div>
              <div>{address.street}, {address.city}, {address.zip}, {address.country}</div>
            </div>
            <div className="review-section">
              <strong>Payment:</strong>
              <div>Card (Stripe test mode)</div>
            </div>
            <div className="review-section">
              <strong>Cart:</strong>
              <ul>
                {items.map(item => (
                  <li key={item.product}>{item.name} x {item.quantity} (${item.price})</li>
                ))}
              </ul>
              <div className="review-total">
                Total: ${total.toFixed(2)}
              </div>
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="checkout-actions">
              <button type="button" className="checkout-btn" onClick={handleBack}>Back</button>
              <button type="button" className="checkout-btn primary" onClick={handlePlaceOrder} disabled={loading}>{loading ? 'Placing Order...' : 'Place Order'}</button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="checkout-confirmation">
            <h3>Order Placed!</h3>
            <p>Your order has been placed successfully. (Demo only, no real payment or shipping.)</p>
            <div className="order-id">Order ID: {orderId}</div>
          </div>
        )}
      </div>
    </div>
  );
}

const Checkout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Checkout; 