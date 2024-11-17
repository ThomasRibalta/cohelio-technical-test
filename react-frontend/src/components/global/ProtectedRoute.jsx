import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ Auth, children }) => {
  return Auth.isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
