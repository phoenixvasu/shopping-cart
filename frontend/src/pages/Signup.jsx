import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const { signup, error, loading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    try {
      await signup(name, email, password);
      navigate('/');
    } catch (err) {
      // Show detailed backend error if available
      const backendMsg = err?.response?.data?.message;
      setFormError(backendMsg || error || 'Signup failed');
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card signup-card">
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
          <h2 className="auth-title">Join NexCart</h2>
          <p className="auth-subtitle">Create your account and start shopping!</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>
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
              autoComplete="new-password"
            />
          </div>
          <button type="submit" className="auth-btn" disabled={loading}>{loading ? 'Creating Account...' : 'Create Account'}</button>
          {formError && <div className="error-message">{formError}</div>}
        </form>
        <div className="auth-footer">
          <span>Already have an account?</span> <Link to="/login" className="auth-link">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup; 