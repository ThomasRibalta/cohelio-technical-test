import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ Auth, children }) => {
  return Auth.isAuthenticated && Auth.user.role === "admin" ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminRoute;
