import React from "react";
import { Link } from "react-router-dom";
import "./DailyNewsCard.css";

export default function DailyNewsCard({ news }) {
  const id = news._id || news.id;
  const headline = news.headline || "Untitled";
  const excerpt = ((news.shortDescription || "").replace(/<[^>]+>/g, "") || "").slice(0, 140);
  const date = new Date(news.updatedAt || news.createdAt || Date.now()).toLocaleDateString();

  return (
    <article className="dn-card">
      <Link to={`/dailynews/${id}`} className="dn-card-link" aria-label={headline}>
        <div className="dn-card-media">
          {news.image ? (
            <img src={news.image} alt={headline} className="dn-thumb" />
          ) : (
            <div className="dn-thumb placeholder">{(headline || "U").slice(0, 1)}</div>
          )}
          <div className="dn-media-overlay" />
        </div>

        <div className="dn-card-body">
          <h3 className="dn-card-title">{headline}</h3>
          <p className="dn-card-excerpt">{excerpt}{(news.shortDescription || "").length > 140 ? "…" : ""}</p>

          <div className="dn-card-meta">
            <div className="dn-date">{date}</div>
          </div>
        </div>
      </Link>
    </article>
  );
}
