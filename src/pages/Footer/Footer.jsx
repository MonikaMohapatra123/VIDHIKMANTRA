import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="vm-footer">

      {/* TOP BAR */}
      <div className="vm-topbar">
        <p>Advocating Integrity. Delivering Justice.</p>
      </div>

      {/* MAIN FOOTER */}
      <div className="vm-main container">

        {/* COLUMN 1 — BRAND */}
        <div className="vm-col">
          <h2 className="vm-logo">VIDHIK<span>MANTRA</span></h2>
          <p className="vm-desc">
            A trusted legal platform committed to providing ethical,
            strategic and result-oriented advocacy.
          </p>
        </div>

        {/* COLUMN 2 — PRACTICE AREAS */}
        <div className="vm-col">
          <h4>Practice Areas</h4>
          <ul>
            <li>Arbitration</li>
            <li>Civil & Property Disputes</li>
            <li>Criminal Law</li>
            <li>Corporate Law</li>
            <li>Constitutional Matters</li>
          </ul>
        </div>

        {/* COLUMN 3 — QUICK LINKS */}
        <div className="vm-col">
          <h4>Quick Links</h4>
          <ul>
            <li>About</li>
            <li>Case Studies</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* COLUMN 4 — CONTACT */}
        <div className="vm-col">
          <h4>Contact</h4>
          <p>Bhubaneswar, Odisha, India</p>
          <p>Phone: +91 98765 43210</p>
          <p>Email: contact@vidhikmantra.com</p>
        </div>
      </div>

      {/* COPYRIGHT BAR */}
      <div className="vm-bottom">
        © 2025 VIDHIKMANTRA. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;
