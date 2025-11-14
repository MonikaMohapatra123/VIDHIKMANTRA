// src/pages/DailyNews/ViewDailyNews.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
// import "./ViewDailyNews.css";

const BACKEND =
  process.env.REACT_APP_BACKEND_URL ||
  "https://vidhik-mantra-backend.vercel.app";

export default function ViewDailyNews() {
  const { id } = useParams();

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(`${BACKEND}/api/dailynews/${id}`);
        setNews(res.data);
      } catch {
        alert("Failed to load");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div className="muted">Loading...</div>;
  if (!news) return <div className="muted">Not found</div>;

  return (
    <div className="viewnews-container">
      <h2>{news.headline}</h2>
      <p className="meta">{new Date(news.createdAt).toDateString()}</p>

      {news.image && (
        <div className="viewnews-img">
          <img src={news.image} alt="" />
        </div>
      )}

      <p className="short">{news.shortDescription}</p>

      <div className="fullnews" dangerouslySetInnerHTML={{ __html: news.fullNews }} />

      <Link to="/admin/dailynews" className="back-btn">← Back</Link>
    </div>
  );
}
