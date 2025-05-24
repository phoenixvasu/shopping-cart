import React from 'react';
import { useProducts } from '../contexts/ProductContext';
import ProductItem from '../components/ProductItem';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const HomePage = () => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="home-page">
      <h1>Welcome to Our Store</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage; 