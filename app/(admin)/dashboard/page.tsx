

"use client";
import React, { useEffect, useState } from "react";
import { Transaction } from "@/types/type";
import BarChart from "@/app/_components/charts/barchat";
import AreaChart from "@/app/_components/charts/AreaChart";
import PieChart from "@/app/_components/charts/piechart";
import axios from "axios";
import { toast } from "sonner";

const Overview = () => {
  const [transactionData, setTransactionData] = useState<Transaction[]>([]);
  const [accountData, setAccountData] = useState([]);
  const [filteredData, setFilteredData] = useState<Transaction[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const fetchTransactions = async () => {
    const token = typeof window !== "undefined" && localStorage.getItem("usertoken");
    setIsLoading(true);
    try {
      const response = await axios.get("/api/v1/transactions", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactionData(response.data);
      setFilteredData(response.data); 
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Failed to fetch transactions");
    } finally {
      setIsLoading(false);
    }
  };


  const fetchAccounts = async () => {
    const token = typeof window !== "undefined" && localStorage.getItem("usertoken");
    setIsLoading(true);
    try {
      const response = await axios.get("/api/v1/accounts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setAccountData(response.data.accounts);
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Failed to fetch accounts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
    fetchTransactions();
    fetchAccounts();}
  }, []);

  const handleFilter = () => {
    const filtered = transactionData.filter(item => {
      const date = new Date(item.date);
      return date >= new Date(startDate) && date <= new Date(endDate);
    });
    setFilteredData(filtered);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Overview</h1>
      <div className="mb-4">
        <label className="mr-2">Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded p-1"
        />
        <label className="mr-2 ml-4">End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded p-1"
        />
        <button
          onClick={handleFilter}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Filter
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <AreaChart data={filteredData} />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <BarChart data={accountData} />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <PieChart data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
