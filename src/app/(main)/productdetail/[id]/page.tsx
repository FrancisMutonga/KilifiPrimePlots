"use client";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/client";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  images: string[];
  description: string;
  features: string[];
  category_id: string;
  price: string;
  unitsavailable: string;
  category?: { name: string } | null;
  available: boolean;
}
interface Category {
  name?: string;
}

export default function Page() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { id } = useParams<{ id: string }>();

 useEffect(() => {
  if (!id) {
    setError("Product ID is missing.");
    setLoading(false);
    return;
  }

  const fetchProduct = async () => {
    try {
      setLoading(true);

      // 🔹 Fetch the product document from Firestore
      const docRef = doc(db, "plots", id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setError("Product not found.");
        return;
      }

      const data = docSnap.data() as Product;

      // 🔹 Parse features if it's a string
      const parsedFeatures =
        typeof data.features === "string"
          ? JSON.parse(data.features)
          : data.features;

      // 🔹 Fetch category document using category_id from product
      let categoryObj: { name: string } | null = null;
      if (data.category_id) {
        const catRef = doc(db, "category", data.category_id);
        const catSnap = await getDoc(catRef);
        if (catSnap.exists()) {
          const catData = catSnap.data() as Category;
          categoryObj = { name: catData.name || "Unknown Category" };
        }
      }

      const transformedProduct: Product = {
        id: docSnap.id,
        name: data.name,
        images: Array.isArray(data.images) ? data.images : ["/default-image.jpg"],
        description: data.description || "",
        features: Array.isArray(parsedFeatures)
          ? parsedFeatures
          : ["No features listed"],
        category_id: data.category_id || "",
        category: categoryObj,
        price: data.price,
        unitsavailable: data.unitsavailable || "",
        available: data.available,
      };

      setProduct(transformedProduct);
    } catch (err) {
      setError("Failed to fetch product.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [id]);

   if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-kilifigreen"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-red-500">
        {error}
      </div>
    );
  }

  if (!product) {
    return notFound();
  }

  const categoryName = product.category?.name || "Unknown Category";

  // Carousel navigation
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4 mt-10">
      <div className="max-w-4xl w-full bg-beige/85 rounded-xl shadow-xl  p-8">
        {/* Product Header */}
        <h1 className="text-4xl font-bold text-center text-kilifigreen mb-6">
          {product.name}
        </h1>

        <div className="relative w-full h-96 flex items-center justify-center">
          {/* Sold Out Tag */}
          {!product.available && (
            <div className="absolute top-0 left-0 w-40 h-40 overflow-hidden z-20">
              <div className="absolute top-6 -left-12 w-52 bg-red-600 text-white text-center font-bold text-xs tracking-widest transform -rotate-45 shadow-lg py-2">
                SOLD OUT
              </div>
            </div>
          )}

          {/* Image Carousel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={product.images[currentIndex]}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute w-full h-full"
            >
              <Image
                src={product.images[currentIndex]}
                alt={`Image ${currentIndex + 1}`}
                layout="fill"
                objectFit="cover"
                className={`rounded-lg shadow-md ${
                  !product.available ? "opacity-70" : ""
                }`}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 bg-white/20 p-2 rounded-full shadow-md"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 bg-white/20 p-2 rounded-full shadow-md"
          >
            <ChevronRight size={24} />
          </button>

          {/* Pagination Dots */}
          <div className="absolute bottom-4 flex space-x-2">
            {product.images.map((_, index) => (
              <span
                key={index}
                className={`h-3 w-3 rounded-full cursor-pointer ${
                  currentIndex === index ? "bg-kilifigreen" : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-8 space-y-4 text-gray-700">
          <p className="text-lg">
            <span className="font-semibold text-gray-900">Description:</span>{" "}
            {product.description}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-900">Features:</span>
          </p>

          <ul className="list-disc pl-5">
            {product.features?.map((feature: string, index: number) => (
              <li key={index} className="text-lg text-gray-700">
                {feature}
              </li>
            ))}
          </ul>

          <p className="text-lg">
            <span className="font-semibold text-gray-900">Category:</span>{" "}
            {categoryName}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-900">Price:</span>{" "}
            {product.price}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-900">
              Available units:
            </span>{" "}
            {product.unitsavailable}
          </p>
          <p
            className={`text-md font-semibold ${
              product.available ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.available ? "Available" : "Sold Out"}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-center justify-center mt-8">
          {/* CTA: Book Site Visit */}
          <div className="mt-4 text-center">
            <a
              href="https://wa.me/+254708091755?text=I'm%20interested%20in%20booking%20a%20site%20visit%20for%20this%20property."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-kilifigreen  sm:text-sm md:text-md lg:text-lg  text-white p-3 rounded-full font-semibold hover:bg-green-700 transition px-6 py-3"
            >
              Book Site Visit
            </a>
          </div>

          {/* Back to Products */}
          <div className="mt-4 text-center">
            <a
              href="/products"
              className="text-kilifigreen font-semibold hover:underline border border-kilifigreen rounded-full px-6 py-3"
            >
              Back to Products
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
