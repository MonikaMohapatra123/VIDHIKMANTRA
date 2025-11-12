// // src/components/TrustedBySection.jsx
// import React from "react";
// import { Shield, Scale, Landmark, Gavel } from "lucide-react";
// import "./TrustedBySection.css";

// export default function TrustedBySection() {
//   const logos = [
//     { icon: <Shield size={48} color="#D4AF37" />, name: "Secure Legal Services" },
//     { icon: <Scale size={48} color="#D4AF37" />, name: "Justice League Partners" },
//     { icon: <Landmark size={48} color="#D4AF37" />, name: "National Law Board" },
//     { icon: <Gavel size={48} color="#D4AF37" />, name: "Court Certified Advocates" },
//   ];

//   return (
//     <section className="trustedby-section">
//       <div className="trustedby-container">
//         <h2 className="trustedby-title">Trusted By Reputed Legal Institutions</h2>
//         <p className="trustedby-subtitle">
//           Our ethical values and proven expertise have earned the trust of clients and legal institutions across the nation.
//         </p>

//         <div className="trustedby-logos">
//           {logos.map((item, index) => (
//             <div className="trustedby-card" key={index}>
//               <div className="trustedby-icon">{item.icon}</div>
//               <h4 className="trustedby-name">{item.name}</h4>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }





// src/components/TrustedBySection.jsx
import React from "react";
import * as Icons from "lucide-react";
import "./TrustedBySection.css";

export default function TrustedBySection({ data = {} }) {
  const { title, subtitle, logos = [] } = data;

  return (
    <section className="trustedby-section">
      <div className="trustedby-container">
        <h2 className="trustedby-title">{title}</h2>
        <p className="trustedby-subtitle">{subtitle}</p>

        <div className="trustedby-logos">
          {logos.map((item, index) => {
            const Icon = Icons[item.icon] || Icons.Shield;
            return (
              <div className="trustedby-card" key={index}>
                <div className="trustedby-icon">
                  <Icon size={48} color="#D4AF37" />
                </div>
                <h4 className="trustedby-name">{item.name}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
