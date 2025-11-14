// // Home.jsx (fixed)
// import React from "react";
// import jsonData from "../../Json/data.json";
// import HeroSection from "../../components/HeroSection/HeroSection";
// import AboutVidhikMantra from "../../components/AboutVidhikMantra/AboutVidhikMantra";
// import HeroJusticeSection from "../../components/HeroJusticeSection/HeroJusticeSection";
// import FaqSection from "../../components/FaqSection/FaqSection";
// import CaseStudies from "../../components/CaseStudies/CaseStudies";

// const Home = () => {
//   const aboutData = jsonData["1"].aboutSection;
//   const heroJusticeData = jsonData["1"].heroJusticeSection;
//   // const trustedByData = jsonData["1"].trustedBySection;
//   const faqSectionData = jsonData["1"].faqSection;
//  const caseStuides =jsonData["1"].caseStudiesSection

//   return (
//     <div>
//       <HeroSection />
//       <AboutVidhikMantra data={aboutData} />
//       <HeroJusticeSection data={heroJusticeData} />
//       {/* <TrustedBySection data={trustedByData} /> */}
//       <FaqSection faqSection={faqSectionData} />
//       <CaseStudies caseStudiesSection={caseStuides} />

//     </div>
//   );
// };

// export default Home;







import React from "react";
import jsonData from "../../Json/data.json";
import HeroSection from "../../components/HeroSection/HeroSection";
import AboutVidhikMantra from "../../components/AboutVidhikMantra/AboutVidhikMantra";
import HeroJusticeSection from "../../components/HeroJusticeSection/HeroJusticeSection";
import FaqSection from "../../components/FaqSection/FaqSection";
// const trustedByData = jsonData["1"].trustedBySection;
import CaseStudies from "../../components/CaseStudies/CaseStudies";

const Home = () => {
  const aboutData = jsonData["1"].aboutSection;
  const heroJusticeData = jsonData["1"].heroJusticeSection;
  const faqSectionData = jsonData["1"].faqSection;
  const caseStuides = jsonData["1"].caseStudiesSection;

  return (
    <div>
      <HeroSection />
      <AboutVidhikMantra data={aboutData} />
      <HeroJusticeSection data={heroJusticeData} />
      <FaqSection faqSection={faqSectionData} />
       {/* <TrustedBySection data={trustedByData} /> */}
      <CaseStudies data={caseStuides} />
    </div>
  );
};

export default Home;


