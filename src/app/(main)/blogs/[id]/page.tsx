"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "./../../../supabaseClient";
import Image from "next/image";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  media_type: "image" | "video";
  media_url: string;
}

export default function BlogDetails() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching blog:", error.message);
      } else {
        setPost(data);
      }
    };

    fetchBlog();
  }, [id]);

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen text-green-700 font-bold">
        Loading post...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-16 px-4 mt-10">
      <h1 className="text-4xl font-bold text-kilifigreen text-center mb-6">{post.title}</h1>

      {post.media_type === "image" ? (
        <Image
          src={post.media_url}
          alt={post.title}
          width={1200}
          height={600}
          className="rounded-xl shadow-lg mb-8"
        />
      ) : (
        <video
          src={post.media_url}
          controls
          className="w-full rounded-xl shadow-lg mb-8"
        />
      )}

      <p className="text-gray-700 text-lg leading-relaxed">{post.description}</p>
    </div>
  );
}
