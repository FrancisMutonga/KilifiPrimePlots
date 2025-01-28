import { NextRequest, NextResponse } from "next/server";
import { supabase } from "./supabaseClient";

export async function middleware(req: NextRequest) {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    // Redirect to login if no session
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Allow access
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // Protect admin routes
};
