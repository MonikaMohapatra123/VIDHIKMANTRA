import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import "./BlogPage.css";
import axios from "axios";

const BACKEND =
  process.env.REACT_APP_BACKEND_URL ||
  "https://vidhik-mantra-backend.vercel.app";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    setLoading(true);
    setError(null);
    try {
      const r = await axios.get(`${BACKEND}/api/blogs`);
      setBlogs(Array.isArray(r.data) ? r.data : []);
    } catch (e) {
      console.error(e);
      setError("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bm-page-wrap">
      <header className="bm-hero">
        <div className="bm-hero-inner">
          <h1>Insights & Analysis</h1>
          <p className="muted">
            Thoughtful articles, legal updates and practical guides from
            VidhikMantra
          </p>
        </div>
      </header>

      <div className="bm-container">
        {loading && <div className="bm-center muted">Loading articles…</div>}
        {error && <div className="bm-center bm-err">{error}</div>}

        {!loading && !error && (
          <div className="bm-grid">
            {blogs.map((b) => (
              <BlogCard key={b._id || b.id} blog={b} />
            ))}
          </div>
        )}

        {!loading && !error && blogs.length === 0 && (
          <div className="bm-center muted">No articles to show</div>
        )}
      </div>
    </section>
  );
}
