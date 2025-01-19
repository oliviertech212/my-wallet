"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import Link from "next/link";
import axios from "axios";
import { useEffect } from "react";
import { FaHome, FaInbox, FaListAlt, FaDollarSign, FaExchangeAlt } from "react-icons/fa";
import { toast } from "sonner";

const items = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: FaHome,
  },
  {
    title: "Transactions",
    url: "/dashboard/transactions",
    icon: FaExchangeAlt,
  },
  {
    title: "Account",
    url: "/dashboard/accounts",
    icon: FaInbox,
  },
  {
    title: "Categories",
    url: "/dashboard/categories",
    icon: FaListAlt,
  },
  {
    title: "Sub Categories",
    url: "/dashboard/subcategories",
    icon: FaListAlt,
  },
  {
    title: "Budgets",
    url: "/dashboard/budgets",
    icon: FaDollarSign,
  },
  
];

export function AppSidebar() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/signin";
  };
  const [user, setUser] = useState<any>();
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
         setUser(res.data.user);
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: res.data.user.email,
            name: res.data.user.name,
            token: token,
          })
        );
      }
    } catch (err) {
      handleLogout();
      toast.error("Login session expired. Please login again.");
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
        handleLogout();
        toast.error("Login session expired. Please login again.");
        router.push("/signin");
      }
    }
  }, []); 

  if (!isMounted) return null; 

  return (
    <Sidebar className="text-white">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <span className="text-lg font-bold">{user?.name} &lsquo;</span>
            <span className="text-sm ml-2">Wallet</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <span
          className="self-start ml-3 m-auto cursor-pointer border p-3"
          onClick={handleLogout}
        >
          Logout
        </span>
      </SidebarContent>
    </Sidebar>
  );
}