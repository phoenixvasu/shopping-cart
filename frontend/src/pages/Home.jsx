// src/pages/Home.jsx
import React from 'react';
import ProductList from '../components/ProductList';

const Home = () => {
  return (
    <div className="home-page fade-in">
      <div className="container">
        <h1 className="page-title">Our Products</h1>
        <ProductList />
      </div>
    </div>
  );
};

export default Home;
