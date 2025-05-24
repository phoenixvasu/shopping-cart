import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        // For now, we'll use a mock admin user
        // In a real app, you would verify the user's session/token here
        const mockUser = {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          isAdmin: true
        };
        setUser(mockUser);
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    // In a real app, you would make an API call to authenticate
    if (email === 'admin@example.com' && password === 'admin123') {
      const mockUser = {
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        isAdmin: true
      };
      setUser(mockUser);
      return mockUser;
    }
    throw new Error('Invalid credentials');
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 