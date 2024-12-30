// src/services/productService.js

// Function to get products
export const getProducts = async () => {
  try {
    const response = await fetch(
      "https://shopping-cart-8.onrender.com/api/products"
    );

    // Check if the response is successful (status code 200)
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    // Parse the response as JSON
    const data = await response.json();

    // Log the raw response data for debugging
    console.log("Fetched products data:", data);

    // Check if the API returned success
    if (data && data.success) {
      return data.data; // Return the list of products if successful
    } else {
      throw new Error(
        "Failed to fetch products: " + (data.message || "Unknown error")
      );
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Error fetching products: " + error.message); // Improve error message propagation
  }
};

// Function to delete a product
export const deleteProduct = async (productId) => {
  try {
    const response = await fetch(
      `https://shopping-cart-8.onrender.com/api/products/${productId}`,
      {
        method: "DELETE", // HTTP method to delete a product
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
      }
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    // Parse the response as JSON
    const data = await response.json();

    // Log the response for debugging
    console.log("Deleted product response:", data);

    // Check if the deletion was successful
    if (data && data.success) {
      return data.message || "Product deleted successfully"; // Return a success message or any custom message
    } else {
      throw new Error(
        "Failed to delete product: " + (data.message || "Unknown error")
      );
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Error deleting product: " + error.message); // Improve error message propagation
  }
};

// src/services/productService.js

export const addProduct = async (newProduct) => {
  try {
    const response = await fetch(
      "https://shopping-cart-8.onrender.com/api/products",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add product");
    }

    const data = await response.json();

    if (data.success) {
      return data.product; // Return the newly added product
    } else {
      throw new Error("Failed to add product");
    }
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};
