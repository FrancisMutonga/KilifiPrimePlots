"use client";

import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/client";
import ProductCard from "../../components/productcard";
import Link from "next/link";
import Image from "next/image";
import Hero from "../../components/news";

interface Product {
  id: string;
  name: string;
  images: string[];
  location: string;
  price: string;
  category: Category | null;
  category_id: string;
  available: boolean;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const snapshot = await getDocs(collection(db, "category"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Category[];
        setCategories(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch categories.");
      }
    };

    fetchCategories();
  }, []);

  // Fetch products
 useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(collection(db, "plots"));
      const data = snapshot.docs.map((doc) => {
        const docData = doc.data() as any;

        // Find the category object from categories array
        const categoryObj = categories.find(
          (c) => c.id === docData.category_id
        ) || null;

        return {
          id: doc.id,
          name: docData.name,
          images: docData.images,
          location: docData.location,
          price: docData.price,
          available: docData.available,
          category: categoryObj,
          category_id: docData.category_id,
        } as Product;
      });

      setProducts(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  if (categories.length > 0) fetchProducts(); // wait until categories are loaded
}, [categories]);

const filteredProducts = selectedCategory
  ? products.filter((product) => product.category_id === selectedCategory)
  : products;

  return (
    <div className="mt-20 p-6 flex flex-col gap-4">
      <Hero />

      {loading && <p className="text-center">Loading products...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {filteredProducts.length === 0 && !loading && !error && (
        <p className="text-center">No products available in this category.</p>
      )}

      {/* Category Filter */}
      <div className="w-full flex items-center justify-center text-kilifigreen space-x-4 z-50">
        {categories.length > 0 ? (
          categories.map((category) => (
            <button
              key={category.id} // ✅ use ID as key
              className={`flex flex-col items-center justify-center ${
                selectedCategory === category.id ? "text-dark" : ""
              }`}
              onClick={() => setSelectedCategory(category.id)} // ✅ select by ID
            >
              <Image
                src={category.icon.trimEnd() || "/icons/default.png"}
                alt={category.name}
                width={100}
                height={100}
                className="object-contain"
              />
              <span>{category.name}</span>
            </button>
          ))
        ) : (
          <p>No categories available</p>
        )}
      </div>

      <h1 className="text-3xl font-bold text-dark text-center mb-8">
        Available Plots
      </h1>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/productdetail/${product.id}`} passHref>
            <div className="cursor-pointer">
              <ProductCard
                name={product.name}
                images={product.images}
                location={product.location}
                available={product.available}
                price={product.price}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;