import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const WishlistContext = createContext();

export function useWishlist() {
  return useContext(WishlistContext);
}

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWishlist = async () => {
    if (!user) return setWishlist([]);
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/auth/wishlist`, { withCredentials: true });
      setWishlist(res.data.wishlist || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch wishlist');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
    // eslint-disable-next-line
  }, [user]);

  const addToWishlist = async (productId) => {
    try {
      const res = await axios.post(`${API_URL}/auth/wishlist/${productId}`, {}, { withCredentials: true });
      setWishlist(res.data.wishlist || []);
    } catch (err) {
      setError('Failed to add to wishlist');
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const res = await axios.delete(`${API_URL}/auth/wishlist/${productId}`, { withCredentials: true });
      setWishlist(res.data.wishlist || []);
    } catch (err) {
      setError('Failed to remove from wishlist');
    }
  };

  const isInWishlist = (productId) => wishlist.some(p => p._id === productId);

  return (
    <WishlistContext.Provider value={{ wishlist, loading, error, addToWishlist, removeFromWishlist, isInWishlist, fetchWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
} 