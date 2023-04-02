import React from 'react';
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children }) => {
  const auth = useSelector(state => state.auth);
  const isAuthenticated = !!auth && !!auth.email && !!auth.token;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};
