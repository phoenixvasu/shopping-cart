// src/services/cartService.js

import api from "../config/axios";

// Add product to the cart
export const addToCart = (product, quantity) => {
  // Retrieve the existing cart from localStorage or initialize an empty cart
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if the product is already in the cart
  const productIndex = cart.findIndex((item) => item._id === product._id);

  if (productIndex !== -1) {
    // If product is already in the cart, update its quantity
    cart[productIndex].quantity += quantity;
  } else {
    // If product is not in the cart, add it with the specified quantity
    cart.push({ ...product, quantity });
  }

  // Save the updated cart in localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Remove product from the cart
export const removeFromCart = (productId) => {
  // Retrieve the cart from localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Filter out the product with the specified ID
  const updatedCart = cart.filter((item) => item._id !== productId);

  // Save the updated cart in localStorage
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

// Update product quantity in the cart
export const updateCartQuantity = (productId, quantity) => {
  // Retrieve the cart from localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Find the product and update its quantity
  const productIndex = cart.findIndex((item) => item._id === productId);

  if (productIndex !== -1) {
    cart[productIndex].quantity = quantity;
  }

  // Save the updated cart in localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Backend cart API
export const getCart = async () => {
  const res = await api.get("/api/cart");
  return res.data.cart;
};

export const addOrUpdateItem = async (productId, quantity) => {
  const res = await api.post("/api/cart/add", { productId, quantity });
  return res.data.cart;
};

export const removeItem = async (productId) => {
  const res = await api.post("/api/cart/remove", { productId });
  return res.data.cart;
};

export const clearCart = async () => {
  const res = await api.post("/api/cart/clear");
  return res.data.cart;
};
