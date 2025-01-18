"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import axios from "axios";
export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleGetprogile = async (token: String) => {
    try {
      const res = await axios.get("/api/auth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (typeof window !== "undefined" && res.data.user) {
        localStorage.setItem(
          "stockuser",
          JSON.stringify({
            email: res.data.user.email,
            name: res.data.user.name,
            role: "admin",
          })
        );
        return redirect("/dashboard");
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      let token = localStorage.getItem("usertoken");

      let user = localStorage.getItem("stockuser");
      if (token) {
        handleGetprogile(token);
      }
    }
  });

  if (!isMounted) return null; // Render nothing on the server
  return redirect("/signin");
}
