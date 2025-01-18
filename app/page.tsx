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
      const res = await axios.get("http://localhost:3000/api/v1/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      console.log("res",res.data.user);
      

      if (typeof window !== "undefined" && res.data.user) {

        localStorage.setItem(
          "user",
          JSON.stringify({
            email: res.data.user.email,
            name: res.data.user.name,
            token: token,
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
      let user= localStorage.getItem("user")
      let token = user ? JSON.parse(user).token : null;
      if (token) {
        handleGetprogile(token);
      }
    }
  });

  if (!isMounted) return null; // Render nothing on the server
  return redirect("/signin");
}
