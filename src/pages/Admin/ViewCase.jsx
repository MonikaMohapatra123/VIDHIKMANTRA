import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const BACKEND =
  process.env.REACT_APP_BACKEND_URL ||
  'https://vidhik-mantra-backend.vercel.app';

export default function ViewCase() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ useCallback prevents function recreation every render
  const fetchCase = useCallback(async () => {
    try {
      const response = await axios.get(`${BACKEND}/api/casestudies/${id}`);
      setItem(response.data);
    } catch (error) {
      console.error('Error loading case:', error);
      alert('Load failed');
    } finally {
      setLoading(false);
    }
  }, [id]);

  // ✅ include fetchCase in dependencies
  useEffect(() => {
    fetchCase();
  }, [fetchCase]);

  if (loading) return <div className="muted">Loading...</div>;
  if (!item) return <div className="muted">Not found</div>;

  return (
    <div className="card-sm">
      <h3>{item.title}</h3>
      <div className="meta">Client: {item.client}</div>

      {item.image ? (
        <img src={item.image} className="thumb" alt={item.title || 'Case'} />
      ) : null}

      <p className="excerpt">{item.summary}</p>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: item.description }}
      />

      <div style={{ marginTop: 12 }}>
        <Link to={`/admin/casestudies/${id}/edit`} className="btn">
          Edit
        </Link>
      </div>
    </div>
  );
}
