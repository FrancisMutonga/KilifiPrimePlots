"use client";

import { useEffect, useState } from "react";

type Review = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
};

export default function GoogleReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reviews")
      .then(r => r.json())
      .then(d => {
        setReviews(d.reviews?.slice(0, 3) || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);


  if (loading) return <p>Loading reviews...</p>;

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {reviews.map((r, i) => (
        <div key={i} className="p-6 rounded-2xl shadow-lg bg-white">
          <div className="flex justify-between items-center">
            <strong className="font-bold">{r.author_name}</strong>
            <span className="text-yellow-500 text-lg">
              {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
            </span>
          </div>

          <p className="text-sm mt-3 text-gray-700 line-clamp-4">{r.text}</p>

          <p className="text-xs text-gray-400 mt-2">
            {r.relative_time_description}
          </p>
        </div>
      ))}
    </div>
  );
}
