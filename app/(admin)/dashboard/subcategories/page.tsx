"use client";

import React, { useState, useEffect } from "react";
import SubcategoryForm from "@/app/_components/forms/subcategory/subcategory";
import { SubcategoryColumns } from "@/app/_components/tables/subcategories/column";
import { SubcategoryTable } from "@/app/_components/tables/subcategories/table";
import axios from "axios";
import { toast } from "sonner";
import { Subcategory } from "@/types/type";

const SubcategoryPage = () => {
  const [isAddSubcategoryOpen, setIsAddSubcategoryOpen] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  const token = typeof window !== "undefined" && localStorage.getItem("usertoken");

  const fetchSubcategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/v1/subcategories", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("response", response);
      
      setSubcategories(response.data.subcategories);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.error || "Failed to fetch subcategories");
    }
  };

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const handleCreateSubcategory = async (data:any) => {
    try {
      const response = await axios.post("/api/v1/subcategories", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setSubcategories([...subcategories, response.data]);
      setIsAddSubcategoryOpen(false);
      toast.success("Subcategory created successfully");
    } catch (error: any) {
      toast.error(error?.error || "Failed to create subcategory");
    }
  };

  const handleUpdateSubcategory = async (data:any) => {
    try {
      const response = await axios.put(`/api/v1/subcategories/${selectedSubcategory?.id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setSubcategories(
        subcategories.map((subcategory) =>
          subcategory.id === response.data.id ? response.data : subcategory
        )
      );
      setUpdateOpen(false);
      toast.success("Subcategory updated successfully");
    } catch (error: any) {
      toast.error(error?.error || "Failed to update subcategory");
    }
  };

  const columns = SubcategoryColumns;

  return (
    <div className="p-10">
      {isAddSubcategoryOpen  && (
        <SubcategoryForm
          onSubmit={handleCreateSubcategory}
          onUpdate={handleUpdateSubcategory}
          initialValues={selectedSubcategory || { name: '', description: '', categoryId: 0 }}
          isUpdate={!!selectedSubcategory}
        />
      )}

      <SubcategoryTable
        columns={columns}
        data={subcategories}
        setIsAddSubcategoryOpen={setIsAddSubcategoryOpen}
        isAddSubcategoryOpen={isAddSubcategoryOpen}
        isLoading={isLoading}
        updateOpen={updateOpen}
        setUpdateOpen={setUpdateOpen}
      
      />
    </div>
  );
};

export default SubcategoryPage;
