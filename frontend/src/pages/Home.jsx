// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import ProductItem from '../components/ProductItem'; // To display individual products
import { getProducts } from '../services/productService'; // Service to fetch products
import { formatCurrency } from '../utils/formatCurrency'; // Format price as currency

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch products from API when the component is mounted
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts(); // Fetch products
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (err) {
        setError('Error fetching products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="home-page">
      <h1>Welcome to the Shopping Cart!</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
