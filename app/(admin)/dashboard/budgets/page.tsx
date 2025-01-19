"use client";

import React, { useState, useEffect } from "react";
import { Budget } from "@/types/type";
import { BudgetColumns } from "@/app/_components/tables/budgets/column";
import { BudgetTable } from "@/app/_components/tables/budgets/table";
import BudgetForm from "@/app/_components/forms/budgets/budgets";
import axios from "axios";
import { toast } from "sonner";

const BudgetPage = () => {
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  const token = typeof window !== "undefined" && localStorage.getItem("usertoken");

  const fetchBudgets = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/v1/budget", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setBudgets(response.data);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.message || "Failed to fetch budgets");
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleCreateBudget = async (data: any) => {
    try {
      const response = await axios.post("/api/v1/budget", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setBudgets([...budgets, response.data]);
      setIsAddBudgetOpen(false);
      toast.success("Budget created successfully");
    } catch (error: any) {
      toast.error(error?.message || "Failed to create budget");
    }
  };

  const handleUpdateBudget = async (data:any) => {
    try {
      const response = await axios.put(`/api/v1/budget/${selectedBudget?.id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setBudgets(
        budgets.map((budget) =>
          budget.id === response.data.id ? response.data : budget
        )
      );
      setIsAddBudgetOpen(false);
      toast.success("Budget updated successfully");
    } catch (error: any) {
      toast.error(error?.message || "Failed to update budget");
    }
  };

  const columns = BudgetColumns;

  return (
    <div className="p-10">
      {isAddBudgetOpen && (
        <BudgetForm
          onSubmit={handleCreateBudget}
          onUpdate={handleUpdateBudget}
          initialValues={selectedBudget || { amount: 0, startDate: "", endDate: "", categoryId: 0 }}
          isUpdate={!!selectedBudget}
        />
      )}

      <BudgetTable
        columns={columns}
        data={budgets}
        setIsAddBudgetOpen={setIsAddBudgetOpen}
        isLoading={isLoading}
        setSelectedBudget={setSelectedBudget}
      />
    </div>
  );
};

export default BudgetPage;
