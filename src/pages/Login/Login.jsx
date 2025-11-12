// src/pages/Login/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ✅ If already logged in, go directly to admin panel
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated") === "true";
    if (isAuthenticated) {
      navigate("/admin/blogs", { replace: true });
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    const adminEmail = "admin";
    const adminPassword = "admin";

    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem("isAdminAuthenticated", "true");
      navigate("/admin/blogs", { replace: true }); // ✅ redirect to admin panel
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Admin Login</h2>
        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Enter Admin ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
