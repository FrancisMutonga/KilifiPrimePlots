"use client";

import { useEffect, useState } from "react";
import { supabase } from "./../../supabaseClient";
import Link from "next/link";
import { motion } from "framer-motion";

interface BlogPost {
  id: string;
  title: string;
  created_at: string;
  }

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      else setBlogs(data || []);

      setLoading(false);
    };

    fetchBlogs();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading blogs...
      </div>
    );

  return (
    <section className="p-10 max-w-6xl min-h-screen">
      <div className=" flex flex-row gap-20 justify-center">
        <h1 className="text-3xl lg:text-5xl font-bold text-kilifigreen mb-6">
          All Blogs
        </h1>
        <Link href="/admin/blogs/new">
          <h5 className="text-md lg:text-xl font-semibold border border-kilifigreen bg-beige/80 text-kilifigreen text-center rounded-full px-4 lg:px-6  py-3">
            + New
          </h5>
        </Link>
      </div>

      {blogs.length === 0 ? (
        <p className="text-gray-600">No blogs found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <motion.div
              key={post.id}
              className="bg-beige/90 text-center rounded-xl shadow-md p-5 hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl lg:text-3xl font-semibold text-green-700 mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-gray-600 mb-3">
                {new Date(post.created_at).toLocaleDateString()}
              </p>
              <Link
                href={`/admin/blogs/${post.id}`}
                className="text-green-700 font-semibold hover:underline"
              >
                Edit Blog →
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
