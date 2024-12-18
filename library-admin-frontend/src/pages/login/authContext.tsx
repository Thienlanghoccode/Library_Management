import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (userAccountName: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decodedToken: any = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Token decoding failed', error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (userAccountName: string, password: string) => {
    try {
      const response = await fetch('http://localhost:8000/auth/access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userAccountName, password })
      });

      const data = await response.json();
      const { accessToken, roles } = data.result;

      if (roles.includes('ADMIN')) {
        localStorage.setItem('token', accessToken);
        setIsAuthenticated(true);
        console.log('Logged in and authenticated:', true);
      } else {
        alert('Bạn không có quyền truy cập.');
      }
    } catch (error) {
      alert('Đăng nhập thất bại.');
      console.error('Login failed', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div>Loading...</div>; // Hoặc bạn có thể hiển thị một component loading tùy chỉnh
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
