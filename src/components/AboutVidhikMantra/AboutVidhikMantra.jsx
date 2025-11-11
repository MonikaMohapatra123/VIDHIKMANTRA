import React from "react";
import "./AboutVidhikMantra.css";

const AboutVidhikMantra = ({ data }) => {
  if (!data) return null;

  return (
    <section className="about-wrapper">
      <div className="about-image-box">
        <img
          src={data.image}
          alt="VidhikMantra"
          className="about-image"
        />
      </div>

      <div className="about-content">
        <h3 className="small-heading">{data.smallHeading}</h3>

        {/* FIXED: Correct way to render <span> inside heading */}
        <h2
          className="main-heading"
          dangerouslySetInnerHTML={{
            __html: data.mainHeading.replace(
              data.highlight,
              `<span>${data.highlight}</span>`
            )
          }}
        ></h2>

        {data.paragraphs &&
          data.paragraphs.map((para, index) => (
            <p className="about-text" key={index}>
              {para}
            </p>
          ))}

        {data.button && (
          <a href={data.button.link}>
            <button className="about-btn">{data.button.label}</button>
          </a>
        )}
      </div>
    </section>
  );
};

export default AboutVidhikMantra;
