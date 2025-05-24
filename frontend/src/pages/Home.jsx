// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import ProductItem from '../components/ProductItem';
import { getProducts } from '../services/productService';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch products when the component is mounted
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');
        const fetchedProducts = await getProducts();
        console.log('Fetched products:', fetchedProducts);
        setProducts(fetchedProducts);
      } catch (err) {
        console.error('Error in Home component:', err);
        setError(err.message || 'Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
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
