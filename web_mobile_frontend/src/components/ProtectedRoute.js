import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// PUBLIC_INTERFACE
export default function ProtectedRoute() {
  /** Protects routes by requiring authentication; redirects to /login if not authenticated. */
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
