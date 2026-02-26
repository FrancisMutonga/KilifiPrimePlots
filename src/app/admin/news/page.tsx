"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { db, storage } from "../../firebase/client";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

  // 🔥 Fetch News (ordered by publish_date desc)
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const q = query(
          collection(db, "news"),
          orderBy("publish_date", "desc"),
        );

        const querySnapshot = await getDocs(q);

        const newsData: NewsItem[] = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<NewsItem, "id">),
        }));

        setNews(newsData);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewNews((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔥 Upload Image to Firebase Storage
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const filePath = `news/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, filePath);

      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      setNewNews((prev) => ({
        ...prev,
        image: downloadURL,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // 🔥 Add or Update News
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editing) {
        const docRef = doc(db, "news", editing.id);

        await updateDoc(docRef, {
          ...newNews,
        });

        setNews((prev) =>
          prev.map((item) =>
            item.id === editing.id ? { ...item, ...newNews } : item,
          ),
        );
      } else {
        const docRef = await addDoc(collection(db, "news"), {
          ...newNews,
        });

        setNews((prev) => [...prev, { id: docRef.id, ...newNews }]);
      }

      setEditing(null);
      setNewNews({ title: "", description: "", image: "", publish_date: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Error saving news:", error);
    }
  };

  // 🔥 Delete
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "news", id));
      setNews((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting news:", error);
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

  const handleAddNew = () => {
    setShowForm(true);
    setEditing(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
    setNewNews({ title: "", description: "", image: "", publish_date: "" });
  };

  return (
    <div className="p-4 mt-20 max-w-4xl mx-auto">
      <div className="flex flex-row gap-20 justify-center">
        <h2 className="text-3xl lg:text-5xl text-center font-bold mb-4 text-kilifigreen">
          Manage News
        </h2>

        <button
          onClick={handleAddNew}
          className="text-md lg:text-xl font-semibold border border-kilifigreen bg-beige/80 text-kilifigreen rounded-full px-6 py-3"
        >
          + New
        </button>
      </div>

      <div className="mt-6 p-4 text-dark">
        <h3 className="text-2xl lg:text-3xl text-kilifigreen font-semibold">
          Current News
        </h3>

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
                      className="object-cover mt-2"
                      width={600}
                      height={400}
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

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-beige w-full max-w-xl rounded-2xl shadow-xl p-8 relative">
            {/* Close Button */}
            <button
              onClick={handleCancel}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <h3 className="text-2xl text-kilifigreen text-center font-semibold mb-4">
              {editing ? "Edit News" : "Add News"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                value={newNews.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="w-full p-2 border rounded text-black"
                required
              />

              <textarea
                name="description"
                value={newNews.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="w-full p-2 border rounded text-black"
                rows={4}
                required
              />

              <input
                type="file"
                onChange={handleImageChange}
                className="w-full p-2 border rounded"
              />

              <input
                type="date"
                name="publish_date"
                value={newNews.publish_date}
                onChange={handleInputChange}
                className="w-full p-2 border rounded text-black"
                required
              />

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {editing ? "Update" : "Add"}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsManagement;
