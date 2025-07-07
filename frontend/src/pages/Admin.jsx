// src/pages/Admin.jsx
import React, { useState } from 'react';
import { useProducts } from '../contexts/ProductContext';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Edit2, Trash2, X, Shield } from 'react-feather';
import LoadingSpinner from '../components/LoadingSpinner';

const CATEGORY_OPTIONS = [
  'General', 'Electronics', 'Clothing', 'Books', 'Home', 'Toys', 'Beauty', 'Sports', 'Other'
];

const Admin = () => {
  const { user } = useAuth();
  const { products, loading, error, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    category: 'General',
    stock: 0
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setFormError('');
    setFormSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    const validation = validateForm();
    if (validation) {
      setFormError(validation);
      return;
    }
    setFormLoading(true);
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, formData);
        setFormSuccess('Product updated successfully!');
      } else {
        await addProduct(formData);
        setFormSuccess('Product added successfully!');
      }
      setTimeout(() => handleCloseModal(), 900);
    } catch (err) {
      setFormError(err?.response?.data?.message || err.message || 'Error saving product.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category || 'General',
      stock: product.stock ?? 0
    });
    setFormError('');
    setFormSuccess('');
    setIsModalOpen(true);
  };

  const handleDelete = async (productId) => {
    setDeleteError('');
    setDeleteSuccess('');
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        setDeleteSuccess('Product deleted successfully!');
        setTimeout(() => setDeleteSuccess(''), 1200);
      } catch (err) {
        setDeleteError(err?.response?.data?.message || err.message || 'Error deleting product.');
        setTimeout(() => setDeleteError(''), 2000);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      image: '',
      category: 'General',
      stock: 0
    });
    setFormError('');
    setFormSuccess('');
    setFormLoading(false);
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Product name is required.';
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) return 'Price must be a positive number.';
    if (!formData.image.trim() || !/^https?:\/\//.test(formData.image)) return 'Image URL must be valid.';
    if (!formData.category) return 'Category is required.';
    if (formData.stock === '' || isNaN(formData.stock) || Number(formData.stock) < 0) return 'Stock must be 0 or greater.';
    return '';
  };

  if (!user || user.role !== 'admin') {
    return <div className="forbidden-page"><h2>Forbidden</h2><p>Admin access required.</p></div>;
  }

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
        {deleteError && <div className="error-message">{deleteError}</div>}
        {deleteSuccess && <div className="success-message">{deleteSuccess}</div>}
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
                  disabled={formLoading}
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
            <button className="close-btn" onClick={handleCloseModal} disabled={formLoading}>
              <X size={24} />
            </button>
            <h2 className="modal-title">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit} className="product-form">
              {formError && <div className="error-message">{formError}</div>}
              {formSuccess && <div className="success-message">{formSuccess}</div>}
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
                  disabled={formLoading}
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
                  disabled={formLoading}
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
                  disabled={formLoading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  disabled={formLoading}
                >
                  {CATEGORY_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="1"
                  placeholder="Enter stock quantity"
                  disabled={formLoading}
                />
              </div>
              <button type="submit" className="save-btn" disabled={formLoading}>
                {formLoading ? 'Saving...' : (editingProduct ? 'Update Product' : 'Add Product')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
