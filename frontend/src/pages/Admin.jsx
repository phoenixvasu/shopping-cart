// src/pages/Admin.jsx
import React from 'react';
import { useProducts } from '../contexts/ProductContext';
import ProductList from '../components/ProductList';
import LoadingSpinner from '../components/LoadingSpinner';

const Admin = () => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <div className="admin-grid">
        <section className="admin-section">
          <h2>Product Management</h2>
          <ProductList products={products} isAdmin={true} />
        </section>
      </div>
    </div>
  );
};

export default Admin;
