
import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import "./HeroJusticeSection.css";

export default function HeroJusticeSection({ data = {} }) {
  const {
    backgroundImage,
    icon = "Scale",
    title,
    subtitle,
    button,
    floatingIcon,
  } = data;

  // Dynamically get icons from lucide-react
  const MainIcon = Icons[icon] || Icons.Scale;
  const FloatingIcon = Icons[floatingIcon?.name] || Icons.Scale;

  return (
    <section className="hero-justice-section">
      {/* Background */}
      <div className="hero-bg">
        <img src={backgroundImage} alt="Law background" />
        <div className="hero-overlay"></div>
      </div>

      {/* Content */}
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="hero-icon-wrapper"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
        >
          <div className="hero-icon">
            <MainIcon size={60} className="scale-icon" />
          </div>
        </motion.div>

        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>

        <motion.a
          href={button?.link || "#"}
          whileHover={{ scale: 1.05 }}
          className="hero-btn"
        >
          {button?.label}
        </motion.a>
      </motion.div>

      {/* Floating Decoration */}
      <motion.div
        className="hero-floating-icon"
        initial={{ y: -30 }}
        animate={{ y: 30 }}
        transition={{ repeat: Infinity, duration: 4, repeatType: "reverse" }}
      >
        <FloatingIcon
          size={floatingIcon?.size || 80}
          className="floating-scale"
        />
      </motion.div>
    </section>
  );
}
