import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./CaseStudies.css";

export default function CaseStudies({ data }) {
  if (!data) return null;

  return (
    <section className="vmcs-section">
      <div className="vmcs-header">
        <div className="vmcs-badge">{data.badge}</div>
        <h2 className="vmcs-title">{data.title}</h2>
        <p className="vmcs-sub">{data.subtitle}</p>
      </div>

      <div className="vmcs-grid">
        {data.items.map((item, idx) => (
          <article key={item.id} className={`vmcs-card vmcs-scale-${idx + 1}`}>

            <div className="vmcs-card-side">
              <div className="vmcs-side-accent" />
              <div className="vmcs-side-number">{item.number}</div>
            </div>

            <div className="vmcs-card-body">
              <h3 className="vmcs-card-title">{item.title}</h3>
              <p className="vmcs-card-desc">{item.summary}</p>

              <div className="vmcs-card-footer">

                {/* 👉 FIXED BUTTON: NOW NAVIGATES */}
                <Link to={item.button.link} className="vmcs-cta">
                  {item.button.label}
                  <span className="vmcs-arrow">
                    <ArrowRight size={16} />
                  </span>
                </Link>

                <div className="vmcs-meta">{item.meta}</div>
              </div>
            </div>

            <div className="vmcs-glow" aria-hidden />
          </article>
        ))}
      </div>
    </section>
  );
}
