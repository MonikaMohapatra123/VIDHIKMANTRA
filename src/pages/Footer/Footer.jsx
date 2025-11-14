import React from "react";
import { Link } from "react-router-dom";
import footerData from "../../Json/data.json"; // adjust path
import "./Footer.css";

const Footer = () => {
  const data = footerData["2"]; // footer JSON block

  if (!data) return null;

  return (
    <footer className="vm-footer">

      {/* TOP BAR */}
      <div className="vm-topbar">
        <p>{data.topbarText}</p>
      </div>

      {/* MAIN FOOTER */}
      <div className="vm-main container">

        {/* COLUMN 1 — BRAND */}
        <div className="vm-col">
          <h2 className="vm-logo">
            <img src={data.brand.logo} alt="logo" />
          </h2>
          <p className="vm-desc">{data.brand.description}</p>
        </div>

        {/* COLUMN 2 — PRACTICE AREAS */}
        <div className="vm-col">
          <h4>{data.practiceAreas.title}</h4>
          <ul>
            {data.practiceAreas.items.map((item, i) => (
              <li key={i}>
                <Link to={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMN 3 — QUICK LINKS */}
        <div className="vm-col">
          <h4>{data.quickLinks.title}</h4>
          <ul>
            {data.quickLinks.items.map((item, i) => (
              <li key={i}>
                <Link to={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMN 4 — CONTACT */}
        <div className="vm-col">
          <h4>{data.contact.title}</h4>
          <p>{data.contact.address}</p>
          <p>Phone: {data.contact.phone}</p>
          <p>Email: {data.contact.email}</p>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="vm-bottom">
        {data.copyright}
      </div>

    </footer>
  );
};

export default Footer;
