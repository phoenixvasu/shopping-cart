import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './contexts/ProductContext';
import { CartProvider } from './contexts/CartContext';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load components
const Home = React.lazy(() => import('./pages/Home'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Admin = React.lazy(() => import('./pages/Admin'));

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <Router>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Suspense>
        </Router>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
