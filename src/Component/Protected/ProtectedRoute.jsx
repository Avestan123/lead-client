import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
  const { Component } = props;
  const auth = useAuth();
  const navigate = useNavigate();
 
  useEffect(()=>{
    const token = localStorage.getItem('token');
  if(!token){
    navigate("/login")
  }
  })
  

  if (!auth.isAuthenticated) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
 
  return <Component />;
};

export default ProtectedRoute;