import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApiCache, useBatchRequest } from '../hooks/useApiCache';
import axios from 'axios';
import { getProducts, addProduct as addProductAPI, updateProduct as updateProductAPI, deleteProduct as deleteProductAPI } from '../services/productService';

const API_URL = 'https://shopping-cart-8.onrender.com/api';

const ProductContext = createContext();

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        setProducts(response.data.data || response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const {
    data: productsFromApi,
    loading: apiLoading,
    error: apiError,
    refetch,
    invalidate
  } = useApiCache('products', getProducts);

  const batchAddToCart = useBatchRequest('addToCart', async (productId, quantity) => {
    const response = await axios.post(`${API_URL}/cart/add`, {
      productId,
      quantity
    });
    return response.data;
  });

  const batchUpdateCart = useBatchRequest('updateCart', async (productId, quantity) => {
    const response = await axios.put(`${API_URL}/cart/update`, {
      productId,
      quantity
    });
    return response.data;
  });

  const batchRemoveFromCart = useBatchRequest('removeFromCart', async (productId) => {
    const response = await axios.delete(`${API_URL}/cart/remove/${productId}`);
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
}

export default ProductContext; 