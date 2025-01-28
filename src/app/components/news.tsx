"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { supabase } from "../supabaseClient";
import Image from "next/image";

interface News {
  id: string;
  title: string;
  description: string;
  image?: string;
  publish_date: string;
}

const Hero: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data, error } = await supabase
          .from("news")
          .select("id, title, description, image, publish_date")
          .order("publish_date", { ascending: false });

        if (error) {
          console.error("Failed to fetch news:", error.message);
          return;
        }

        console.log("Fetched news data:", data);
        setNews(data || []);
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="relative w-full mb-20">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop
        className="w-full"
      >
        {news.map((item) => (
          <SwiperSlide key={item.id} className="flex justify-center items-center">
            <div className="relative flex justify-center">
              <Image
                src={item.image || "/default-news-bg.jpg"}
                alt={item.title}
                width={1000} 
                height={500} 
                className="object-contain" 
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
