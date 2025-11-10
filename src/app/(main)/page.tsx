
import React from "react";
import Reviews from "../components/reviews";
import WhyUs from "../components/why";
import HeroSection from "../components/hero";
import ImageCarousel from "../components/carousel";
import Explore from "../components/explore";
import CTASection from "../components/cta";
import Stats from "../components/stats";


const page = () => {
  return (
    <div className="mt-20 p-4 w-full min-h-screen ">
      <div className="flex flex-col gap-8">
        <HeroSection />
        <ImageCarousel />
        <Stats/>
        <WhyUs />
       <Explore/>

        <Reviews />
        <CTASection/>
      </div>
    </div>
  );
};

export default page;
