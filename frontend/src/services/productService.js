// src/services/productService.js

const API_URL = import.meta.env.PROD
  ? "https://shopping-cart-8.onrender.com/api"
  : "http://localhost:5000/api";

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// Function to get products
export const getProducts = async () => {
  try {
    console.log("Fetching products from:", `${API_URL}/products`);
    const response = await fetch(`${API_URL}/products`, {
      method: "GET",
      headers: defaultHeaders,
      credentials: "include",
    });

    // Check if the response is successful (status code 200)
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API Error Response:", errorData);
      throw new Error(errorData.message || "Failed to fetch products");
    }

    // Parse the response as JSON
    const data = await response.json();
    console.log("API Response:", data);

    // Check if the API returned success
    if (data && data.success) {
      return data.data; // Return the list of products if successful
    } else {
      throw new Error(data.message || "Failed to fetch products");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Function to delete a product
export const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: "DELETE",
      headers: defaultHeaders,
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to delete product");
    }

    const data = await response.json();
    console.log("Deleted product response:", data);

    if (data && data.success) {
      return data.message || "Product deleted successfully";
    } else {
      throw new Error(data.message || "Failed to delete product");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// src/services/productService.js

export const addProduct = async (newProduct) => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: defaultHeaders,
      credentials: "include",
      body: JSON.stringify(newProduct),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to add product");
    }

    const data = await response.json();
    console.log("Add product response:", data);

    if (data.success) {
      return data.data; // Return the newly added product
    } else {
      throw new Error(data.message || "Failed to add product");
    }
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const updateProduct = async (productId, updatedProduct) => {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: "PUT",
      headers: defaultHeaders,
      credentials: "include",
      body: JSON.stringify(updatedProduct),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to update product");
    }

    const data = await response.json();
    if (data.success) {
      return data.data; // Return the updated product
    } else {
      throw new Error(data.message || "Failed to update product");
    }
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};
