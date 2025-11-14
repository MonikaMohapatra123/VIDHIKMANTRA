// src/pages/DailyNews/DailyNewsList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BACKEND =
  process.env.REACT_APP_BACKEND_URL ||
  "https://vidhik-mantra-backend.vercel.app";

export default function DailyNewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadNews();
  }, []);

  async function loadNews() {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND}/api/dailynews`);
      setNews(res.data || []);
    } catch {
      alert("Failed to fetch news");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this news item?")) return;

    try {
      await axios.delete(`${BACKEND}/api/dailynews/${id}`);
      setNews((prev) => prev.filter((n) => n._id !== id));
    } catch {
      alert("Delete failed");
    }
  }

  return (
    <div>
      <div className="list-top">
        <h3>Daily News</h3>
        <Link className="btn" to="/admin/dailynews/add">Add News</Link>
      </div>

      {loading && <div className="muted">Loading...</div>}

      <div className="cards-grid">
        {news.map((n) => (
          <article key={n._id} className="card-sm">
            <h4>{n.headline}</h4>
            <p className="meta">{new Date(n.createdAt).toDateString()}</p>

            <p className="excerpt">
              {(n.shortDescription || "").slice(0, 140)}
              {(n.shortDescription || "").length > 140 ? "..." : ""}
            </p>

            <div className="card-actions">
              <Link to={`/admin/dailynews/${n._id}`}>View</Link>
              <Link to={`/admin/dailynews/${n._id}/edit`}>Edit</Link>
              <button onClick={() => handleDelete(n._id)} className="link-btn">
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
