import React from "react";
import jsonData from "../../Json/data.json";
import HeroSection from "../../components/HeroSection/HeroSection";  // adjust the path if needed
import AboutVidhikMantra from "../../components/AboutVidhikMantra/AboutVidhikMantra";

const Home = () => {
   const aboutData = jsonData["1"].aboutSection;
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />
      <AboutVidhikMantra data={aboutData}/>

    </div>
  );
};

export default Home;
