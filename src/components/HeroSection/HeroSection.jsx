// import React from "react";
// import data from "../../Json/data.json";
// import "./HeroSection.css";

// const HeroSection = () => {
//   // Load hero data
//   const hero = data["1"].heroSection;

//   return (
//     <section className="vm-hero" aria-labelledby="vm-hero-heading">
//       {/* Background image */}
//       <div
//         className="vm-hero-bg"
//         role="img"
//         aria-hidden="true"
//         style={{
//           backgroundImage: `url(${hero.backgroundImage})`,
//         }}
//       />

//       <div className="vm-hero-inner">

//         {/* LEFT SIDE - Text */}
//         <div className="vm-hero-left">
//           <h1 id="vm-hero-heading" className="vm-title">
//             <span className="vm-brand">{hero.brand}</span>
//             <span className="vm-tagline"> — {hero.tagline}</span>
//           </h1>

//           <p className="vm-sub">{hero.subtitle}</p>

//           <div className="vm-cta-row">
//             <a
//               className="vm-btn vm-btn-primary"
//               href={hero.ctaPrimary.link}
//               aria-label={hero.ctaPrimary.label}
//             >
//               {hero.ctaPrimary.label}
//             </a>

//             <a
//               className="vm-btn vm-btn-outline"
//               href={hero.ctaSecondary.link}
//               aria-label={hero.ctaSecondary.label}
//             >
//               {hero.ctaSecondary.label}
//             </a>
//           </div>

//           <ul className="vm-keytopics" aria-hidden="true">
//             {hero.keyTopics.map((topic, idx) => (
//               <li key={idx}>{topic}</li>
//             ))}
//           </ul>
//         </div>

//         {/* RIGHT SIDE - Cards */}
//         <div className="vm-hero-right" aria-live="polite">
//           {hero.cards.map((c, idx) => (
//             <article className="vm-card" key={idx}>
//               <div className="vm-card-cat">{c.category}</div>
//               <h3 className="vm-card-title">{c.headline}</h3>
//             </article>
//           ))}
//         </div>

//       </div>

//       {/* Decorative Wave */}
//       <div className="vm-hero-wave" aria-hidden="true" />
//     </section>
//   );
// };

// export default HeroSection;












import React from "react";
import data from "../../Json/data.json";
import "./HeroSection.css";

const HeroSection = () => {
  const hero = data["1"].heroSection;

  return (
    <section className="vm-hero" aria-labelledby="vm-hero-heading">
      {/* Background image */}
      <div
        className="vm-hero-bg"
        style={{
          backgroundImage: `url(${hero.backgroundImage})`,
        }}
      />

      <div className="vm-hero-inner">
        {/* LEFT SIDE */}
        <div className="vm-hero-left">
          <h1 id="vm-hero-heading" className="vm-title">
            <span className="vm-brand">{hero.brand}</span>
            <span className="vm-tagline"> — {hero.tagline}</span>
          </h1>

          <p className="vm-sub">{hero.subtitle}</p>

          <div className="vm-cta-row">
            <a className="vm-btn vm-btn-primary" href={hero.ctaPrimary.link}>
              {hero.ctaPrimary.label}
            </a>
            <a className="vm-btn vm-btn-outline" href={hero.ctaSecondary.link}>
              {hero.ctaSecondary.label}
            </a>
          </div>

          <ul className="vm-keytopics">
            {hero.keyTopics.map((topic, idx) => (
              <li key={idx}>{topic}</li>
            ))}
          </ul>
        </div>

        {/* RIGHT SIDE - refined cards */}
        <div className="vm-hero-right">
          {hero.cards.map((c, idx) => (
            <article className="vm-card vm-card-premium" key={idx}>
              <div className="vm-card-icon">{c.category}</div>
            </article>
          ))}
        </div>
      </div>

      <div className="vm-hero-wave" />
    </section>
  );
};

export default HeroSection;

