// src/pages/Home.jsx
import React from 'react';
import { useProducts } from '../contexts/ProductContext';
import ProductItem from '../components/ProductItem';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="home-page">
      <h1>Welcome to the Shopping Cart!</h1>
      {products.length === 0 ? (
        <div className="no-products">
          <p>No products available at the moment.</p>
        </div>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
