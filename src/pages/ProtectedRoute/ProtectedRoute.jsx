// src/pages/ProtectedRoute/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAdminAuthenticated") === "true";
  const location = useLocation();

  // ❌ Not logged in → redirect to /admin/login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // ✅ Logged in → show protected page
  return children;
}
