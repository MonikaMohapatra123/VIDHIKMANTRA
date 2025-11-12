import React from 'react';
import { Link } from 'react-router-dom';
import './CaseCard.css';

export default function CaseCard({ caseItem }) {
  const id = caseItem._id || caseItem.id;
  const title = caseItem.title || 'Untitled Case';
  const summary = (caseItem.summary || caseItem.description || '').slice(0, 160);
  const tags = Array.isArray(caseItem.tags) ? caseItem.tags : [];
  const image = caseItem.image;

  return (
    <article className="cs-card">
      <Link to={`/casestudies/${id}`} className="cs-card-link" aria-label={title}>
        <div className="cs-card-media">
          {image ? (
            <img src={image} alt={title} className="cs-thumb" />
          ) : (
            <div className="cs-thumb placeholder">{(title || 'U').slice(0, 1)}</div>
          )}
        </div>

        <div className="cs-card-body">
          <h3 className="cs-card-title">{title}</h3>
          <p className="cs-card-excerpt">
            {summary}
            {(caseItem.description || '').length > 160 ? '…' : ''}
          </p>

          <div className="cs-card-meta">
            <div className="cs-tags">
              {tags.slice(0, 3).map((t) => (
                <span key={t} className="cs-tag">{t}</span>
              ))}
            </div>
            <div className="cs-readmore">Read case →</div>
          </div>
        </div>
      </Link>
    </article>
  );
}
