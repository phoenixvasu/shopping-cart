import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Create a Context for the Cart
const CartContext = createContext();

// Custom hook to use the Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// CartProvider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (err) {
      setError('Failed to load cart from storage');
      console.error('Error loading cart:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (err) {
      setError('Failed to save cart to storage');
      console.error('Error saving cart:', err);
    }
  }, [cart]);

  const addToCart = useCallback(async (product, quantity) => {
    try {
      const existingItem = cart.find(item => item.product._id === product._id);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        await axios.put('http://localhost:5000/api/cart/update', {
          productId: product._id,
          quantity: newQuantity
        });
        setCart(cart.map(item =>
          item.product._id === product._id
            ? { ...item, quantity: newQuantity }
            : item
        ));
      } else {
        await axios.post('http://localhost:5000/api/cart/add', {
          productId: product._id,
          quantity
        });
        setCart([...cart, { product, quantity }]);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }, [cart]);

  const updateQuantity = useCallback(async (productId, quantity) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(productId);
        return;
      }

      await axios.put('http://localhost:5000/api/cart/update', {
        productId,
        quantity
      });
      setCart(cart.map(item =>
        item.product._id === productId
          ? { ...item, quantity }
          : item
      ));
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  }, [cart]);

  const removeFromCart = useCallback(async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove/${productId}`);
      setCart(cart.filter(item => item.product._id !== productId));
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  }, [cart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const getTotalItems = useCallback(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const getTotalPrice = useCallback(() => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }, [cart]);

  const value = {
    cart,
    isLoading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
