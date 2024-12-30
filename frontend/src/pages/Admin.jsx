// src/pages/Admin.jsx
import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct, addProduct } from '../services/productService'; // Fetch products, delete and add functions
import ProductItem from '../components/ProductItem'; // Optionally display products for admin to manage
import { formatCurrency } from '../utils/formatCurrency'; // Format currency for display

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Loading state for products

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (error) {
        setError('Error fetching products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      setError('Please provide all fields');
      return;
    }

    try {
      // Add product to the database
      const addedProduct = await addProduct(newProduct);
      setProducts([...products, addedProduct]); // Add the new product to the product list
      setNewProduct({ name: '', price: '', image: '' }); // Reset the form
      setError('');
    } catch (error) {
      setError('Error adding product');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id); // Assuming deleteProduct is a function in the service
      setProducts(products.filter((product) => product._id !== id)); // Remove deleted product from list
    } catch (error) {
      setError('Error deleting product');
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Panel</h1>

      <form onSubmit={handleAddProduct} className="add-product-form">
        <h2>Add New Product</h2>
        {error && <p className="error">{error}</p>}

        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          placeholder="Enter product name"
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          placeholder="Enter price"
        />

        <label htmlFor="image">Image URL</label>
        <input
          type="text"
          name="image"
          value={newProduct.image}
          onChange={handleChange}
          placeholder="Enter image URL"
        />

        <button type="submit">Add Product</button>
      </form>

      <h2>Manage Products</h2>

      {loading ? (
        <p>Loading products...</p> // Loading message
      ) : error ? (
        <p>{error}</p> // Show error message if there's an error
      ) : products.length === 0 ? (
        <p>No products available</p> // Show when no products are fetched
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <div key={product._id} className="product-item">
              <ProductItem product={product} />
              <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
