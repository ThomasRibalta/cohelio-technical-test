import React from "react";
import { Link } from "react-router-dom";
import "./DashboardLayout.css";

const DashboardLayout = ({ children }) => (
  <div className="dashboard-layout">
    <aside className="sidebar">
      <div className="sidebar-logo">Cohelio Admin</div>
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

export default DashboardLayout;
