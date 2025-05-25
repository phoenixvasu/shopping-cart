// src/pages/Home.jsx
import React from 'react';
import { useProducts } from '../contexts/ProductContext';
import ProductItem from '../components/ProductItem';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const { products, isLoading, error } = useProducts();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error loading products</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="home-page fade-in">
      <div className="container">
        <h1 className="page-title">Our Products</h1>
        <div className="products-grid">
          {products.map(product => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
