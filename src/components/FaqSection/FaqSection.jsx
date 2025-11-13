// import React, { useState } from "react";
// import { Plus, Minus } from "lucide-react";
// import "./FaqSection.css";

// const faqData = [
//   {
//     question: "How to File an FIR Online in India: Step-by-Step Guide",
//     answer:
//       "To file an FIR online, visit your state police website (e.g., Delhi Police, Maharashtra Police). Navigate to 'Citizen Services' → 'Lodge e-FIR'. Fill in the details like complainant name, incident description, and location. After submission, you’ll receive a confirmation and a copy of the FIR via email or SMS.",
//   },
//   {
//     question:
//       "Legal Rights of Tenants in India: What Landlords Can and Cannot Do",
//     answer:
//       "Tenants are protected under the Rent Control Acts. A landlord cannot evict a tenant without a valid reason and notice. Tenants have the right to receive rent receipts, maintain peaceful possession, and are entitled to reasonable notice before rent increases or property visits by landlords.",
//   },
//   {
//     question:
//       "How to Draft a Legal Notice: Format, Examples, and Common Mistakes",
//     answer:
//       "A legal notice should include the sender’s details, recipient details, subject, legal basis, facts of the case, and a demand for resolution within a specific time (usually 15–30 days). Avoid emotional language or vague statements. Use formal, factual tone and attach supporting documents if necessary.",
//   },
//   {
//     question:
//       "Social Media and the Law: What You Can and Can’t Post in India (Explained Legally)",
//     answer:
//       "Under the IT Act and IPC, posting defamatory, obscene, or false content can invite legal action. Avoid hate speech, copyright violations, or sharing private information. Freedom of speech doesn’t protect defamatory or unlawful content online.",
//   },
//   {
//     question:
//       "Workplace Harassment in India: How to File a Complaint under the POSH Act 2013",
//     answer:
//       "The POSH Act mandates all companies with 10+ employees to have an Internal Complaints Committee (ICC). Complaints must be filed within 3 months of the incident. The ICC investigates and recommends disciplinary action if harassment is proved.",
//   },
// ];

// export default function FaqSection() {
//   const [openIndex, setOpenIndex] = useState(null);


//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <section className="faq-section">
//       <div className="faq-container">
//         <h2 className="faq-title">Legal Awareness & FAQs</h2>
//         <p className="faq-subtitle">
//           Clear answers to common legal questions — empowering you with knowledge.
//         </p>

//         <div className="faq-grid">
//           {faqData.map((faq, index) => (
//             <div
//               key={index}
//               className={`faq-item ${openIndex === index ? "active" : ""}`}
//             >
//               <button className="faq-question" onClick={() => toggleFAQ(index)}>
//                 <span>{faq.question}</span>
//                 <span className="faq-icon">
//                   {openIndex === index ? <Minus size={22} /> : <Plus size={22} />}
//                 </span>
//               </button>

//               <div className="faq-answer">
//                 <p>{faq.answer}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }





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
