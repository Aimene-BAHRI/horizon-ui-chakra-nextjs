'use client'

// context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";


import { useRouter } from 'next/navigation';
import { getUserFromToken } from '../utils/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);
  
	useEffect(() => {
	  const token = localStorage.getItem('access_token');
	  if (token) {
		const decodedUser = getUserFromToken(token);
		if (decodedUser) {
		  setUser(decodedUser);
		  setIsAuthenticated(true);
		}
	  }
	}, []);
  
	const getUserFromToken = (token) => {
	  try {
		return jwtDecode(token);
	  } catch (error) {
		console.error('Failed to decode token:', error);
		return null;
	  }
	};
  
  const login = (token: string) => {
    const user = getUserFromToken(token);
    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('access_token', token);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('access_token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
