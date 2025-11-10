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
        setNews(data || []); 
      }
    };

    fetchNews();
  }, []);

 
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

    
    const filePath = `images/${Date.now()}_${file.name}`;

    try {
     
      const { data, error } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (error) {
        console.error("Error uploading image:", error.message);
        return;
      }

      if (data) {
        console.log("Upload successful:", data);

       
        const { data: publicUrlData } = supabase.storage
          .from("images")
          .getPublicUrl(filePath);

        if (!publicUrlData) {
          console.error("Error retrieving public URL");
          return;
        }

       
        setNewNews((prev) => ({
          ...prev,
          image: publicUrlData.publicUrl,
        }));
      }
    } catch (err) {
      console.error("Unexpected error during upload:", err);
    }
  };

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
     
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

 
  const handleAddNew = () => {
    setShowForm(true);
    setEditing(null);
  };


  const handleCancel = () => {
    setShowForm(false);
    setNewNews({ title: "", description: "", image: "", publish_date: "" });
    setEditing(null);
  };

  return (
    <div className="p-4 mt-20 max-w-4xl mx-auto">
     <div className=" flex  flex-row gap-20 justify-center ">
       <h2 className="text-3xl lg:text-5xl text-center font-bold mb-4 text-kilifigreen">Manage News</h2>
       <button
        onClick={handleAddNew}
        className="text-md lg:text-xl font-semibold border border-kilifigreen bg-beige/80 text-kilifigreen text-center rounded-full px-4 lg:px-6  py-3"
      >
        + New
      </button>
     </div>

      {/* Displaying current news */}
      <div className="mt-6 p-4 text-dark">
        <h3 className="text-2xl lg:text-3xl text-kilifigreen font-semibold">Current News</h3>
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
