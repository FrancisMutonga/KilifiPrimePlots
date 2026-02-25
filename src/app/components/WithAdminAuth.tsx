"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../firebase/client";
import { doc, getDoc } from "firebase/firestore";

type Props = {
  children: React.ReactNode;
};

export default function WithAdminAuth({ children }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      const user = auth.currentUser;

      if (!user) {
        router.replace("/auth/login");
        return;
      }

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists() || userDoc.data()?.role !== "admin") {
        router.replace("/unauthorized");
        return;
      }

      setLoading(false);
    };

    checkAccess();
  }, [router]);

  if (loading) return <p className="text-center mt-10">Checking access...</p>;

  return <>{children}</>;
}
