// src/pages/Admin.jsx
import React, { useState } from 'react';
import { useProducts } from '../contexts/ProductContext';
import { Plus, Edit2, Trash2, X, Shield } from 'react-feather';
import LoadingSpinner from '../components/LoadingSpinner';

const Admin = () => {
  const { products, loading, error, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, formData);
      } else {
        await addProduct(formData);
      }
      handleCloseModal();
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
      } catch (err) {
        console.error('Error deleting product:', err);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      image: ''
    });
  };

  if (loading) return <LoadingSpinner />;
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
      <div className="admin-header">
        <h1 className="admin-title"><Shield size={32} style={{verticalAlign:'middle',marginRight:'0.5rem'}}/>Admin Dashboard</h1>
        <p className="admin-subtitle">Manage your products with ease. Only admins can access this page.</p>
        <button 
          className="add-product-btn"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={20} />
          Add New Product
        </button>
      </div>
      <div className="admin-section">
        <h2 className="admin-section-title">Product Management</h2>
        <div className="admin-divider" />
        <div className="product-list modern-card-grid">
          {products.length === 0 && <div className="empty-state">No products found.</div>}
          {products.map((product) => (
            <div key={product._id} className="product-card modern-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">${product.price}</p>
              </div>
              <div className="product-actions">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(product)}
                >
                  <Edit2 size={18} />
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(product._id)}
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content modern-modal">
            <button className="close-btn" onClick={handleCloseModal}>
              <X size={24} />
            </button>
            <h2 className="modal-title">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter product name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="Enter price"
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Image URL</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter image URL"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="save-btn">
                  {editingProduct ? 'Save Changes' : 'Add Product'}
                </button>
                <button type="button" className="cancel-btn" onClick={handleCloseModal}>
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
