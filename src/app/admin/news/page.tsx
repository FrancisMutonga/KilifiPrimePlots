"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import Image from "next/image";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  publish_date: string;
}

const NewsManagement: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [newNews, setNewNews] = useState({
    title: "",
    description: "",
    image: "",
    publish_date: "",
  });
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Fetching news data
  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from("news")
        .select("id, title, description, image, publish_date")
        .order("publish_date", { ascending: false });

      if (error) {
        console.error("Error fetching news:", error);
      } else {
        setNews(data || []); // Ensure we don't get null
      }
    };

    fetchNews();
  }, []);

  // Handle input changes in the form
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewNews((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      console.error("No file selected");
      return;
    }

    // Define a unique file path to avoid conflicts
    const filePath = `images/${Date.now()}_${file.name}`;

    try {
      // Upload the file to Supabase storage
      const { data, error } = await supabase.storage
        .from("images") // Ensure this matches your bucket name
        .upload(filePath, file);

      if (error) {
        console.error("Error uploading image:", error.message);
        return;
      }

      if (data) {
        console.log("Upload successful:", data);

        // Retrieve the public URL of the uploaded file
        const { data: publicUrlData } = supabase.storage
          .from("images")
          .getPublicUrl(filePath);

        if (!publicUrlData) {
          console.error("Error retrieving public URL");
          return;
        }

        // Update state with the public URL
        setNewNews((prev) => ({
          ...prev,
          image: publicUrlData.publicUrl,
        }));
      }
    } catch (err) {
      console.error("Unexpected error during upload:", err);
    }
  };

  // Handle form submit (Add or Update news)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      // Update existing news
      const { error } = await supabase
        .from("news")
        .update({
          title: newNews.title,
          description: newNews.description,
          image: newNews.image,
          publish_date: newNews.publish_date,
        })
        .eq("id", editing.id);

      if (error) {
        console.error("Error updating news:", error);
      } else {
        // Fetch updated news list
        setNews((prevNews) =>
          prevNews.map((item) =>
            item.id === editing.id ? { ...item, ...newNews } : item
          )
        );
        setEditing(null);
        setNewNews({ title: "", description: "", image: "", publish_date: "" });
        setShowForm(false);
      }
    } else {
      // Add new news
      const { data, error } = await supabase.from("news").insert([newNews]);

      if (error) {
        console.error("Error adding news:", error);
      } else {
        setNews((prevNews) => [...prevNews, ...(data || [])]);
        setNewNews({ title: "", description: "", image: "", publish_date: "" });
        setShowForm(false);
      }
    }
  };

  const handleEdit = (item: NewsItem) => {
    setNewNews({
      title: item.title,
      description: item.description,
      image: item.image || "",
      publish_date: item.publish_date,
    });
    setEditing(item);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("news").delete().eq("id", id);
    if (error) {
      console.error("Error deleting news:", error);
    } else {
      setNews((prevNews) => prevNews.filter((item) => item.id !== id));
    }
  };

  // Show the form to add new news
  const handleAddNew = () => {
    setShowForm(true);
    setEditing(null);
  };

  // Handle form cancel
  const handleCancel = () => {
    setShowForm(false);
    setNewNews({ title: "", description: "", image: "", publish_date: "" });
    setEditing(null);
  };

  return (
    <div className="p-4 mt-20  ">
      <h2 className="text-2xl font-bold mb-4 text-dark">Manage News</h2>

      {/* Button to show the Add News Form */}
      <button
        onClick={handleAddNew}
        className="bg-dark text-white p-2 rounded mb-4"
      >
        Add New
      </button>

      {/* Displaying current news */}
      <div className="mt-6 p-4 text-dark">
        <h3 className="text-xl font-semibold">Current News</h3>
        {news.length === 0 ? (
          <p>No news available</p>
        ) : (
          <ul className="space-y-4">
            {news.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  <p className="text-sm">{item.description}</p>
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.title}
                      className=" object-cover mt-2"
                      layout="responsive"
                      width={16} 
                      height={16}
                    />
                  )}
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add or Edit News Form */}
      {showForm && (
        <div className="mt-6 p-6">
          <h3 className="text-xl font-semibold">
            {editing ? "Edit News" : "Add News"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              value={newNews.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="w-full p-2 border border-gray-300 rounded text-black"
              required
            />
            <textarea
              name="description"
              value={newNews.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="w-full p-2 border border-gray-300 rounded text-black"
              rows={4}
              required
            />
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {newNews.image && (
              <Image src={newNews.image} alt="Preview" className="mt-2 " layout="responsive"
              width={16} 
              height={16}/>
            )}
            <input
              type="date"
              name="publish_date"
              value={newNews.publish_date}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded text-black"
              required
            />
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                {editing ? "Update News" : "Add News"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 text-white p-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default NewsManagement;
