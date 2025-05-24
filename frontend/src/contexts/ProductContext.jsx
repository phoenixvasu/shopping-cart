import React, { createContext, useContext, useCallback } from 'react';
import { useApiCache, useBatchRequest } from '../hooks/useApiCache';
import axios from 'axios';
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
  const fetchProducts = useCallback(async () => {
    const response = await axios.get('http://localhost:5000/api/products');
    return response.data;
  }, []);

  const {
    data: products,
    loading,
    error,
    refetch,
    invalidate
  } = useApiCache('products', fetchProducts);

  const batchAddToCart = useBatchRequest('addToCart', async (productId, quantity) => {
    const response = await axios.post('http://localhost:5000/api/cart/add', {
      productId,
      quantity
    });
    return response.data;
  });

  const batchUpdateCart = useBatchRequest('updateCart', async (productId, quantity) => {
    const response = await axios.put('http://localhost:5000/api/cart/update', {
      productId,
      quantity
    });
    return response.data;
  });

  const batchRemoveFromCart = useBatchRequest('removeFromCart', async (productId) => {
    const response = await axios.delete(`http://localhost:5000/api/cart/remove/${productId}`);
    return response.data;
  });

  const addProduct = async (productData) => {
    try {
      const newProduct = await addProductAPI(productData);
      refetch();
      return newProduct;
    } catch (err) {
      console.error('Error adding product:', err);
      throw err;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const updatedProduct = await updateProductAPI(id, productData);
      refetch();
      return updatedProduct;
    } catch (err) {
      console.error('Error updating product:', err);
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteProductAPI(id);
      refetch();
    } catch (err) {
      console.error('Error deleting product:', err);
      throw err;
    }
  };

  const value = {
    products,
    loading,
    error,
    refetch,
    invalidate,
    batchAddToCart,
    batchUpdateCart,
    batchRemoveFromCart,
    addProduct,
    updateProduct,
    deleteProduct
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext; 