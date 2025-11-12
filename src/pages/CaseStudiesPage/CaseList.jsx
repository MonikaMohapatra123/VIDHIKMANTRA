// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import CaseCard from './CaseCard';
// import './CasePage.css';

// const BACKEND = process.env.REACT_APP_BACKEND_URL || 'https://vidhik-mantra-backend.vercel.app';

// export default function CaseList() {
//   const [cases, setCases] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let cancelled = false;
//     async function fetchCases() {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await axios.get(`${BACKEND}/api/casestudies`);
//         if (!cancelled) setCases(Array.isArray(res.data) ? res.data : []);
//       } catch (e) {
//         console.error(e);
//         if (!cancelled) setError('Failed to load case studies');
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     }
//     fetchCases();
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   return (
//     <section className="cs-page-wrap">
//       <header className="cs-hero">
//         <div className="cs-hero-inner">
//           <h1>Case Studies</h1>
//           <p className="muted">Real client matters, outcomes, and how we handled them.</p>
//         </div>
//       </header>

//       <div className="cs-container">
//         {loading && <div className="bm-center muted">Loading case studies…</div>}
//         {error && <div className="bm-center bm-err">{error}</div>}

//         {!loading && !error && (
//           <div className="cs-grid">
//             {cases.map((c) => (
//               <CaseCard key={c._id || c.id} caseItem={c} />
//             ))}
//           </div>
//         )}

//         {!loading && !error && cases.length === 0 && (
//           <div className="bm-center muted">No case studies to show</div>
//         )}
//       </div>
//     </section>
//   );
// }



import React, { useEffect, useState } from "react";
import axios from "axios";
import CaseCard from "./CaseCard";
import "./CasePage.css";

const BACKEND =
  process.env.REACT_APP_BACKEND_URL ||
  "https://vidhik-mantra-backend.vercel.app";

export default function CaseList() {
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
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

  // 🔍 Handle Filter
  useEffect(() => {
    let filtered = cases;

    // Filter by search text
    if (search.trim()) {
      filtered = filtered.filter((c) =>
        (c.title || "").toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by tag
    if (selectedTag !== "All") {
      filtered = filtered.filter((c) =>
        Array.isArray(c.tags) ? c.tags.includes(selectedTag) : false
      );
    }

    setFilteredCases(filtered);
  }, [search, selectedTag, cases]);

  // Collect all unique tags
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
            Real client matters, outcomes, and how we handled them.
          </p>
        </div>
      </header>

      {/* 🔽 Filter Controls */}
      <div className="cs-filters cs-container">
        <input
          type="text"
          placeholder="Search case title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="cs-search-input"
        />

        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="cs-tag-select"
        >
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {/* 🔳 Case Grid */}
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

