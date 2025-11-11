import React, { useState } from "react";
import "./MobileNavbar.css";
import navData from "../../Json/data.json";

const MobileNavbar = ({ closeMenu }) => {
  const navbar = navData["0"]; // load JSON
  const [openSub, setOpenSub] = useState(null);

  const toggleSub = (name) => {
    setOpenSub((prev) => (prev === name ? null : name));
  };

  return (
    <div className="mobile-menu">
      <div className="mobile-top">
        <div className="logo-mobile">
          VIDHIK<span>MANTRA</span>
        </div>
        <div className="close-btn" onClick={closeMenu}>✕</div>
      </div>

      <ul className="mobile-links">
        {navbar.menu.map((item) =>
          item.type === "single" ? (
            <li key={item.name} className="mobile-link" onClick={closeMenu}>
              <a href={item.link}>{item.name}</a>
            </li>
          ) : (
            <li key={item.name} className="mobile-link with-sub">
              <div className="mobile-toggle" onClick={() => toggleSub(item.name)}>
                {item.name}
                <span
                  className={`caret ${
                    openSub === item.name ? "open" : ""
                  }`}
                />
              </div>

              <div className={`mobile-sub ${openSub === item.name ? "show" : ""}`}>
                {item.items.map((sub) => (
                  <div
                    key={sub.name}
                    className="mobile-sub-item"
                    onClick={closeMenu}
                  >
                    <a href={sub.link}>{sub.name}</a>
                  </div>
                ))}
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default MobileNavbar;
