import React, { useEffect, useState } from "react";
import DailyNewsCard from "./DailyNewsCard";
import "./DailyNewsPage.css";
import axios from "axios";

const BACKEND = process.env.REACT_APP_BACKEND_URL || "https://vidhik-mantra-backend.vercel.app";

export default function DailyNewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${BACKEND}/api/dailynews`);
      setNews(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      console.error(e);
      setError("Failed to load daily news");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="dn-page-wrap">
      <header className="dn-hero">
        <div className="dn-hero-inner">
          <h1>Daily News & Updates</h1>
          <p className="muted">Latest news and insights from VidhikMantra</p>
        </div>
      </header>

      <div className="dn-container">
        {loading && <div className="dn-center muted">Loading daily news…</div>}
        {error && <div className="dn-center dn-err">{error}</div>}
        {!loading && !error && news.length === 0 && (
          <div className="dn-center muted">No news available</div>
        )}

        <div className="dn-grid">
          {news.map((n) => (
            <DailyNewsCard key={n._id || n.id} news={n} />
          ))}
        </div>
      </div>
    </section>
  );
}
