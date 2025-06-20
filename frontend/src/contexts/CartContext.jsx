import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import * as cartAPI from '../services/cartService';

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
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load cart from backend or localStorage on mount or user change
  useEffect(() => {
    const loadCart = async () => {
      setIsLoading(true);
      if (user) {
        try {
          const backendCart = await cartAPI.getCart();
          setCart(backendCart.items || []);
        } catch {
          setCart([]);
        }
      } else {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          try {
            setCart(JSON.parse(savedCart));
          } catch {
            setCart([]);
          }
        } else {
          setCart([]);
        }
      }
      setIsLoading(false);
    };
    loadCart();
  }, [user]);

  // Save cart to localStorage for guests
  useEffect(() => {
    if (!user) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, user]);

  const addToCart = async (product, quantity = 1) => {
    setIsLoading(true);
    try {
      if (user) {
        const backendCart = await cartAPI.addOrUpdateItem(product._id, quantity);
        setCart(backendCart.items || []);
      } else {
        setCart(prevCart => {
          const existingItem = prevCart.find(item => item.product._id === product._id);
          if (existingItem) {
            return prevCart.map(item =>
              item.product._id === product._id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            return [...prevCart, { product, quantity }];
          }
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    if (user) {
      setIsLoading(true);
      try {
        const backendCart = await cartAPI.removeItem(productId);
        setCart(backendCart.items || []);
      } finally {
        setIsLoading(false);
      }
    } else {
      setCart(prevCart => prevCart.filter(item => item.product._id !== productId));
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    if (user) {
      setIsLoading(true);
      try {
        const backendCart = await cartAPI.addOrUpdateItem(productId, newQuantity);
        setCart(backendCart.items || []);
      } finally {
        setIsLoading(false);
      }
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.product._id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const clearCart = async () => {
    if (user) {
      setIsLoading(true);
      try {
        const backendCart = await cartAPI.clearCart();
        setCart(backendCart.items || []);
      } finally {
        setIsLoading(false);
      }
    } else {
      setCart([]);
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = item.product.price || (item.product.data && item.product.data.price) || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const value = {
    cart,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
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
