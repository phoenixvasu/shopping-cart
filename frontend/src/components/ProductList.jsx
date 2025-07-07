import React, { useEffect, useState } from 'react';
import { getProducts, searchProducts } from '../services/productService'; // Import the API function
import { useCart } from '../contexts/CartContext'; // Import CartContext to use the cart functions
import ProductCard from './ProductCard';

const CATEGORY_OPTIONS = [
  'All', 'General', 'Electronics', 'Clothing', 'Books', 'Home', 'Toys', 'Beauty', 'Sports', 'Other'
];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); // Access addToCart function from context
  const [category, setCategory] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const fetchedProducts = await getProducts({
        category,
        minPrice: minPrice !== '' ? minPrice : undefined,
        maxPrice: maxPrice !== '' ? maxPrice : undefined
      });
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    if (!search) {
      setSearchResults(null);
      return;
    }
    setSearchLoading(true);
    const handler = setTimeout(async () => {
      try {
        const results = await searchProducts(search);
        setSearchResults(results);
      } catch (err) {
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 350);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, [category, minPrice, maxPrice]);

  return (
    <div>
      <div className="product-filters" style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search products..."
          style={{ width: '200px' }}
        />
        <label>
          Category:
          <select value={category} onChange={e => setCategory(e.target.value)}>
            {CATEGORY_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </label>
        <label>
          Min Price:
          <input type="number" value={minPrice} min="0" onChange={e => setMinPrice(e.target.value)} placeholder="$" style={{ width: '80px' }} />
        </label>
        <label>
          Max Price:
          <input type="number" value={maxPrice} min="0" onChange={e => setMaxPrice(e.target.value)} placeholder="$" style={{ width: '80px' }} />
        </label>
        <button onClick={fetchProducts}>Apply</button>
      </div>
      {search ? (
        searchLoading ? <p>Searching...</p> : (
          <div>
            {searchResults && searchResults.length > 0 ? (
              <div className="product-list-grid">
                {searchResults.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <p>No products found.</p>
            )}
          </div>
        )
      ) : (
        loading ? (
          <p>Loading products...</p>
        ) : (
          <div>
            {products.length > 0 ? (
              <div className="product-list-grid">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <p>No products found.</p>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default ProductList;
