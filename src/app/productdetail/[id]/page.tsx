"use client";

import { supabase } from "../../supabaseClient";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";


interface Product {
  id: string;
  name: string;
  image: string | null;
  description: string;
  category_id: string;
  price: string;
  unitsavailable:string;
  category?: { name: string } | null; // Single object for category
}

export default function Page() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
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
            "id, name, image, description, category_id, unitsavailable, price, category(name)"
          )
          .eq("id", id)
          .single();

        if (error || !data) {
          setError("Product not found.");
          return;
        }

       
        const transformedProduct = {
          ...data,
          category: data.category && data.category.length > 0 ? data.category[0] : null,
        };

        setProduct(transformedProduct as Product);
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

  const image = product.image || "/default-image.jpg"; 
  const categoryName = product.category?.name || "Unknown Category"; 

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4 mt-10">
      <div className="max-w-4xl w-full bg-beige/70 rounded-xl shadow-lg border border-gray-200 p-8">
        {/* Product Header */}
        <h1 className="text-4xl font-bold text-center text-kilifigreen mb-6">
          {product.name}
        </h1>

        {/* Product Content */}
        <div className="flex flex-col gap-8">
          {/* Image */}
          <div className="flex-1 flex items-center justify-center">
            <Image
              src={image}
              alt={product.name}
              width={500}
              height={500}
              className="rounded-lg object-cover shadow-md"
            />
          </div>

          {/* Details */}
          <div className="flex-1 text-gray-700 space-y-4">
            <p className="text-lg">
              <span className="font-semibold text-gray-900">Description:</span>{" "}
              {product.description}
            </p>
            <p className="text-lg">
              <span className="font-semibold text-gray-900">Category:</span>{" "}
              {categoryName}
            </p>
            <p className="text-lg">
              <span className="font-semibold text-gray-900">Price:</span>{" "}
              {product.price}
            </p>
            <p className="text-lg">
              <span className="font-semibold text-gray-900">Available units:</span>{" "}
              {product.unitsavailable}
            </p>
          </div>

          
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <a
            href="/products"
            className="text-kilifigreen font-semibold hover:underline"
          >
            Back to Products
          </a>
        </div>
      </div>
    </div>
  );
}
