import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProducts, addProduct as addProductAPI, updateProduct as updateProductAPI, deleteProduct as deleteProductAPI } from '../services/productService';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData) => {
    try {
      const newProduct = await addProductAPI(productData);
      setProducts([...products, newProduct]);
      setError(null);
      return newProduct;
    } catch (err) {
      setError('Failed to add product');
      console.error('Error adding product:', err);
      throw err;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const updatedProduct = await updateProductAPI(id, productData);
      setProducts(products.map(product => 
        product._id === id ? updatedProduct : product
      ));
      setError(null);
      return updatedProduct;
    } catch (err) {
      setError('Failed to update product');
      console.error('Error updating product:', err);
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteProductAPI(id);
      setProducts(products.filter(product => product._id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete product');
      console.error('Error deleting product:', err);
      throw err;
    }
  };

  const value = {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    refreshProducts: fetchProducts
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext; 