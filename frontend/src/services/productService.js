// src/services/productService.js

import axios from "axios";

const API_URL = "https://shopping-cart-uwys.vercel.app/api";

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// Function to get products
export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data.data || response.data;
};

// Function to delete a product
export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/products/${id}`);
  return response.data;
};

// Function to add a product
export const addProduct = async (productData) => {
  const response = await axios.post(`${API_URL}/products`, productData);
  return response.data;
};

// Function to update a product
export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${API_URL}/products/${id}`, productData);
  return response.data;
};
