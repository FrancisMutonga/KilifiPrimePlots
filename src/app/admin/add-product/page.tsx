"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db, storage } from "../../firebase/client";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Image from "next/image";

interface Category {
  id: string;
  name: string;
}

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [unitsavailable, setUnitsavailable] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false); // Prevent duplicate submissions
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const snapshot = await getDocs(collection(db, "category"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Category[];

        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
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
      try {
        const fileName = `${Date.now()}-${file.name}`;
        const storageRef = ref(storage, `images/${fileName}`);

        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        uploadedUrls.push(downloadURL);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert(`Failed to upload ${file.name}`);
      }
    }

    setImages((prev) => [...prev, ...uploadedUrls]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !description.trim() ||
      !price.trim() ||
      !category.trim() ||
      !location.trim() ||
      images.length === 0
    ) {
      alert("Please fill in all fields and upload at least one image.");
      return;
    }

    if (loading) return; // Prevent multiple clicks
    setLoading(true);

    try {
      await addDoc(collection(db, "plots"), {
        name,
        description,
        features,
        price,
        category_id: category,
        location,
        images,
        unitsavailable,
        available: true,
        createdAt: new Date(),
      });

      alert("Product added successfully!");

      setName("");
      setDescription("");
      setFeatures([]);
      setPrice("");
      setCategory("");
      setLocation("");
      setUnitsavailable("");
      setImages([]);
      setImageFiles([]);

      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden mt-8">
      <div className="max-w-3xl mx-auto  p-6 flex flex-col gap-4">
        <h2 className="text-2xl lg:text-5xl font-bold text-center text-kilifigreen">
          Add New Product
        </h2>

        <div className="bg-beige/90 p-6 shadow-md text-black rounded-xl">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full mb-4 bg-white/50 p-2 border border-kilifigreen/40 rounded-xl"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full mb-4 bg-white/50 p-2 border border-kilifigreen/40 rounded-xl"
            />
            <textarea
              value={features.join("\n")} // Convert array to newline-separated string
              onChange={(e) => setFeatures(e.target.value.split("\n"))} // Convert input back to an array
              placeholder="Enter each feature on a new line"
              className="w-full mb-4 bg-white/50 p-2 border border-kilifigreen/40 rounded-xl"
            ></textarea>

            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full mb-4 bg-white/50 p-2 border border-kilifigreen/40 rounded-xl"
            />
            <input
              type="text"
              value={unitsavailable}
              onChange={(e) => setUnitsavailable(e.target.value)}
              placeholder="Available Units"
              className="w-full mb-4 bg-white/50 p-2 border border-kilifigreen/40 rounded-xl"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mb-4 bg-white/50 p-2 border border-kilifigreen/40 rounded-xl"
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
              className="w-full mb-4 bg-white/50 p-2 border border-kilifigreen/40 rounded-xl"
            />

            <div className="mb-4">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="w-full mb-4 bg-white/50 p-2 border border-kilifigreen/40 rounded-xl"
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
              disabled={loading}
              className={`bg-white/50 text-kilifigreen border border-kilifigreen px-6 py-2 rounded-full mx-auto block ${
                loading
                  ? "opacity-50 bg-kilifigreen text-white cursor-not-allowed"
                  : ""
              }`}
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
