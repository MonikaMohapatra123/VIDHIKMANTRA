// src/pages/Admin/AdminHome.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminHome.css";

export default function AdminHome() {
  const navigate = useNavigate();

  return (
    <div className="admin-home-container">
      <h2>Welcome to Admin Panel</h2>
      <p>Select a section to manage:</p>

      <div className="admin-cards">
        <div
          className="admin-card"
          onClick={() => navigate("/admin/blogs")}
        >
          <h3>📰 Blogs</h3>
          <p>Manage your website blogs here.</p>
        </div>

        <div
          className="admin-card"
          onClick={() => navigate("/admin/casestudies")}
        >
          <h3>⚖️ Case Studies</h3>
          <p>Manage your legal case studies here.</p>
        </div>
        <div
            className="admin-card"
            onClick={() => navigate("/admin/dailynews")}
          >
            <h3>🗞 Daily News</h3>
            <p>Manage all daily legal news.</p>
          </div>

      </div>
    </div>
  );
}
