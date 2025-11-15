

// src/components/TrustedBySection.jsx
import React from "react";
import * as Icons from "lucide-react";
import "./TrustedBySection.css";

export default function TrustedBySection({ data = {} }) {
  const { title, subtitle, logos = [] } = data;

  return (
    <section className="trustedby-section">
      <div className="trustedby-container">
        <h2 className="trustedby-title">{title}</h2>
        <p className="trustedby-subtitle">{subtitle}</p>

        <div className="trustedby-logos">
          {logos.map((item, index) => {
            const Icon = Icons[item.icon] || Icons.Shield;
            return (
              <div className="trustedby-card" key={index}>
                <div className="trustedby-icon">
                  <Icon size={48} color="#D4AF37" />
                </div>
                <h4 className="trustedby-name">{item.name}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
