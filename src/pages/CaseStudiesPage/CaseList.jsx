import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CaseCard from './CaseCard';
import './CasePage.css';

const BACKEND = process.env.REACT_APP_BACKEND_URL || 'https://vidhik-mantra-backend.vercel.app';

export default function CaseList() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchCases() {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${BACKEND}/api/casestudies`);
        if (!cancelled) setCases(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        console.error(e);
        if (!cancelled) setError('Failed to load case studies');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchCases();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="cs-page-wrap">
      <header className="cs-hero">
        <div className="cs-hero-inner">
          <h1>Case Studies</h1>
          <p className="muted">Real client matters, outcomes, and how we handled them.</p>
        </div>
      </header>

      <div className="cs-container">
        {loading && <div className="bm-center muted">Loading case studies…</div>}
        {error && <div className="bm-center bm-err">{error}</div>}

        {!loading && !error && (
          <div className="cs-grid">
            {cases.map((c) => (
              <CaseCard key={c._id || c.id} caseItem={c} />
            ))}
          </div>
        )}

        {!loading && !error && cases.length === 0 && (
          <div className="bm-center muted">No case studies to show</div>
        )}
      </div>
    </section>
  );
}
