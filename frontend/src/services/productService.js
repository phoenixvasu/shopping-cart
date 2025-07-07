// src/services/productService.js

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// Function to get products
export const getProducts = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.category && filters.category !== "All")
    params.append("category", filters.category);
  if (filters.minPrice !== undefined)
    params.append("minPrice", filters.minPrice);
  if (filters.maxPrice !== undefined)
    params.append("maxPrice", filters.maxPrice);
  const response = await axios.get(
    `${API_URL}/products${params.toString() ? "?" + params.toString() : ""}`
  );
  return response.data.data || response.data;
};

// Function to delete a product
export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/products/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

// Function to add a product
export const addProduct = async (productData) => {
  const response = await axios.post(`${API_URL}/products`, productData, {
    withCredentials: true,
  });
  return response.data;
};

// Function to update a product
export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${API_URL}/products/${id}`, productData, {
    withCredentials: true,
  });
  return response.data;
};

export const searchProducts = async (q) => {
  const response = await axios.get(
    `${API_URL}/products/search?q=${encodeURIComponent(q)}`
  );
  return response.data.data || response.data;
};

export const addReview = async (productId, rating, comment) => {
  const res = await axios.post(
    `${API_URL}/products/${productId}/reviews`,
    { rating, comment },
    { withCredentials: true }
  );
  return res.data;
};

export const updateReview = async (productId, rating, comment) => {
  const res = await axios.put(
    `${API_URL}/products/${productId}/reviews`,
    { rating, comment },
    { withCredentials: true }
  );
  return res.data;
};

export const deleteReview = async (productId) => {
  const res = await axios.delete(`${API_URL}/products/${productId}/reviews`, {
    withCredentials: true,
  });
  return res.data;
};

export const getProductById = async (id) => {
  const res = await axios.get(`${API_URL}/products/${id}`);
  return res.data.data || res.data;
};
