"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/client";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";

export default function SigninPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
   const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
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
}


