"use client";

import React, { useState, useEffect } from "react";
import { CategoryColumns } from "@/app/_components/tables/categories/column";
import { CategoryTable } from "@/app/_components/tables/categories/table";
import CategoryForm from "@/app/_components/forms/category/category";
import axios from "axios";
import { toast } from "sonner";
import { Category } from "@/types/type";

const CategoryPage = () => {
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const token = typeof window !== "undefined" && localStorage.getItem("usertoken");

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/v1/categories", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data.categories);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.message || "Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async (data:any) => {
    try {
      const response = await axios.post("/api/v1/categories", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories([...categories, response.data]);
      setIsAddCategoryOpen(false);
      toast.success("Category created successfully");
    } catch (error: any) {
      toast.error(error?.message || "Failed to create category");
    }
  };

  const handleUpdateCategory = async (data:any) => {
    try {
      const response = await axios.put(`/api/v1/categories/${selectedCategory?.id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(
        categories.map((category) =>
          category.id === response.data.id ? response.data : category
        )
      );
      setUpdateOpen(false);
      toast.success("Category updated successfully");
    } catch (error: any) {
      toast.error(error?.message || "Failed to update category");
    }
  };

  const columns = CategoryColumns;

  return (
    <div className="p-10">
      {isAddCategoryOpen  && (
        <CategoryForm
          onSubmit={handleCreateCategory}
          onUpdate={handleUpdateCategory}
          initialValues={selectedCategory || { name: '', description: '' }}
          isUpdate={!!selectedCategory}
        />
      )}

      <CategoryTable
        columns={columns}
        data={categories}
        setIsAddCategoryOpen={setIsAddCategoryOpen}
        isAddCategoryOpen={isAddCategoryOpen}
        isLoading={isLoading}
        updateOpen={updateOpen}
        setUpdateOpen={setUpdateOpen}
      />
    </div>
  );
};

export default CategoryPage;
