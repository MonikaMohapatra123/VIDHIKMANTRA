

// File: src/components/CaseStudies/CaseStudies.jsx
import React from "react";
import { ArrowRight } from "lucide-react";
import "./CaseStudies.css";

const caseData = [
  {
    id: 1,
    title: "High-Value Arbitration Settled Successfully",
    summary:
      "We represented a corporate client in a complex arbitration matter involving a multi-crore dispute and achieved a favourable award.",
  },
  {
    id: 2,
    title: "Landmark Corporate Compliance Case",
    summary:
      "Our legal strategy protected the client from heavy penalties and set a compliance benchmark in the industry.",
  },
  {
    id: 3,
    title: "Real Estate Dispute Resolved Before Trial",
    summary:
      "Through strategic negotiations, a 5-year real estate conflict was resolved without litigation.",
  },
];

export default function CaseStudies() {
  return (
    <section className="cs-section">
      <div className="cs-header">
        <div className="cs-badge">Selected Works</div>
        <h2 className="cs-title">Case Studies</h2>
        <p className="cs-sub">High‑impact legal solutions — confidential, strategic, proven.</p>
      </div>

      <div className="cs-grid">
        {caseData.map((item, idx) => (
          <article key={item.id} className={`cs-card cs-scale-${idx + 1}`}>
            <div className="cs-card-side">
              <div className="cs-side-accent" />
              <div className="cs-side-number">0{item.id}</div>
            </div>

            <div className="cs-card-body">
              <h3 className="cs-card-title">{item.title}</h3>
              <p className="cs-card-desc">{item.summary}</p>

              <div className="cs-card-footer">
                <button className="cs-cta" aria-label={`Read more about ${item.title}`}>
                  Read case
                  <span className="cs-arrow"><ArrowRight size={16} /></span>
                </button>

                <div className="cs-meta">Confidential • Corporate</div>
              </div>
            </div>

            <div className="cs-glow" aria-hidden />
          </article>
        ))}
      </div>
    </section>
  );
}

