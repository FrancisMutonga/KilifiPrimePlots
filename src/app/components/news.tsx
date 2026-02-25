"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { collection,query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase/client";
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
      const q = query(
        collection(db, "news"),
        orderBy("publish_date", "desc")
      );

      const snapshot = await getDocs(q);

      const data: News[] = snapshot.docs.map((doc) => {
        const docData = doc.data();

        return {
          id: doc.id,
          title: docData.title || "",
          description: docData.description || "",
          image: docData.image || "",
          publish_date: docData.publish_date?.toDate
            ? docData.publish_date.toDate()
            : new Date(docData.publish_date) 
        };
      });

      setNews(data);
    } catch (err) {
      console.error("Failed to fetch news:", err);
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
