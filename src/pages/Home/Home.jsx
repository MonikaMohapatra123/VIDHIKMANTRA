import React, { useEffect, useState } from "react";
import { getstoredata } from "../../Json/fetchData";

import HeroSection from "../../components/HeroSection/HeroSection";
import AboutVidhikMantra from "../../components/AboutVidhikMantra/AboutVidhikMantra";
import HeroJusticeSection from "../../components/HeroJusticeSection/HeroJusticeSection";
import FaqSection from "../../components/FaqSection/FaqSection";
import CaseStudies from "../../components/CaseStudies/CaseStudies";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let stored = getstoredata();
    setData(stored);

    if (!stored) {
      const timer = setTimeout(() => {
        stored = getstoredata();
        setData(stored);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!data) return null;

  const heroData = data["1"]?.heroSection;
  const aboutData = data["1"]?.aboutSection;
  const heroJusticeData = data["1"]?.heroJusticeSection;
  const faqSectionData = data["1"]?.faqSection;
  const caseStudiesData = data["1"]?.caseStudiesSection;

  return (
    <div>
      <HeroSection data={heroData} />
      <AboutVidhikMantra data={aboutData} />
      <HeroJusticeSection data={heroJusticeData} />
      <FaqSection faqSection={faqSectionData} />
      <CaseStudies data={caseStudiesData} />
    </div>
  );
}
