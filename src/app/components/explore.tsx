"use client";
import React from "react";
import Link from "next/link";

import { useEffect, useState } from "react";
import { supabase } from "./../supabaseClient";
import ProductCard from "./productcard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Product {
    id: string;
    name: string;
    image: string;
    location: string;
    price: string;
  }
  const Explore = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const { data, error } = await supabase.from("plots").select("*");
          if (error) {
            console.error("Error fetching products", error);
            return;
          }
          setProducts(data || []);
        } catch (err) {
          console.error("Failed to fetch products", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProducts();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
    return(  
        <div>
            {/* Explore Section */}
    <section className="my-8 ">
      <h2 className="text-3xl font-bold text-dark mb-8 text-center">
        Explore Our Collection
      </h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        loop={true}
        
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Link key={product.id} href={`/productdetail/${product.id}`} passHref>
        <div className="cursor-pointer">
          <ProductCard name={product.name} image={product.image} location={product.location} price={product.price}/>
        </div>
      </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
        </div>
        );
  };
  export default Explore