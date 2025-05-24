import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    // Convert image to WebP format
    const convertToWebP = async () => {
      try {
        const img = new Image();
        img.src = product.image;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          
          // Convert to WebP with quality 0.8
          const webpData = canvas.toDataURL('image/webp', 0.8);
          setImageSrc(webpData);
          setImageLoaded(true);
        };
      } catch (error) {
        console.error('Error converting image to WebP:', error);
        setImageSrc(product.image);
        setImageLoaded(true);
      }
    };

    convertToWebP();
  }, [product.image]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <div className="product-item fade-in">
      <div className="product-image-container">
        {!imageLoaded && <div className="image-placeholder" />}
        <img
          src={imageSrc || product.image}
          alt={product.name}
          loading="lazy"
          className={imageLoaded ? 'loaded' : 'loading'}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <h3>{product.name}</h3>
      <p className="price">${product.price.toFixed(2)}</p>
      <div className="quantity-controls">
        <button
          className="quantity-btn"
          onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="quantity-display">{quantity}</span>
        <button
          className="quantity-btn"
          onClick={() => setQuantity(prev => prev + 1)}
        >
          +
        </button>
      </div>
      <button
        className="add-to-cart-btn"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard; 