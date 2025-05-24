// src/pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProducts } from '../contexts/ProductContext';
import { ShoppingBag, Plus, Edit2, Trash2 } from 'react-feather';

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, deleteProduct, loading, error } = useProducts();
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [name]: value });
    } else {
    setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await addProduct(newProduct);
      setNewProduct({ name: '', price: '', image: '' });
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(editingProduct._id, editingProduct);
      setEditingProduct(null);
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
      } catch (err) {
        console.error('Error deleting product:', err);
      }
    }
  };

  if (!user || !user.isAdmin) {
    return null;
  }

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      <div className="admin-grid">
        {/* Add New Product Form */}
        <div className="admin-section">
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
              required
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          placeholder="Enter price"
              required
              min="0"
              step="0.01"
        />

        <label htmlFor="image">Image URL</label>
        <input
          type="text"
          name="image"
          value={newProduct.image}
          onChange={handleChange}
          placeholder="Enter image URL"
              required
        />

            <button type="submit">
              <Plus size={20} />
              Add Product
            </button>
      </form>
        </div>

        {/* Product Management Section */}
        <div className="admin-section">
          <div className="product-management">
            <h2>Product Management</h2>
      {loading ? (
              <div className="loading-spinner" />
      ) : (
        <div className="product-list">
          {products.map((product) => (
                  <div key={product._id} className="product-card">
                    <img src={product.image} alt={product.name} />
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="price">₹{product.price}</p>
                    </div>
                    <div className="product-actions">
                      <button
                        className="edit-btn"
                        onClick={() => setEditingProduct(product)}
                      >
                        <Edit2 size={18} />
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>
                    </div>
            </div>
          ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Product</h2>
            <form onSubmit={handleEditProduct}>
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                name="name"
                value={editingProduct.name}
                onChange={handleChange}
                required
              />

              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                value={editingProduct.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
              />

              <label htmlFor="image">Image URL</label>
              <input
                type="text"
                name="image"
                value={editingProduct.image}
                onChange={handleChange}
                required
              />

              <div className="modal-actions">
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setEditingProduct(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
