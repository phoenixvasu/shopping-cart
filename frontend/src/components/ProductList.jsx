import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/productService'; // Import the API function
import { useCart } from '../contexts/CartContext'; // Import CartContext to use the cart functions

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); // Access addToCart function from context

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div>
          {products.length > 0 ? (
            <ul>
              {products.map((product) => (
                <li key={product._id}>
                  <h3>{product.name}</h3>
                  <img src={product.image} alt={product.name} />
                  <p>${product.price}</p>
                  <button onClick={() => addToCart(product)}>Add to Cart</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
