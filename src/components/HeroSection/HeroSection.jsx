import React from "react";
import "./HeroSection.css";

const HeroSection = ({ data }) => {
  if (!data) return null;

  return (
    <section className="vm-hero" aria-labelledby="vm-hero-heading">
      {/* Background image */}
      <div
        className="vm-hero-bg"
        style={{
          backgroundImage: `url(${data.backgroundImage})`,
        }}
      />

      <div className="vm-hero-inner">
        {/* LEFT SIDE */}
        <div className="vm-hero-left">
          <h1 id="vm-hero-heading" className="vm-title">
            <span className="vm-brand">{data.brand}</span>
            <span className="vm-tagline"> — {data.tagline}</span>
          </h1>

          <p className="vm-sub">{data.subtitle}</p>

          <div className="vm-cta-row">
            <a className="vm-btn vm-btn-primary" href={data.ctaPrimary.link}>
              {data.ctaPrimary.label}
            </a>
            <a className="vm-btn vm-btn-outline" href={data.ctaSecondary.link}>
              {data.ctaSecondary.label}
            </a>
          </div>
        </div>

        {/* RIGHT SIDE CARDS */}
        <div className="vm-hero-right">
          {data.cards?.map((card, idx) => (
            <article className="vm-card vm-card-premium" key={idx}>
              <div className="vm-card-icon">{card.category}</div>
            </article>
          ))}
        </div>
      </div>

      <div className="vm-hero-wave" />
    </section>
  );
};

export default HeroSection;
