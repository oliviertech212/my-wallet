"use client";

import React, { useState, useEffect } from "react";
import TransactionForm from "@/app/_components/forms/transactions/transactions";
import { TransactionTable } from "@/app/_components/tables/transactions/table";
import { TransactionColumns } from "@/app/_components/tables/transactions/column";
import { Transaction } from "@/types/type";
import axios from "axios";
import { toast } from "sonner";

const TransactionPage = () => {
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const token = typeof window !== "undefined" && localStorage.getItem("usertoken");

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/v1/transactions", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(response.data);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.error || "Failed to fetch transactions");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleCreateTransaction = async (data: any) => {
    try {
      const response = await axios.post("/api/v1/transactions", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions([...transactions, response.data]);
      setIsAddTransactionOpen(false);
      toast.success("Transaction created successfully");
    } catch (error: any) {
      console.log("error", error.response.data.error);
      
      toast.error(error?.response?.data?.error || "Failed to create transaction");
    }
  };

  const handleUpdateTransaction = async (data: any) => {
    try {
      const response = await axios.put(`/api/v1/transactions/${selectedTransaction?.id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(
        transactions.map((transaction) =>
          transaction.id === response.data.id ? response.data : transaction
        )
      );
      setIsAddTransactionOpen(false);
      toast.success("Transaction updated successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Failed to update transaction");
    }
  };

  const columns = TransactionColumns;

  return (
    <div className="p-10">
          <h1 className="text-2xl font-bold mb-4"> Transactions</h1>
      {isAddTransactionOpen && (
        <TransactionForm
          onSubmit={handleCreateTransaction}
          onUpdate={handleUpdateTransaction}
          initialValues={selectedTransaction || { amount: 0, description: "", date: "", accountId: 0, categoryId: 0 , subcategoryId: 0, type: "EXPENSE" }}
          isUpdate={!!selectedTransaction}
        />
      )}

      <TransactionTable
        columns={columns}
        data={transactions}
        setIsAddTransactionOpen={setIsAddTransactionOpen}
        isLoading={isLoading}
        setSelectedTransaction={setSelectedTransaction}
      />
    </div>
  );
};

export default TransactionPage;
