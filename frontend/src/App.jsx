import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import './styles/App.css';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const Cart = lazy(() => import('./pages/Cart'));
const Admin = lazy(() => import('./pages/Admin'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

function App() {
  const { isAuthenticated, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route 
                path="/admin" 
                element={isAuthenticated ? <Admin /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/login" 
                element={!isAuthenticated ? <Login /> : <Navigate to="/admin" />} 
              />
              <Route 
                path="/register" 
                element={!isAuthenticated ? <Register /> : <Navigate to="/admin" />} 
              />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
