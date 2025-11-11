import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BACKEND =
  process.env.REACT_APP_BACKEND_URL ||
  'https://vidhik-mantra-backend.vercel.app';

export default function BlogsList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchList();
  }, []);

  async function fetchList() {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND}/api/blogs`);
      setBlogs(response.data || []);
    } catch (error) {
      alert('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this blog?')) return;

    try {
      await axios.delete(`${BACKEND}/api/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => (b._id || b.id) !== id));
    } catch (error) {
      alert('Delete failed');
    }
  }

  return (
    <div>
      <div className="list-top">
        <h3>Blogs</h3>
        <div>
          <Link to="/admin/blogs/add" className="btn">
            Add Blog
          </Link>
        </div>
      </div>

      {loading && <div className="muted">Loading...</div>}

      <div className="cards-grid">
        {blogs.map((b) => (
          <article key={b._id || b.id} className="card-sm">
            <h4>{b.title}</h4>
            <div className="meta">
              {b.category} • {b.author}
            </div>
            <p className="excerpt">
              {(b.content || '').slice(0, 140)}
              {(b.content || '').length > 140 ? '...' : ''}
            </p>
            <div className="card-actions">
              <Link to={`/admin/blogs/${b._id || b.id}`}>View</Link>
              <Link to={`/admin/blogs/${b._id || b.id}/edit`}>Edit</Link>
              <button
                className="link-btn"
                onClick={() => handleDelete(b._id || b.id)}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
