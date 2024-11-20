import React, { useState } from "react";
import { Link } from "react-router-dom";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import "./DashboardNavbar.css";

const DashboardNavbar = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard-layout">
      <button className="toggle-sidebar" onClick={toggleSidebar}>
        ☰
      </button>
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-logo">
          <Link to="/dashboard/">Cohelio Admin</Link>
          <ThemeSwitcher />
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/dashboard/users">Users</Link>
          </li>
          <li>
            <Link to="/dashboard/reviews">Reviews</Link>
          </li>
          <li>
            <Link to="/">Return to site</Link>
          </li>
        </ul>
      </aside>
      <main className="dashboard-content">{children}</main>
    </div>
  );
};

export default DashboardNavbar;
