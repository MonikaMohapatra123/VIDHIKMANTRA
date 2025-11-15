
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // Premium clean icon
import axios from "axios";
import "./BlogDetail.css";

const BACKEND =
  process.env.REACT_APP_BACKEND_URL ||
  "https://vidhik-mantra-backend.vercel.app";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function fetchBlog() {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${BACKEND}/api/blogs/${id}`);
        if (!cancelled) setBlog(res.data);
      } catch (err) {
        console.error(err);
        if (!cancelled) setError("Failed to load article.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchBlog();
    return () => {
      cancelled = true;
    };
  }, [id]);

  function estimateReadTime(text) {
    if (!text) return "1 min";
    const words = text.replace(/<[^>]+>/g, "").trim().split(/\s+/).length;
    const mins = Math.max(1, Math.round(words / 200));
    return `${mins} min read`;
  }

  if (loading)
    return <div className="bm-loader">Loading your article...</div>;

  if (error)
    return <div className="bm-error">{error}</div>;

  if (!blog)
    return <div className="bm-error">Article not found</div>;

  const title = blog.title || "Untitled";
  const author = blog.author || "VidhikMantra";
  const date = new Date(blog.updatedAt || blog.createdAt).toLocaleDateString();
  const readtime = estimateReadTime(blog.content);

  let thumbnailUrl = null;
  if (blog.thumbnail) {
    if (blog.thumbnail.startsWith("http")) thumbnailUrl = blog.thumbnail;
    else if (blog.thumbnail.startsWith("./"))
      thumbnailUrl = blog.thumbnail.replace("./", "/");
    else
      thumbnailUrl = `${BACKEND}${blog.thumbnail.startsWith("/") ? "" : "/"}${blog.thumbnail}`;
  }

  return (
    <div className="bm-wrapper">
      <div className="bm-container">
        <Link to="/blogs" className="bm-back">
          <ArrowLeft size={20} /> <span>Back to Articles</span>
        </Link>

        <article className="bm-card">
          {thumbnailUrl && (
            <div className="bm-thumb-wrap">
              <img src={thumbnailUrl} alt={title} className="bm-thumb" />
              <div className="bm-overlay" />
            </div>
          )}

          <div className="bm-content">
            <h1 className="bm-title">{title}</h1>

            <div className="bm-meta">
              <span>{author}</span>
              <span className="bm-dot" />
              <span>{date}</span>
              <span className="bm-dot" />
              <span>{readtime}</span>
            </div>

            <div
              className="bm-body"
              dangerouslySetInnerHTML={{
                __html: blog.content || "<p>No content available</p>",
              }}
            />

            <div className="bm-footer">
              <span className="bm-category">
                {blog.category || "General"}
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
