
import React from "react";
import Reviews from "./components/reviews";
import WhyUs from "./components/why";
import HeroSection from "./components/hero";
import ImageCarousel from "./components/carousel";
import Explore from "./components/explore";


const page = () => {
  return (
    <div className="mt-20 p-4 w-full ">
      <div className="flex flex-col gap-8">
        <HeroSection />
        <ImageCarousel />
        <WhyUs />
       <Explore/>

        <Reviews />
      </div>
    </div>
  );
};

export default page;
