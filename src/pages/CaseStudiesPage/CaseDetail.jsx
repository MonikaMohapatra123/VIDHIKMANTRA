import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './CaseDeatils.css';

const BACKEND = process.env.REACT_APP_BACKEND_URL || 'https://vidhik-mantra-backend.vercel.app';

export default function CaseDetail() {
  const { id } = useParams();
  const [caseItem, setCaseItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function fetchCase() {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${BACKEND}/api/casestudies/${id}`);
        if (!cancelled) setCaseItem(res.data);
      } catch (e) {
        console.error(e);
        if (!cancelled) setError('Failed to load case study.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchCase();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <div className="bm-center muted">Loading case…</div>;
  if (error) return <div className="bm-center bm-err">{error}</div>;
  if (!caseItem) return <div className="bm-center muted">Case not found</div>;

  const title = caseItem.title || 'Untitled Case';
  const client = caseItem.client || 'Anonymous';
  const outcome = caseItem.outcome || '';
  const tags = Array.isArray(caseItem.tags) ? caseItem.tags : [];

  let imageUrl = null;
  if (caseItem.image) {
    if (caseItem.image.startsWith('http')) imageUrl = caseItem.image;
    else if (caseItem.image.startsWith('./')) imageUrl = caseItem.image.replace('./', '/');
    else imageUrl = `${BACKEND}${caseItem.image.startsWith('/') ? '' : '/'}${caseItem.image}`;
  }

  return (
    <section className="cs-page-wrap">
      <div className="cs-container cs-article-wrap">
        <Link to="/case-studies" className="bm-back-link">← Back to case studies</Link>

        <article className="cs-article">
          <header className="cs-article-header">
            <h1 className="cs-article-title">{title}</h1>

            <div className="cs-article-meta">
              <span className="cs-client">Client: {client}</span>
              <span className="bm-dot" />
              <span className="cs-outcome">Outcome: {outcome}</span>
            </div>
          </header>

          {imageUrl && (
            <div className="cs-article-hero">
              <img src={imageUrl} alt={title} className="cs-article-thumb" />
            </div>
          )}

          <div
            className="cs-article-content"
            dangerouslySetInnerHTML={{
              __html: caseItem.description || '<p>No description</p>',
            }}
          />

          {tags.length > 0 && (
            <footer className="cs-article-footer">
              <div className="cs-tags-list">
                Tags: {tags.map((t) => (
                  <span key={t} className="cs-tag-inline">{t}</span>
                ))}
              </div>
            </footer>
          )}
        </article>
      </div>
    </section>
  );
}
