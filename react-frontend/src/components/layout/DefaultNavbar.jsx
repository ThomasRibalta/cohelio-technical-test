import React from "react";
import { Link } from "react-router-dom";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import "./DefaultNavbar.css";

const DefaultNavbar = ({ Auth }) => {
  if (!Auth) {
    return null;
  }
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          Cohelio
        </Link>
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/review" className="navbar-link">
          Review
        </Link>
      </div>

      <div className="navbar-right">
        {!Auth.isAuthenticated ? (
          <>
            <Link to="/login" className="navbar-link">
              Login
            </Link>
            <Link to="/signup" className="navbar-link">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            {Auth.user.role && Auth.user.role === "admin" && (
              <Link to="/dashboard/" className="navbar-link">
                Dashboard
              </Link>
            )}
            <Link to="/logout" className="navbar-link">
              Logout
            </Link>
          </>
        )}
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default DefaultNavbar;
