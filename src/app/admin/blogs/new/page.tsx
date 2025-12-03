"use client";

import React, { useState } from "react";
import { supabase } from "./../../../supabaseClient";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const NewBlogPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [blogLink, setBlogLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

   const convertPlainTextToHTML = (text: string) => {
    const lines = text.split(/\r?\n/);
    let html = "";
    let inUL = false;
    let inOL = false;

    lines.forEach((line) => {
      const trimmed = line.trim();

      if (!trimmed) return; // skip empty lines

      // Bullets (- text)
      if (/^-\s+/.test(trimmed)) {
        if (!inUL) {
          html += "<ul>";
          inUL = true;
        }
        html += `<li>${trimmed.replace(/^- /, "")}</li>`;
      } 
      // Numbered (1. text)
      else if (/^\d+\.\s+/.test(trimmed)) {
        if (!inOL) {
          html += "<ol>";
          inOL = true;
        }
        html += `<li>${trimmed.replace(/^\d+\.\s+/, "")}</li>`;
      } 
      else {
        if (inUL) {
          html += "</ul>";
          inUL = false;
        }
        if (inOL) {
          html += "</ol>";
          inOL = false;
        }
        // Convert simple markers to HTML
        const lineHTML = trimmed
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")   
          .replace(/\*(.*?)\*/g, "<em>$1</em>")              
          .replace(/__(.*?)__/g, "<u>$1</u>");               
        html += `<p>${lineHTML}</p>`;
      }
    });

    if (inUL) html += "</ul>";
    if (inOL) html += "</ol>";

    return html;
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!title || !description || !file) {
      setError("Please fill in all fields and select a file.");
      setLoading(false);
      return;
    }

    try {
      // Upload file to Supabase Storage
      const fileName = `${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("blogs")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("blogs")
        .getPublicUrl(fileName);

      const mediaUrl = publicUrlData.publicUrl;

       // Convert description to HTML
      const descriptionHTML = convertPlainTextToHTML(description);

      // Save blog info to database
      const { error: insertError } = await supabase.from("blogs").insert([
        {
          title,
         description: descriptionHTML,
          mediaType,
          mediaUrl,
           blogLink: blogLink || null,
        },
      ]);

      if (insertError) throw insertError;

      router.push("/admin/blogs");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    }
  };

  return (
    <section className="min-h-screen py-12  px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-beige/90 shadow-lg rounded-xl p-8"
      >
        <h1 className="text-3xl lg:text-4xl font-bold text-kilifigreen text-center mb-6">
          Create New Blog Post
        </h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleUpload} className="space-y-6">
          <div>
            <label className="block text-kilifigreen font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-2xl p-3 text-gray-800 focus:outline-green-700"
              placeholder="Enter blog title"
            />
          </div>

          <div>
            <label className="block text-kilifigreen font-semibold mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full border rounded-lg p-3 text-gray-800 focus:outline-green-700"
              placeholder="Write your blog description..."
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-kilifigreen font-semibold mb-2">
                Media Type
              </label>
              <select
                value={mediaType}
                onChange={(e) =>
                  setMediaType(e.target.value as "image" | "video")
                }
                className="w-full border rounded-lg p-3 text-gray-800 focus:outline-green-700"
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>

            <div>
              <label className="block text-kilifigreen font-semibold mb-2">
                Upload Media
              </label>
              <input
                type="file"
                accept={mediaType === "image" ? "image/*" : "video/*"}
                onChange={(e) =>
                  setFile(e.target.files ? e.target.files[0] : null)
                }
                className="w-full border rounded-lg text-gray-800 p-2"
              />
            </div>
            <div>
              <label className="block text-kilifigreen font-semibold mb-2">
                External Blog Link (Optional)
              </label>
              <input
                type="url"
                value={blogLink}
                onChange={(e) => setBlogLink(e.target.value)}
                placeholder="https://example.com"
                className="w-full border rounded-lg p-3 text-gray-600 focus:outline-green-700"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 text-white font-semibold py-3 rounded-lg hover:bg-green-800 transition"
          >
            {loading ? "Posting..." : "Publish Blog"}
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default NewBlogPage;
