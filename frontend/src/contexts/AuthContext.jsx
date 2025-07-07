import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../config/axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch current user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await api.get('/auth/me');
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const signup = async (name, email, password) => {
    setError(null);
    try {
      await api.post('/auth/signup', { name, email, password });
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
      throw err;
    }
  };

  const login = async (email, password) => {
    setError(null);
    try {
      const res = await api.post('/auth/login', { email, password });
      setUser(res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    }
  };

  const logout = async () => {
    setError(null);
    try {
      await api.post('/auth/logout');
      setUser(null);
    } catch (err) {
      setError('Logout failed');
    }
  };

  const value = { user, loading, error, signup, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 