import React from "react";
import jsonData from "../../Json/data.json";
import HeroSection from "../../components/HeroSection/HeroSection";  // adjust the path if needed
import AboutVidhikMantra from "../../components/AboutVidhikMantra/AboutVidhikMantra";
import HeroJusticeSection from "../../components/HeroJusticeSection/HeroJusticeSection";
import TrustedBySection from "../../components/TrustedBySection/TrustedBySection";


const Home = () => {
   const aboutData = jsonData["1"].aboutSection;
     const heroJusticeData = jsonData["1"].heroJusticeSection;
       const trustedByData = jsonData["1"].trustedBySection;
    
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />
      <AboutVidhikMantra data={aboutData}/>
      <HeroJusticeSection data={heroJusticeData} />
        <TrustedBySection data={trustedByData} />
     
      



    </div>
  );
};

export default Home;
