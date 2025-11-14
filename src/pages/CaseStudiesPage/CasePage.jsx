import React, { useEffect, useState } from "react";
import axios from "axios";
import CaseCard from "./CaseCard";
import "./CasePage.css";

const BACKEND =
  process.env.REACT_APP_BACKEND_URL ||
  "https://vidhik-mantra-backend.vercel.app";

export default function CasePage() {
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTag, setSelectedTag] = useState("All");

  useEffect(() => {
    let cancelled = false;
    async function fetchCases() {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${BACKEND}/api/casestudies`);
        if (!cancelled) {
          const allCases = Array.isArray(res.data) ? res.data : [];
          setCases(allCases);
          setFilteredCases(allCases);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) setError("Failed to load case studies");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchCases();
    return () => {
      cancelled = true;
    };
  }, []);

  // Filter Logic
  useEffect(() => {
    if (selectedTag === "All") {
      setFilteredCases(cases);
    } else {
      const filtered = cases.filter((c) =>
        Array.isArray(c.tags) ? c.tags.includes(selectedTag) : false
      );
      setFilteredCases(filtered);
    }
  }, [selectedTag, cases]);

  // Unique tags
  const allTags = [
    "All",
    ...new Set(cases.flatMap((c) => (Array.isArray(c.tags) ? c.tags : []))),
  ];

  return (
    <section className="cs-page-wrap">
      <header className="cs-hero">
        <div className="cs-hero-inner">
          <h1>Case Studies</h1>
          <p className="muted">
            Real case insights from our legal expertise.
          </p>
        </div>
      </header>

      {/* Horizontal Tag Filter */}
      <div className="cs-tags-bar cs-container">
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`cs-tag-pill ${
              selectedTag === tag ? "active" : ""
            }`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Case Cards */}
      <div className="cs-container">
        {loading && <div className="bm-center muted">Loading case studies…</div>}
        {error && <div className="bm-center bm-err">{error}</div>}

        {!loading && !error && (
          <div className="cs-grid">
            {filteredCases.map((c) => (
              <CaseCard key={c._id || c.id} caseItem={c} />
            ))}
          </div>
        )}

        {!loading && !error && filteredCases.length === 0 && (
          <div className="bm-center muted">No case studies found</div>
        )}
      </div>
    </section>
  );
}
