// src/utils/formatCurrency.js

export const formatCurrency = (amount) => {
    // Convert amount to a number if it's a string or undefined
    const parsedAmount = parseFloat(amount);
    
    if (isNaN(parsedAmount)) {
      return "$0.00";  // Return default value if parsing fails
    }
  
    // Format the number as a currency value
    return parsedAmount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  