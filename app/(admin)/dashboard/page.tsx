"use client";
import React, { useState, useEffect } from "react";


import { toast } from "sonner";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { ColumnDef } from "@tanstack/react-table";


const Page = () => {
  const [isAddLaonOpen,setIsAddlaonOpen] = useState(false);
  const [selectedloan, setSelectedloan] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen]=useState(false);
  const [deleteOpen, setDeleteOpen]= useState(false);
const  [updateOpen , setUpdateOpen] =useState(false);

 

 

  const topRef = React.useRef<HTMLDivElement>(null);

  const token =
    typeof window !== "undefined" && localStorage.getItem("usertoken");

  const loanpplication = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/ap", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("response", response);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.message || " ");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("usertoken")) {
      loanpplication();
    }
  }, []);


  return <div className="p-10">    
Dashboard Transaction Overview
  </div>;
};

export default Page;

