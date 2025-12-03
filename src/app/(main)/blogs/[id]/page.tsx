"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "./../../../supabaseClient";
import Image from "next/image";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  mediaType: "image" | "video";
  mediaUrl: string;
  blogLink: string;
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
    <div className="max-w-5xl mx-auto py-12 px-8 rounded-xl mt-20 bg-beige">
      <h1 className="text-4xl font-bold text-kilifigreen text-center mb-6">
        {post.title}
      </h1>

      {post.mediaType === "image" ? (
        <Image
          src={post.mediaUrl}
          alt={post.title}
          width={1200}
          height={600}
          className="rounded-xl shadow-lg mb-8"
        />
      ) : (
        <video
          src={post.mediaUrl}
          controls
          className="w-full rounded-xl shadow-lg mb-8"
        />
      )}

      <div
        className="prose max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: post.description }}
      />

      {post.blogLink && (
        <p className="mt-6 text-center text-kilifigreen text-lg">
          Read more:{" "}
          <a
            href={post.blogLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:underline"
          >
            {post.blogLink}
          </a>
        </p>
      )}

      <div className=" text-center mt-10">
        <Link
          href={"/blogs"}
          className=" text-lg lg:text-xl text-center text-kilifigreen hover:text-white bg-white hover:bg-kilifigreen px-6 py-3 border border-kilifigreen rounded-full"
        >
          {" "}
          Back
        </Link>
      </div>
    </div>
  );
}
