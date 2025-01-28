"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../supabaseClient";
import Link from "next/link";
import { User } from "@supabase/supabase-js";

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data?.user) {
        router.push("/admin/login");
        return;
      }

      setUser(data.user);
      setIsLoading(false);
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-20 p-4 ">
      {/* Header */}
      <div className="p-4  flex justify-between w-full">
        <h1 className="text-3xl text-kilifigreen">Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="p-6 w-full ">
        <h2 className="text-2xl mb-6 text-kilifigreen">Welcome, {user?.email || "Admin"}!</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full text-dark text-center" style={{ opacity: 0.75 }}>
          <Link href="/admin/products" >
            <div className="bg-beige p-6 shadow-xl rounded">
              <h3 className="font-extrabold text-lg mb-4">Manage Products</h3>
            </div>
          </Link>

          <Link href="/admin/add-product">
            <div className="bg-beige p-6 shadow-xl rounded">
              <h3 className="font-extrabold text-lg mb-4">Add Products</h3>
            </div>
          </Link>
          <Link href="/admin/news">
            <div className="bg-beige p-6 shadow-xl rounded">
              <h3 className="font-bold text-lg mb-4">Manage News</h3>
            </div>
          </Link>
                   <Link href="/admin/settings">
            <div className="bg-beige p-6 shadow-xl rounded">
              <h3 className="font-extrabold text-lg mb-4">Settings</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
