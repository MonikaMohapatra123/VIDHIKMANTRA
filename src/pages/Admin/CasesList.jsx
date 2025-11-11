import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BACKEND =
  process.env.REACT_APP_BACKEND_URL ||
  'https://vidhik-mantra-backend.vercel.app';

export default function CasesList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchList();
  }, []);

  async function fetchList() {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND}/api/casestudies`);
      setItems(response.data || []);
    } catch (error) {
      alert('Failed to load');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    // ✅ Fixed ESLint issue: use window.confirm instead of confirm
    if (!window.confirm('Delete this case study?')) return;

    try {
      await axios.delete(`${BACKEND}/api/casestudies/${id}`);
      setItems((prev) => prev.filter((i) => (i._id || i.id) !== id));
    } catch (error) {
      alert('Delete failed');
    }
  }

  return (
    <div>
      <div className="list-top">
        <h3>Case Studies</h3>
        <div>
          <Link to="/admin/casestudies/add" className="btn">
            Add Case
          </Link>
        </div>
      </div>

      {loading && <div className="muted">Loading...</div>}

      <div className="cards-grid">
        {items.map((b) => (
          <article key={b._id || b.id} className="card-sm">
            <h4>{b.title}</h4>
            <div className="meta">Client: {b.client || '—'}</div>
            <p className="excerpt">
              {(b.summary || '').slice(0, 140)}
              {(b.summary || '').length > 140 ? '...' : ''}
            </p>
            <div className="card-actions">
              <Link to={`/admin/casestudies/${b._id || b.id}`}>View</Link>
              <Link to={`/admin/casestudies/${b._id || b.id}/edit`}>Edit</Link>
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
