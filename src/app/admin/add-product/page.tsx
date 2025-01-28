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
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]); // Use Category type for categories state
  const router = useRouter();

  // Fetch categories from the categories table
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("category").select("id, name");
      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        setCategories(data || []); // data is now typed as Category[]
      }
    };
    fetchCategories();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file); // Set the file for preview

      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `images/${fileName}`;

      // Upload image to Supabase Storage
      const { error } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (error) {
        console.error("Error uploading image", error);
        return;
      }

      // Fetch the public URL of the uploaded image
      const publicUrlData = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      if (publicUrlData.data?.publicUrl) {
        setImage(publicUrlData.data.publicUrl);  // Successfully set the image URL
      } else {
        console.error("Error: publicUrl not found.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
  
    // Check if all fields are filled in and if the image URL is set
    if (!name.trim() || !description.trim() || !price.trim() || !category.trim() || !location.trim() || !image.trim()) {
      alert("Please fill in all fields and upload an image.");
      return;
    }
  
    const { error } = await supabase
      .from("products")
      .insert([
        {
          name,
          description,
          price,
          category_id: category,
          location,
          image: image,
        },
      ]);
  
    if (error) {
      console.error("Error adding product", error);
    } else {
      alert("Product added successfully!");
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen  p-6 mt-20 flex flex-col items-center justify-center">
      <h2 className="text-2xl mb-4 text-kilifigreen">Add New Product</h2>

      <div className="bg- p-6 shadow-md text-black grid-place-items-center rounded">
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
            placeholder="price"
            className="w-full mb-4 bg-gray-100 p-2 border border-gray-300 rounded"
          />

          {/* Category Dropdown */}
          <select
            value={category} // Set category to category_id
            onChange={(e) => setCategory(e.target.value)} // Set the category_id
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

          {/* Image Upload Section */}
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 bg-gray-200 border border-gray-300 rounded"
            />

            {/* Display Preview of Image Before Upload */}
            {imageFile && (
              <div className="mt-4">
                <Image
                  src={URL.createObjectURL(imageFile)} // Display the file preview
                  alt="Image Preview"
                  className="w-32 h-32 object-cover rounded"
                />
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
