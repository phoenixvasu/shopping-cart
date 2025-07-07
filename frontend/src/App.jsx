import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';
import './styles/main.css';
import { useAuth } from './contexts/AuthContext';
import { useCart } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';

import Home from './pages/Home';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Forbidden from './pages/Forbidden';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import ProductDetail from './pages/ProductDetail';
import Wishlist from './pages/Wishlist';

function ProtectedRoute({ children, adminOnly = false, cartRequired = false }) {
  const { user, loading } = useAuth();
  const { cart } = useCart();
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/forbidden" replace />;
  if (cartRequired && (!cart || cart.length === 0)) return <Navigate to="/cart" replace />;
  return children;
}

function App() {
  return (
    <WishlistProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
              <Route path="/cart" element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute adminOnly={true}>
                  <Admin />
                </ProtectedRoute>
              } />
              <Route path="/forbidden" element={<Forbidden />} />
              <Route path="/checkout" element={
                <ProtectedRoute cartRequired={true}>
                  <Checkout />
                </ProtectedRoute>
              } />
              <Route path="/orders" element={<OrderHistory />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
          </main>
        </div>
      </Router>
    </WishlistProvider>
  );
}

export default App;
