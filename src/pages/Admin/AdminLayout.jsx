// src/pages/Admin/AdminLayout.jsx
import React from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    navigate("/admin/login", { replace: true });
  };

  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          background: "#222",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <h2>Admin Panel</h2>
          <Link to="/admin" style={{ color: "#fff", textDecoration: "none" }}>
            Dashboard
          </Link>
          <Link to="/admin/blogs" style={{ color: "#fff", textDecoration: "none" }}>
            Blogs
          </Link>
          <Link to="/admin/casestudies" style={{ color: "#fff", textDecoration: "none" }}>
            Case Studies
          </Link>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: "#f44336",
            border: "none",
            color: "#fff",
            padding: "8px 12px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </header>

      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}
