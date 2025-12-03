"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "./../../../supabaseClient";
import Image from "next/image";

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [uploading, setUploading] = useState(false);
  const [blogLink, setBlogLink] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error(error);
      else if (data) {
        setTitle(data.title);
        setDescription(data.description);
        setMediaUrl(data.mediaUrl);
        setMediaType(data.mediaType);
        setBlogLink(data.blogLink || "");
      }
      setLoading(false);
    };

    fetchBlog();
  }, [id]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      setUploading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split(".").pop();
      const filePath = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("blogs")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("blogs")
        .getPublicUrl(filePath);

      setMediaUrl(publicUrlData.publicUrl);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload media");
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("blogs")
      .update({
        title,
        description,
        mediaUrl,
        mediaType,
        blogLink,
      })
      .eq("id", id);

    if (error) alert("Error updating blog");
    else {
      alert("Blog updated successfully!");
      router.push("/admin/blogs");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading blog...
      </div>
    );

  return (
    <section className="max-w-3xl mx-auto p-10">
      <h1 className="text-2xl lg:text-5xl font-bold text-kilifigreen text-center mb-6">
        Edit Blog Post
      </h1>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Title"
          className="border border-kilifigreen/50 bg-beige/90 text-black py-3 px-6 rounded-2xl"
        />

        <div
          contentEditable
          suppressContentEditableWarning
          className="border border-kilifigreen/50 bg-beige/90 text-black py-3 px-6 rounded-2xl min-h-[150px] prose"
          onInput={(e) =>
            setDescription((e.target as HTMLDivElement).innerHTML)
          }
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>

        <input
          type="url"
          value={blogLink}
          onChange={(e) => setBlogLink(e.target.value)}
          placeholder="External Blog Link (Optional)"
          className="border border-kilifigreen/50 bg-beige/90 text-black py-3 px-6 rounded-2xl"
        />

        <select
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value as "image" | "video")}
          className="border border-kilifigreen/50 bg-beige/90 text-black py-3 px-6 rounded-2xl"
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>

        <input
          type="file"
          accept={mediaType === "image" ? "image/*" : "video/*"}
          onChange={handleFileUpload}
          className="border border-kilifigreen/50 bg-beige/90 text-black py-3 px-6 rounded-2xl"
        />

        {uploading ? (
          <p className="text-sm text-gray-500">Uploading...</p>
        ) : (
          mediaUrl && (
            <div className="mt-2">
              {mediaType === "image" ? (
                <Image
                  src={mediaUrl}
                  alt="Uploaded media"
                  className="rounded-lg w-full h-60 object-cover"
                  height={60}
                  width={80}
                />
              ) : (
                <video
                  src={mediaUrl}
                  controls
                  className="rounded-lg w-full h-60 object-cover"
                />
              )}
            </div>
          )
        )}

        <button
          onClick={handleUpdate}
          className="bg-kilifigreen text-white py-3 rounded-full font-bold hover:bg-green-800 transition"
        >
          Update Blog
        </button>
      </div>
    </section>
  );
}
