import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

import { getstoredata } from "../../Json/fetchData";

const Footer = () => {
  const [data, setData] = useState(null);

  // Load footer JSON (key "2") from localStorage
  useEffect(() => {
    const stored = getstoredata();

    if (stored) {
      setData(stored["2"]); // footer block
    } else {
      // fetchData.js might still be fetching → retry
      const timer = setTimeout(() => {
        const retry = getstoredata();
        if (retry) setData(retry["2"]);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!data) return null; // wait for data

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
