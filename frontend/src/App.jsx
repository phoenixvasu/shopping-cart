import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProductProvider } from './contexts/ProductContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import './styles/App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>
          </div>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
