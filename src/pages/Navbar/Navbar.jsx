// src/pages/Navbar/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import MobileNavbar from "./MobileNavbar";
import navData from "../../Json/data.json";

const Navbar = () => {
  const navbar = navData["0"]; // load JSON

  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <>
      <nav className="navbar">
        {/* LEFT — LOGO */}
        <h1 className="logo">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            VIDHIK<span>MANTRA</span>
          </Link>
        </h1>

        {/* RIGHT — DESKTOP LINKS + MOBILE HAMBURGER */}
        <div className="nav-right">
          <ul className="nav-links" ref={dropdownRef}>
            {navbar.menu.map((item) =>
              item.type === "single" ? (
                <li key={item.name}>
                  <Link to={item.link}>{item.name}</Link>
                </li>
              ) : (
                <li key={item.name} className="nav-item dropdown-wrapper">
                  <button
                    className="dropdown-toggle"
                    onClick={() => toggleDropdown(item.name)}
                  >
                    {item.name}
                    <span
                      className={`caret ${
                        openDropdown === item.name ? "open" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`dropdown dropup ${
                      openDropdown === item.name ? "show" : ""
                    }`}
                  >
                    <ul>
                      {item.items.map((sub) => (
                        <li key={sub.name}>
                          <Link to={sub.link} onClick={() => setOpenDropdown(null)}>
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              )
            )}
          </ul>

          {/* MOBILE HAMBURGER */}
          <div
            className="hamburger"
            onClick={() => setOpen(!open)}
            role="button"
            aria-label="Toggle menu"
          >
            <span className={open ? "line line1 active" : "line line1"}></span>
            <span className={open ? "line line2 active" : "line line2"}></span>
            <span className={open ? "line line3 active" : "line line3"}></span>
          </div>
        </div>
      </nav>

      {open && <MobileNavbar closeMenu={() => setOpen(false)} />}
    </>
  );
};

export default Navbar;
