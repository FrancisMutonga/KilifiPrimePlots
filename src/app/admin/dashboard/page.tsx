"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/client";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndStats = async () => {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        router.push("/login");
        return;
      }

      const userDocRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        if (data.role !== "admin") {
          router.push("/unauthorized");
          return;
        }
        setUsername(data.username || "Admin");
      } else {
        router.push("/unauthorized");
      }

    

      setLoading(false);
    };

    fetchUserAndStats();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-kilifigreen"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10 ">
      <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-kilifigreen mb-6">
        Welcome back, {username} 👋
      </h1>

      {/* Content */}
      <div className="p-6 w-full ">
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full text-dark text-center">
          <Link href="/admin/products">
            <div className="bg-beige/90 p-6 shadow-xl rounded">
              <h3 className="font-bold text-kilifigreen text-lg mb-4">
                Manage Products
              </h3>
            </div>
          </Link>

          <Link href="/admin/blogs">
            <div className="bg-beige/90 p-6 shadow-xl rounded">
              <h3 className="font-bold text-lg text-kilifigreen mb-4">
                Manage Blogs
              </h3>
            </div>
          </Link>
          <Link href="/admin/news">
            <div className="bg-beige/90 p-6 shadow-xl rounded">
              <h3 className="font-bold text-lg text-kilifigreen mb-4">
                Manage News
              </h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
