import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import "./DailyNewsDetail.css";

const BACKEND =
  process.env.REACT_APP_BACKEND_URL || "https://vidhik-mantra-backend.vercel.app";

export default function DailyNewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function fetchNews() {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${BACKEND}/api/dailynews/${id}`);
        if (!cancelled) setNews(res.data);
      } catch (err) {
        console.error(err);
        if (!cancelled) setError("Failed to load news.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchNews();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <div className="dn-loader">Loading…</div>;
  if (error) return <div className="dn-error">{error}</div>;
  if (!news) return <div className="dn-error">News not found</div>;

  const headline = news.headline || "Untitled";
  const date = new Date(news.updatedAt || news.createdAt).toLocaleDateString();

  // Proper image URL handling
  let imageUrl = null;
  if (news.image) {
    if (news.image.startsWith("http")) imageUrl = news.image;
    else if (news.image.startsWith("./")) imageUrl = news.image.replace("./", "/");
    else imageUrl = `${BACKEND}${news.image.startsWith("/") ? "" : "/"}${news.image}`;
  }

  return (
    <div className="dn-wrapper">
      <div className="dn-container">
        <Link to="/dailynews" className="dn-back">
          <ArrowLeft size={20} /> <span>Back to Daily News</span>
        </Link>

        <article className="dn-card">
          {imageUrl && (
            <div className="dn-thumb-wrap">
              <img src={imageUrl} alt={headline} className="dn-thumb" />
              <div className="dn-overlay" />
            </div>
          )}

          <div className="dn-content">
            <h1 className="dn-title">{headline}</h1>
            <div className="dn-meta">
              <span>{date}</span>
            </div>
            <div
              className="dn-body"
              dangerouslySetInnerHTML={{ __html: news.fullNews || "<p>No content</p>" }}
            />
          </div>
        </article>
      </div>
    </div>
  );
}
