import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';
import { Heart } from 'react-feather';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [animating, setAnimating] = React.useState(false);

  const maxQty = product.stock || 0;
  const outOfStock = maxQty === 0;
  const avgRating = product.reviews && product.reviews.length ? (product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length).toFixed(2) : null;
  const inWishlist = isInWishlist(product._id);

  const handleWishlist = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    setAnimating(true);
    if (inWishlist) {
      await removeFromWishlist(product._id);
    } else {
      await addToWishlist(product._id);
    }
    setTimeout(() => setAnimating(false), 400);
  };

  return (
    <div className="product-item fade-in">
      {user && (
        <button
          className={`wishlist-btn${inWishlist ? ' active' : ''}${animating ? ' animating' : ''}`}
          onClick={handleWishlist}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={22}
            fill={inWishlist ? '#e52020' : 'none'}
            color={inWishlist ? '#e52020' : '#bbb'}
            style={{ transition: 'fill 0.2s, color 0.2s', verticalAlign: 'middle' }}
          />
        </button>
      )}
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
            <span style={{ marginLeft: 6, fontSize: '0.95em', color: '#555' }}>({avgRating})</span>
          </span>
        ) : (
          <span style={{ color: '#888' }}>No reviews yet</span>
        )}
      </div>
      <button className="view-details-btn" onClick={() => navigate(`/product/${product._id}`)} style={{ marginTop: 10 }}>
        View Details
      </button>
    </div>
  );
};

export default ProductCard; 