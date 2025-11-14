// import React, { useEffect, useState } from "react";
// import BlogCard from "./BlogCard";
// import "./BlogPage.css";
// import axios from "axios";

// const BACKEND =
//   process.env.REACT_APP_BACKEND_URL ||
//   "https://vidhik-mantra-backend.vercel.app";

// export default function BlogPage() {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   async function fetchBlogs() {
//     setLoading(true);
//     setError(null);
//     try {
//       const r = await axios.get(`${BACKEND}/api/blogs`);
//       setBlogs(Array.isArray(r.data) ? r.data : []);
//     } catch (e) {
//       console.error(e);
//       setError("Failed to load blogs");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <section className="bm-page-wrap">
//       <header className="bm-hero">
//         <div className="bm-hero-inner">
//           <h1>Insights & Analysis</h1>
//           <p className="muted">
//             Thoughtful articles, legal updates and practical guides from
//             VidhikMantra
//           </p>
//         </div>
//       </header>

//       <div className="bm-container">
//         {loading && <div className="bm-center muted">Loading articles…</div>}
//         {error && <div className="bm-center bm-err">{error}</div>}

//         {!loading && !error && (
//           <div className="bm-grid">
//             {blogs.map((b) => (
//               <BlogCard key={b._id || b.id} blog={b} />
//             ))}
//           </div>
//         )}

//         {!loading && !error && blogs.length === 0 && (
//           <div className="bm-center muted">No articles to show</div>
//         )}
//       </div>
//     </section>
//   );
// }








import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import "./BlogPage.css";
import axios from "axios";

const BACKEND =
  process.env.REACT_APP_BACKEND_URL ||
  "https://vidhik-mantra-backend.vercel.app";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState(["All"]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${BACKEND}/api/blogs`);
      const arr = Array.isArray(res.data) ? res.data : [];

      setBlogs(arr);
      setFiltered(arr);

      // ---- AUTO GENERATE FILTERS FROM BLOG CATEGORIES ----
      const categories = [
        ...new Set(arr.map((b) => b.category).filter(Boolean))
      ];

      setFilters(["All", ...categories]);

    } catch (e) {
      console.error(e);
      setError("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  }

  function applyFilter(filter) {
    setActiveFilter(filter);

    if (filter === "All") {
      setFiltered(blogs);
    } else {
      setFiltered(blogs.filter((b) => b.category === filter));
    }
  }

  return (
    <section className="bm-page-wrap">
      <header className="bm-hero">
        <div className="bm-hero-inner">
          <h1>Insights & Analysis</h1>
          <p className="muted">
            Thoughtful articles, legal updates and practical guides from
            VidhikMantra
          </p>
        </div>
      </header>

      <div className="bm-container">

        {/* FILTER BAR (Dynamic) */}
        <div className="bm-filter-bar">
          {filters.map((f) => (
            <button
              key={f}
              className={`bm-filter-btn ${activeFilter === f ? "active" : ""}`}
              onClick={() => applyFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {loading && <div className="bm-center muted">Loading articles…</div>}
        {error && <div className="bm-center bm-err">{error}</div>}

        {!loading && !error && (
          <div className="bm-grid">
            {filtered.map((b) => (
              <BlogCard key={b._id || b.id} blog={b} />
            ))}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="bm-center muted">No articles found</div>
        )}
      </div>
    </section>
  );
}
