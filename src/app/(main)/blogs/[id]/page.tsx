"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/client";
import Image from "next/image";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  mediaType: "image" | "video";
  mediaUrl: string;
  blogLink?: string;
}

export default function BlogDetails() {
  const { id } = useParams();
  const blogId = Array.isArray(id) ? id[0] : id; // ✅ normalize ID
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!blogId) {
        setError("Blog ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "blogs", blogId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setError("Blog not found.");
          return;
        }

        const data = docSnap.data() as any;

        setPost({
          id: docSnap.id,
          title: data.title || "Untitled",
          description: data.description || "",
          mediaType: data.mediaType || "image",
          mediaUrl: data.mediaUrl || "/default-image.jpg",
          blogLink: data.blogLink || "",
        });
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to fetch blog.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-green-700 font-bold">
        Loading post...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600 font-bold">
        {error}
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="max-w-5xl mx-auto py-12 px-8 rounded-xl mt-20 bg-beige">
      <h1 className="text-4xl font-bold text-kilifigreen text-center mb-6">
        {post.title}
      </h1>

      <div className="relative w-full h-96">
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

      <div className="text-center mt-10">
        <Link
          href="/blogs"
          className="text-lg lg:text-xl text-kilifigreen hover:text-white bg-white hover:bg-kilifigreen px-6 py-3 border border-kilifigreen rounded-full"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
