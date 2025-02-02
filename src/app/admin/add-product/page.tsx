"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../supabaseClient";
import Image from "next/image";

interface Category {
  id: string;
  name: string;
}

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(""); 
  const [location, setLocation] = useState("");
  const [unitsavailable, setUnitsavailable] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("category").select("id, name");
      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        setCategories(data || []);
      }
    };
    fetchCategories();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
  
    const uploadedUrls: string[] = [];
    const uploadedFiles: File[] = [...imageFiles, ...Array.from(files)];
    setImageFiles(uploadedFiles);
  
    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `images/${fileName}`;
  
      
      const { data, error } = await supabase.storage.from("images").upload(filePath, file);
  
      if (error) {
        console.error("Error uploading image", error.message);
        alert(`Failed to upload ${file.name}: ${error.message}`);
        continue;
      }
  
      
      const publicUrl = supabase.storage.from("images").getPublicUrl(filePath).data.publicUrl;
      if (publicUrl) {
        uploadedUrls.push(publicUrl);
      }
    }
  
    if (uploadedUrls.length > 0) {
      
      const { error: insertError } = await supabase.from("plots").insert([
        { images: uploadedUrls }, 
      ]);
  
      if (insertError) {
        console.error("Error inserting image URLs into database:", insertError.message);
        alert(`Failed to save images: ${insertError.message}`);
        return;
      }
    }
  
    
    setImages((prevImages) => [...prevImages, ...uploadedUrls]);
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 

    if (!name.trim() || !description.trim() || !price.trim() || !category.trim() || !location.trim() || images.length === 0) {
      alert("Please fill in all fields and upload at least one image.");
      return;
    }

    const { error } = await supabase.from("plots").insert([
      {
        name,
        description,
        price,
        category_id: category,
        location,
        images, 
        unitsavailable,
      },
    ]);

    if (error) {
      console.error("Error adding product:", error.message);
      alert("Failed to add product. Please try again.");
    } else {
      alert("Product added successfully!");
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen p-6 mt-20 flex flex-col items-center justify-center">
      <h2 className="text-2xl mb-4 text-kilifigreen">Add New Product</h2>

      <div className="bg-white/40 p-6 shadow-md text-black rounded">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full mb-4 bg-gray-100 p-2 border border-gray-300 rounded"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full mb-4 bg-gray-100 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="w-full mb-4 bg-gray-100 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={unitsavailable}
            onChange={(e) => setUnitsavailable(e.target.value)}
            placeholder="Available Units"
            className="w-full mb-4 bg-gray-100 p-2 border border-gray-300 rounded"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mb-4 bg-gray-100 p-2 border border-gray-300 rounded"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <textarea
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="w-full mb-4 bg-gray-200 p-2 border border-gray-300 rounded"
          />

          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="w-full p-2 bg-gray-200 border border-gray-300 rounded"
            />
            {imageFiles.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {imageFiles.map((file, index) => (
                  <Image
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt="Image Preview"
                    width={50}
                    height={50}
                    className="object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-dark text-white px-6 py-2 rounded mx-auto block"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
