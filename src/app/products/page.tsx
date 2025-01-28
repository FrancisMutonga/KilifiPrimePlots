"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import ProductCard from "../components/productcard";
import Link from "next/link";
import Image from "next/image";
import Hero from "../components/news";

interface Product {
  id: string;
  name: string;
  image: string;
  location: string;
  price: string;
  category:Category[];
}

interface Category {
  id: string;
  name: string;
  icon: string;
}
interface ProductResponse {
  id: string;
  name: string;
  image: string;
  location: string;
  price: string;
  category: Category[] | Category | null; // categories can be either an array or a single object or null
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
        const { data, error } = await supabase
          .from("category")
          .select("id, name, icon");

        if (error) {
          console.error(error.message);
          setError("Failed to fetch categories.");
        } else {
          setCategories(data || []);
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching categories.");
      }
    };

    fetchCategories();
  }, []);

  // Fetch products based on selected category
 // Fetch products based on selected category
useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from("plots")
        .select("id, name, image, price, location, category(id, name, icon)");

      if (selectedCategory) {
        query = query.eq("category.name", selectedCategory); // Match category by name
      }

      const { data, error } = await query;

      if (error) {
        console.error(error.message);
        setError("Failed to load products.");
      } else {
        // Map the data to fit the Product interface
        const validatedProducts: Product[] = (data as ProductResponse[]).map(
          (product) => ({
            ...product,
            category: Array.isArray(product.category)
              ? product.category
              : product.category
              ? [product.category]
              : [], // Normalize to array
          })
        );

        setProducts(validatedProducts);
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching products.");
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [selectedCategory]);

// Filter products based on selected category
const filteredProducts = selectedCategory
  ? products.filter((product) =>
      product.category?.some(
        (category) => category?.name === selectedCategory // Safeguard against undefined
      )
    )
  : products;


  return (
    <div className="mt-20 p-6 flex flex-col gap-4">
      

      {/* Category Filter */}
      <div className="fixed top-30 left-1/2 transform -translate-x-1/2 w-full flex items-center justify-center text-kilifigreen space-x-4 z-50">
        {categories.length > 0 ? (
          categories.map((category) => (
            <button
              key={category.name}
              className={`flex flex-col items-center justify-center${selectedCategory === category.name ? "text-dark" : ""}`} // Check by id, not name
              onClick={() => setSelectedCategory(category.name)}
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

      {/* Loading & Error States */}
      {loading && <p className="text-center">Loading products...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {filteredProducts.length === 0 && !loading && !error && (
        <p className="text-center">No products available in this category.</p>
      )}
      <div className="mt-40">
      <Hero/>
      <h1 className="text-3xl font-bold text-dark text-center mb-8">Available Plots</h1>
      </div>
     

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/productdetail/${product.id}`} passHref>
            <div className="cursor-pointer">
              <ProductCard name={product.name} image={product.image} location={product.location} price={product.price}/>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
