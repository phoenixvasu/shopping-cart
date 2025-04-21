import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a Context for the Cart
const CartContext = createContext();

// Custom hook to use the Cart Context
export const useCart = () => useContext(CartContext);

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

  // Add a product to the cart
  const addToCart = (product) => {
    try {
      setCart((prevCart) => {
        const existingProduct = prevCart.find((item) => item._id === product._id);
        if (existingProduct) {
          // Increment quantity if the product already exists
          return prevCart.map((item) =>
            item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          // Add new product to the cart with initial quantity of 1
          return [...prevCart, { ...product, quantity: 1 }];
        }
      });
    } catch (err) {
      setError('Failed to add item to cart');
      console.error('Error adding to cart:', err);
    }
  };

  // Remove a product from the cart
  const removeFromCart = (productId) => {
    try {
      setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
    } catch (err) {
      setError('Failed to remove item from cart');
      console.error('Error removing from cart:', err);
    }
  };

  // Update the quantity of a product in the cart
  const updateQuantity = (productId, newQuantity) => {
    try {
      if (newQuantity < 1) {
        // If the quantity is less than 1, remove the product from the cart
        removeFromCart(productId);
      } else {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item._id === productId ? { ...item, quantity: newQuantity } : item
          )
        );
      }
    } catch (err) {
      setError('Failed to update item quantity');
      console.error('Error updating quantity:', err);
    }
  };

  // Calculate total items in the cart
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculate total price of items in the cart
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Clear the cart
  const clearCart = () => {
    try {
      setCart([]);
    } catch (err) {
      setError('Failed to clear cart');
      console.error('Error clearing cart:', err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        error,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalItems,
        getTotalPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
