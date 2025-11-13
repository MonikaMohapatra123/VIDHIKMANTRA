// Home.jsx (fixed)
import React from "react";
import jsonData from "../../Json/data.json";
import HeroSection from "../../components/HeroSection/HeroSection";
import AboutVidhikMantra from "../../components/AboutVidhikMantra/AboutVidhikMantra";
import HeroJusticeSection from "../../components/HeroJusticeSection/HeroJusticeSection";
import FaqSection from "../../components/FaqSection/FaqSection";

const Home = () => {
  const aboutData = jsonData["1"].aboutSection;
  const heroJusticeData = jsonData["1"].heroJusticeSection;
  const trustedByData = jsonData["1"].trustedBySection;
  const faqSectionData = jsonData["1"].faqSection;

  return (
    <div>
      <HeroSection />
      <AboutVidhikMantra data={aboutData} />
      <HeroJusticeSection data={heroJusticeData} />
      {/* <TrustedBySection data={trustedByData} /> */}
      <FaqSection faqSection={faqSectionData} />
    </div>
  );
};

export default Home;
