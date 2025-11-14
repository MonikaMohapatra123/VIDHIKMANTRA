import React from "react";
import { ArrowRight } from "lucide-react";
import "./CaseStudies.css";

const data = [
  {
    id: 1,
    title: "High-Value Arbitration Settled Successfully",
    summary: "We represented a corporate client in a complex arbitration matter involving a multi-crore dispute and achieved a favourable award.",
  },
  {
    id: 2,
    title: "Landmark Corporate Compliance Case",
    summary: "Our legal strategy protected the client from heavy penalties and set a compliance benchmark in the industry.",
  },
  {
    id: 3,
    title: "Real Estate Dispute Resolved Before Trial",
    summary: "Through strategic negotiations, a 5-year real estate conflict was resolved without litigation.",
  },
];

export default function CaseStudies() {
  return (
    <section className="case-section">
      <div className="case-title-block">
        <h2>Case Studies</h2>
        <p>Powerful legal solutions delivered with precision.</p>
      </div>

      <div className="case-wrapper">
        {data.map((caseItem) => (
          <div key={caseItem.id} className="case-premium-card">
            <div className="left-bar"></div>

            <div className="case-content">
              <h3>{caseItem.title}</h3>
              <p>{caseItem.summary}</p>

              <div className="case-readmore">
                Read More <ArrowRight size={18} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
