import React from "react";
import { Link } from "react-router-dom";
import "./BlogCard.css";

export default function BlogCard({ blog }) {
  const id = blog._id || blog.id;
  const title = blog.title || "Untitled";
  const excerpt = ((blog.content || "").replace(/<[^>]+>/g, "") || "").slice(
    0,
    160
  );
  const author = blog.author || "VidhikMantra";
  const date = new Date(blog.updatedAt || blog.createdAt || Date.now()).toLocaleDateString();
  const readtime = estimateReadTime(blog.content);

  return (
    <article className="bm-card">
      <Link to={`/blogs/${id}`} className="bm-card-link" aria-label={title}>
        <div className="bm-card-media">
          {blog.thumbnail ? (
            <img src={blog.thumbnail} alt={title} className="bm-thumb" />
          ) : (
            <div className="bm-thumb placeholder">{(title || "U").slice(0, 1)}</div>
          )}
          <div className="bm-badge">{blog.category || "General"}</div>
          <div className="bm-media-overlay" />
        </div>

        <div className="bm-card-body">
          <h3 className="bm-card-title">{title}</h3>
          <p className="bm-card-excerpt">{excerpt}{(blog.content || "").length > 160 ? "…" : ""}</p>

          <div className="bm-card-meta">
            <div className="bm-author">{author}</div>
            <div className="bm-dot" />
            <div className="bm-date">{date}</div>
            <div className="bm-spacer" />
            <div className="bm-readtime">{readtime}</div>
          </div>
        </div>
      </Link>
    </article>
  );
}

function estimateReadTime(text) {
  if (!text) return "1 min";
  const words = text.replace(/<[^>]+>/g, "").trim().split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min`;
}
