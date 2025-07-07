import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import { useAuth } from '../contexts/AuthContext';
import { addReview, updateReview, deleteReview } from '../services/productService';

const ProductItem = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState(product.reviews || []);
  const [avgRating, setAvgRating] = useState(product.reviews && product.reviews.length ? (product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length).toFixed(2) : null);

  const userReview = user && reviews.find(r => r.user === user._id);

  const maxQty = product.stock || 0;
  const outOfStock = maxQty === 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      let res;
      if (userReview) {
        res = await updateReview(product._id, reviewRating, reviewText);
      } else {
        res = await addReview(product._id, reviewRating, reviewText);
      }
      setReviews(res.reviews);
      setAvgRating(res.averageRating);
      setShowReviewForm(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async () => {
    setLoading(true); setError(null);
    try {
      const res = await deleteReview(product._id);
      setReviews(res.reviews);
      setAvgRating(res.averageRating);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete review');
    } finally {
      setLoading(false);
    }
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
      <div className="stock-status" style={{ marginBottom: 8, color: outOfStock ? '#a33a3a' : '#1a3a5d', fontWeight: 500 }}>
        {outOfStock ? 'Out of stock' : `${maxQty} in stock`}
      </div>
      <div className="product-rating">
        {avgRating ? (
          <span>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} style={{ color: i < Math.round(avgRating) ? '#FFD700' : '#ccc' }}>★</span>
            ))}
            <span style={{ marginLeft: 6, fontSize: '0.95em', color: '#555' }}>({avgRating} / 5, {reviews.length} review{reviews.length !== 1 ? 's' : ''})</span>
          </span>
        ) : (
          <span style={{ color: '#888' }}>No reviews yet</span>
        )}
      </div>
      {user && (
        <div className="review-section">
          {userReview && !showReviewForm && (
            <div className="your-review">
              <strong>Your review:</strong> {userReview.rating}★ {userReview.comment}
              <button onClick={() => { setShowReviewForm(true); setReviewText(userReview.comment); setReviewRating(userReview.rating); }} style={{ marginLeft: 8 }}>Edit</button>
              <button onClick={handleDeleteReview} style={{ marginLeft: 8 }}>Delete</button>
            </div>
          )}
          {!userReview && !showReviewForm && (
            <button onClick={() => setShowReviewForm(true)}>Add Review</button>
          )}
          {showReviewForm && (
            <form onSubmit={handleReviewSubmit} className="review-form">
              <label>
                Rating:
                <select value={reviewRating} onChange={e => setReviewRating(Number(e.target.value))}>
                  {[5,4,3,2,1].map(r => <option key={r} value={r}>{r}★</option>)}
                </select>
              </label>
              <label>
                Comment:
                <input type="text" value={reviewText} onChange={e => setReviewText(e.target.value)} maxLength={200} />
              </label>
              <button type="submit" disabled={loading}>{userReview ? 'Update' : 'Submit'}</button>
              <button type="button" onClick={() => setShowReviewForm(false)} style={{ marginLeft: 8 }}>Cancel</button>
            </form>
          )}
          {error && <div className="error-message">{error}</div>}
        </div>
      )}
      <div className="quantity-controls">
        <button
          className="quantity-btn"
          onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
          disabled={quantity <= 1 || outOfStock}
        >
          -
        </button>
        <span className="quantity-display">{quantity}</span>
        <button
          className="quantity-btn"
          onClick={() => setQuantity(prev => Math.min(maxQty, prev + 1))}
          disabled={outOfStock || quantity >= maxQty}
        >
          +
        </button>
      </div>
      <button
        className="add-to-cart-btn"
        onClick={handleAddToCart}
        disabled={outOfStock}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;
