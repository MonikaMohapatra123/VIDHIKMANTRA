import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./ViewBlog.css"; // 👈 You can style this page separately

const BACKEND =
  process.env.REACT_APP_BACKEND_URL ||
  "https://vidhik-mantra-backend.vercel.app";

export default function ViewBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await axios.get(`${BACKEND}/api/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        alert("Failed to load blog.");
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id]); // ✅ Correct dependency

  if (loading) return <div className="viewblog-loading">Loading...</div>;
  if (!blog) return <div className="viewblog-notfound">Blog not found</div>;

  return (
    <div className="viewblog-container">
      <div className="viewblog-header">
        <h2 className="viewblog-title">{blog.title}</h2>
        <p className="viewblog-meta">
          <span>{blog.category}</span> • <span>{blog.author}</span>
        </p>
      </div>

      {blog.thumbnail && (
        <div className="viewblog-thumbnail">
          <img src={blog.thumbnail} alt="Thumbnail" />
        </div>
      )}

      <div
        className="viewblog-content"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      <div className="viewblog-actions">
        <Link to={`/admin/blogs/${id}/edit`} className="viewblog-edit-btn">
          ✏️ Edit Blog
        </Link>
        <Link to="/admin/blogs" className="viewblog-back-btn">
          ← Back to Blogs
        </Link>
      </div>
    </div>
  );
}
