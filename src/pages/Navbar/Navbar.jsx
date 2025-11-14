import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import MobileNavbar from "./MobileNavbar";
import navData from "../../Json/data.json";

const Navbar = () => {
  const navbar = navData["0"];
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    }
    function handleEsc(e) {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <>
    <nav className="vm-navbar vm-navbar-minimal" role="navigation" aria-label="Main navigation">

        <div className="vm-navbar-left">
          <Link to="/" className="vm-logo-wrap" aria-label={`${navbar.siteName} - Home`}>
            <img src={navbar.logo} alt="logo" className="vm-logo-img" />
            <div className="vm-site-text">
              <span className="vm-site-name">{navbar.siteName}</span>
              {navbar.tag && <span className="vm-site-tag">{navbar.tag}</span>}
            </div>
          </Link>
        </div>

        <div className="vm-navbar-right">
          <ul className="vm-nav-links" ref={dropdownRef}>
            {navbar.menu.map((item) =>
              item.type === "single" ? (
                <li key={item.name} className="vm-nav-item">
                  <Link to={item.link} className="vm-nav-link" onClick={() => setOpen(false)}>
                    {item.name}
                  </Link>
                </li>
              ) : (
                <li key={item.name} className="vm-nav-item dropdown-wrapper">
                  <button
                    className="vm-dropdown-toggle"
                    onClick={() => toggleDropdown(item.name)}
                    aria-expanded={openDropdown === item.name}
                    aria-controls={`menu-${item.name}`}
                  >
                    {item.name}
                    <span className={`vm-caret ${openDropdown === item.name ? "open" : ""}`} />
                  </button>

                  <div
                    id={`menu-${item.name}`}
                    className={`vm-dropdown ${openDropdown === item.name ? "show" : ""}`}
                    role="menu"
                    aria-hidden={openDropdown !== item.name}
                  >
                    <ul>
                      {item.items?.map((sub) => (
                        <li key={sub.name} role="none">
                          <Link
                            role="menuitem"
                            to={sub.link}
                            onClick={() => {
                              setOpenDropdown(null);
                              setOpen(false);
                            }}
                          >
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

          <button
            className="vm-hamburger"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className={open ? "vm-line vm-l1 active" : "vm-line vm-l1"} />
            <span className={open ? "vm-line vm-l2 active" : "vm-line vm-l2"} />
            <span className={open ? "vm-line vm-l3 active" : "vm-line vm-l3"} />
          </button>
        </div>
      </nav>

      {open && <MobileNavbar closeMenu={() => setOpen(false)} />}
    </>
  );
};

export default Navbar;
