"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { supabase } from "./../../supabaseClient";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  mediaType: "image" | "video";
  mediaUrl: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase.from("blogs").select("*").order("id", { ascending: false });

      if (error) {
        console.error("Error fetching blogs:", error.message);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-green-700 font-bold">
        Loading blog posts...
      </div>
    );
  }

  return (
    <section className="py-20 px-4 mt-10 min-h-screen">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-2xl lg:text-4xl font-extrabold text-kilifigreen mb-3">
          Blogs & Updates
        </h1>
        </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            className="bg-beige/90 rounded-xl shadow-lg text-center overflow-hidden hover:shadow-xl transition-all"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full h-56">
              {post.mediaType === "image" ? (
                <Image
                  src={post.mediaUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <video
                  src={post.mediaUrl}
                  controls
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="p-6 flex flex-col gap-3 text-center">
              <h2 className="text-xl lg:text-3xl font-bold text-green-700">{post.title}</h2>
              
              <Link
                href={`/blogs/${post.id}`}
                className="mt-2 text-green-700 font-semibold hover:underline"
              >
                Read More →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
