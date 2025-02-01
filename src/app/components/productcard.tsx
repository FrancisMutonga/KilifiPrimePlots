"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface ProductCardProps {
  name: string;
  images: string[]; // Accept multiple images
  location: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, images, location, price }) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg bg-beige/70 border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
      {/* Image Carousel */}
      <div className="relative w-full h-64">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="h-full"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} className="relative w-full h-full">
              <Image
                src={img}
                alt={`${name} image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Text content */}
      <div className="p-6 flex flex-col space-y-3">
        <h3 className="text-lg font-semibold text-dark">{name}</h3>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Price:</span> {price}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Location:</span> {location}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
