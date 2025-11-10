"use client"; 

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../supabaseClient";
import { Suspense } from "react";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Handle error from the query string if necessary
    const searchParams = new URLSearchParams(window.location.search);
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setError(decodeURIComponent(errorParam.replace(/_/g, " ")));
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid email or password.");
      setLoading(false);
    } else {
      // Redirect after login
      const searchParams = new URLSearchParams(window.location.search);
      const redirectTo = searchParams.get("redirect") || "/admin/dashboard";
      router.push(redirectTo);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4 " >
      <div className="w-full max-w-md bg-beige/90 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-6 text-kilifigreen">
          Please Login
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-kilifigreen font-bold">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-white/50"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-kilifigreen font-bold">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-white/50 "
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className=" py-3 px-6 border border-kilifigreen text-bold text-kilifigreen hover:text-white rounded-full bg-white/50  hover:bg-kilifigreen focus:ring focus:ring-blue-300"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function SuspenseWrappedAdminLogin() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminLogin />
    </Suspense>
  );
}
