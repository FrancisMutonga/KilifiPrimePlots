"use client";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

interface Review {
  name: string;
  title: string;
  profilePic: string;
  testimony: string;
  date: string;
}

interface ReviewsProps {
  className?: string;
}

const Reviews: React.FC<ReviewsProps> = ({ className }) => {
  const reviews: Review[] = [
    {
      name: "Michael Kamau",
      title: "Real Estate Investor",
      profilePic: "/review1.jpg",
      testimony:
        "Kilifi Prime Plots made the process of buying land smooth and easy. Their customer service is exceptional, and the location is ideal for investment. Highly recommended!",
      date: "Nov 15, 2024",
    },
    {
      name: "Grace Mwangi",
      title: "Homebuyer",
      profilePic: "/review2.jpg",
      testimony:
        "I found my dream plot through Kilifi Prime Plots. The location is peaceful, and the team was incredibly supportive. I’m excited to build my home here!",
      date: "Nov 12, 2024",
    },
    {
      name: "John Ochieng",
      title: "Developer",
      profilePic: "/review3.jpg",
      testimony:
        "As a property developer, I always look for prime locations, and Kilifi Prime Plots offers just that. The investment potential here is tremendous, and I look forward to future projects.",
      date: "Nov 10, 2024",
    },
  ];

  return (
    <section className={`py-16 mb-10 ${className}`} style={{ opacity: 0.75 }}>
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-extrabold text-dark text-center mb-12">
          Testimonial
        </h2>
        <div className="hidden md:block">
          {/* Grid display for larger screens */}
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-kilifigreen shadow-xl rounded-xl p-6 flex flex-col justify-between transition-transform hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <Image
                    src={review.profilePic}
                    alt={`${review.name}'s profile`}
                    width={64}
                    height={64}
                    className="rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="text-xl text-white font-bold">
                      {review.name}
                    </h3>
                    <p className="text-sm text-white">{review.title}</p>
                  </div>
                </div>
                <p className="text-white italic mb-4">{`"${review.testimony}"`}</p>
                <p className="text-sm text-white text-right">{review.date}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="md:hidden">
          {/* Carousel display for smaller screens */}
          <Carousel
            showThumbs={false}
            autoPlay
            infiniteLoop
            interval={3000}
            showStatus={false}
            showIndicators={false}
            showArrows={false}
            className="mb-8"
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-kilifigreen shadow-xl rounded-xl p-6 shadow-lg flex flex-col justify-between transition-transform hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <Image
                    src={review.profilePic}
                    alt={`${review.name}'s profile`}
                    width={64}
                    height={64}
                    className="rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="text-xl text-white font-bold">
                      {review.name}
                    </h3>
                    <p className="text-sm text-white">{review.title}</p>
                  </div>
                </div>
                <p className="text-white italic mb-4">{`"${review.testimony}"`}</p>
                <p className="text-sm text-white text-right">{review.date}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
