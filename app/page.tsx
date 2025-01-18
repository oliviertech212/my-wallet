"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleGetProfile = async (token: string) => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.user) {
        // Store user data in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: res.data.user.email,
            name: res.data.user.name,
            token: token,
          })
        );

        console.log("User found", res.data.user);

        // Navigate to dashboard
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      // Redirect to signin on error
      router.push("/signin");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      const token = user ? JSON.parse(user).token : null;

      if (token) {
        handleGetProfile(token);
      } else {
        // Redirect to signin if no token is found
        router.push("/signin");
      }
    }
  }, []); // Empty dependency array ensures this runs once on mount

  if (!isMounted) return null; // Render nothing on the server

  return null; // Component doesn't render anything
}
