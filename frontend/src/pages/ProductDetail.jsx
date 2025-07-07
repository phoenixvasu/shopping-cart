import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { getProductById, addReview, updateReview, deleteReview } from '../services/productService';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState(null);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartError, setCartError] = useState('');
  const [cartSuccess, setCartSuccess] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const prod = await getProductById(id);
        setProduct(prod);
      } catch (err) {
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error || !product) return <div className="error-message">{error || 'Product not found'}</div>;

  const maxQty = product.stock || 0;
  const outOfStock = maxQty === 0;
  const avgRating = product.reviews && product.reviews.length ? (product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length).toFixed(2) : null;
  const userReview = user && product.reviews.find(r => r.user === user._id);

  const handleAddToCart = async () => {
    setCartError('');
    setCartSuccess('');
    if (!user) {
      setCartError('Please log in to add items to your cart.');
      return;
    }
    if (outOfStock) {
      setCartError('This product is out of stock.');
      return;
    }
    if (quantity > maxQty) {
      setCartError('Cannot add more than available stock.');
      return;
    }
    setCartLoading(true);
    try {
      await addToCart(product, quantity);
      setCartSuccess('Added to cart!');
      setQuantity(1);
      setTimeout(() => setCartSuccess(''), 1200);
    } catch (err) {
      const backendMsg = err?.response?.data?.message;
      if (backendMsg && backendMsg.includes('maximum available stock')) {
        setCartError(backendMsg);
        setTimeout(() => setCartError(''), 2500);
      } else {
        setCartError(backendMsg || err.message || 'Failed to add to cart.');
      }
    } finally {
      setCartLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewLoading(true); setReviewError(null);
    try {
      let res;
      if (userReview) {
        res = await updateReview(product._id, reviewRating, reviewText);
      } else {
        res = await addReview(product._id, reviewRating, reviewText);
      }
      setProduct({ ...product, reviews: res.reviews });
      setShowReviewForm(false);
    } catch (err) {
      setReviewError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setReviewLoading(false);
    }
  };

  const handleDeleteReview = async () => {
    setReviewLoading(true); setReviewError(null);
    try {
      const res = await deleteReview(product._id);
      setProduct({ ...product, reviews: res.reviews });
    } catch (err) {
      setReviewError(err.response?.data?.message || 'Failed to delete review');
    } finally {
      setReviewLoading(false);
    }
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-card">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <h2>{product.name}</h2>
          <div className="product-detail-meta">
            <span className="product-detail-category">{product.category}</span>
            <span className="product-detail-stock" style={{ color: outOfStock ? '#a33a3a' : '#1a3a5d' }}>
              {outOfStock ? 'Out of stock' : `${maxQty} in stock`}
            </span>
          </div>
          <div className="product-detail-price">${product.price.toFixed(2)}</div>
          <div className="product-detail-rating">
            {avgRating ? (
              <span>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{ color: i < Math.round(avgRating) ? '#FFD700' : '#ccc' }}>★</span>
                ))}
                <span style={{ marginLeft: 6, fontSize: '0.95em', color: '#555' }}>({avgRating} / 5, {product.reviews.length} review{product.reviews.length !== 1 ? 's' : ''})</span>
              </span>
            ) : (
              <span style={{ color: '#888' }}>No reviews yet</span>
            )}
          </div>
          <div className="product-detail-actions">
            <div className="quantity-controls">
              <button
                className="quantity-btn"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                disabled={quantity <= 1 || outOfStock}
              >-</button>
              <span className="quantity-display">{quantity}</span>
              <button
                className="quantity-btn"
                onClick={() => setQuantity(prev => Math.min(maxQty, prev + 1))}
                disabled={outOfStock || quantity >= maxQty}
              >+</button>
            </div>
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={outOfStock || cartLoading || quantity > maxQty}
            >{cartLoading ? 'Adding...' : 'Add to Cart'}</button>
            {(cartError || cartSuccess) && (
              <div className={cartError ? 'error-message' : 'success-message'} style={{marginTop:8}}>
                {cartError || cartSuccess}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="product-detail-reviews">
        <h3 className="reviews-title">Reviews</h3>
        {user && (
          <div className="review-section">
            {userReview && !showReviewForm && (
              <div className="your-review review-card">
                <strong>Your review:</strong> <span className="review-rating">{userReview.rating}★</span> <span className="review-comment">{userReview.comment}</span>
                <button className="icon-btn edit-review-btn" onClick={() => { setShowReviewForm(true); setReviewText(userReview.comment); setReviewRating(userReview.rating); }} title="Edit Review"><span role="img" aria-label="Edit">✏️</span></button>
                <button className="icon-btn delete-review-btn" onClick={handleDeleteReview} title="Delete Review"><span role="img" aria-label="Delete">🗑️</span></button>
              </div>
            )}
            {!userReview && !showReviewForm && (
              <button className="primary-btn add-review-btn" onClick={() => setShowReviewForm(true)}>Add Review</button>
            )}
            {showReviewForm && (
              <form onSubmit={handleReviewSubmit} className="review-form modern-form">
                <label>
                  Rating:
                  <select value={reviewRating} onChange={e => setReviewRating(Number(e.target.value))} className="review-rating-select">
                    {[5,4,3,2,1].map(r => <option key={r} value={r}>{r}★</option>)}
                  </select>
                </label>
                <label>
                  Comment:
                  <input type="text" value={reviewText} onChange={e => setReviewText(e.target.value)} maxLength={200} className="review-comment-input" placeholder="Share your thoughts..." />
                </label>
                <div className="review-form-actions">
                  <button type="submit" className="primary-btn" disabled={reviewLoading}>{userReview ? 'Update' : 'Submit'}</button>
                  <button type="button" className="secondary-btn" onClick={() => setShowReviewForm(false)} style={{ marginLeft: 8 }}>Cancel</button>
                </div>
              </form>
            )}
            {reviewError && <div className="error-message" style={{marginTop:8}}>{reviewError}</div>}
          </div>
        )}
        <div className="all-reviews">
          {product.reviews.length === 0 && <div className="empty-state">No reviews yet. Be the first to review!</div>}
          {product.reviews.map((r, idx) => (
            <div key={idx} className="review-item review-card">
              <span className="review-rating">{r.rating}★</span>
              <span className="review-comment">{r.comment}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 