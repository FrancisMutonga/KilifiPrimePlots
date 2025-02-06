"use client";

import { supabase } from "../../supabaseClient";
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
  category_id: string;
  price: string;
  unitsavailable: string;
  category?: { name: string } | null; // Category is a single object, not an array
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
        const { data, error } = await supabase
          .from("plots")
          .select(
            `id, name, images, description, category_id, unitsavailable, price, category(name)`
          )
          .eq("id", id)
          .single(); // Ensure we get only a single object, not an array

        if (error || !data) {
          setError("Product not found.");
          return;
        }

        // Ensure category is an object, not an array
        const transformedProduct: Product = {
          ...data,
          images: Array.isArray(data.images) ? data.images : ["/default-image.jpg"],
          category: data.category && !Array.isArray(data.category) ? data.category : null, // Fix for category issue
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
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-500">
        Loading...
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

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4 mt-10">
      <div className="max-w-4xl w-full bg-beige/70 rounded-xl shadow-lg border border-gray-200 p-8">
        <h1 className="text-4xl font-bold text-center text-kilifigreen mb-6">
          {product.name}
        </h1>

        <div className="relative w-full h-96 flex items-center justify-center">
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
                className="rounded-lg shadow-md"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 space-y-4 text-gray-700">
          <p className="text-lg">
            <span className="font-semibold text-gray-900">Description:</span> {product.description}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-900">Category:</span> {categoryName}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-900">Price:</span> {product.price}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-900">Available units:</span> {product.unitsavailable}
          </p>
        </div>
      </div>
    </div>
  );
}
