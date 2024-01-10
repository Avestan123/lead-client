import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const getUserFromLocalStorage = () => {
  const token = localStorage.getItem('token');
  console.log(token);
  return token ? { token } : null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromLocalStorage());
  // const navigate = useNavigate();
  
  // const navigate = useNavigate(); // Initialize useNavigate

  const login = (token, userName) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', userName);
    setUser({ token, userName });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
    
  };

  const isAuthenticated = () => {
    console.log(user);
    return !!user?.token;
  };

  // Redirect to /login if not authenticated
  // if (!isAuthenticated()) {
  //   navigate('/login');
  // }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
