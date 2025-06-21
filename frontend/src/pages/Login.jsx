import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const { login, error, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      // Show detailed backend error if available
      const backendMsg = err?.response?.data?.message;
      setFormError(backendMsg || error || 'Login failed');
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card login-card">
        <div className="auth-header">
          <div className="auth-logo">
            <div className="logo-container">
              <span className="logo-icon">🛒</span>
              <span className="logo-text">
                <span className="logo-nex">Nex</span>
                <span className="logo-cart">Cart</span>
              </span>
            </div>
          </div>
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Login to your NexCart account</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="auth-btn" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
          {formError && <div className="error-message">{formError}</div>}
        </form>
        <div className="auth-footer">
          <span>Don't have an account?</span> <Link to="/signup" className="auth-link">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login; 