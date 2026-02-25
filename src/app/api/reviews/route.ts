import { NextResponse } from "next/server";

const PLACE_ID = process.env.GOOGLE_PLACE_ID;
const API_KEY = process.env.GOOGLE_API_KEY;

export async function GET() {
  try {
    const url =
      `https://maps.googleapis.com/maps/api/place/details/json` +
      `?place_id=${PLACE_ID}` +
      `&fields=rating,user_ratings_total,reviews` +
      `&key=${API_KEY}`;

    const res = await fetch(url, { next: { revalidate: 21600 } }); // 6 hrs cache
    const data = await res.json();

    if (data.status !== "OK") {
      return NextResponse.json(
        { error: data.status },
        { status: 500 }
      );
    }

    return NextResponse.json({
      rating: data.result.rating,
      total: data.result.user_ratings_total,
      reviews: data.result.reviews || [],
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
