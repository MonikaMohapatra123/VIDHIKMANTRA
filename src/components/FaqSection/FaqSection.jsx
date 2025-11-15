

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import "./FaqSection.css";

export default function FaqSection({ faqSection }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!faqSection) return null;

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">{faqSection.title}</h2>
        <p className="faq-subtitle">{faqSection.subtitle}</p>

        <div className="faq-grid">
          {faqSection.faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? "active" : ""}`}
            >
              <button className="faq-question" onClick={() => toggleFAQ(index)}>
                <span>{faq.question}</span>
                <span className="faq-icon">
                  {openIndex === index ? <Minus size={22} /> : <Plus size={22} />}
                </span>
              </button>

              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
