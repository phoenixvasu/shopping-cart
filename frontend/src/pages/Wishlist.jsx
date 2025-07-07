import React from 'react';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const { user } = useAuth();
  const { wishlist, loading, error } = useWishlist();

  if (!user) return <div className="wishlist-page"><h2>Wishlist</h2><p>Please log in to view your wishlist.</p></div>;

  return (
    <div className="wishlist-page">
      <h2>Wishlist</h2>
      {loading && <div>Loading your wishlist...</div>}
      {error && <div className="error-message">{error}</div>}
      {!loading && wishlist.length === 0 && <div>Your wishlist is empty.</div>}
      {!loading && wishlist.length > 0 && (
        <div className="product-list-grid">
          {wishlist.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist; 