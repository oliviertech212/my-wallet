"use client";

import React, { useState, useEffect } from "react";
import { Account } from "@/types/type";
import { ColumnDef } from "@tanstack/react-table";
import { AccountColumns } from "@/app/_components/tables/accounts/column";
import { AccountTable } from "@/app/_components/tables/accounts/table";
import AccountForm from "@/app/_components/forms/accounts/account";
import axios from "axios";
import { toast } from "sonner";

const AccountPage = () => {
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);

  const token =
    typeof window !== "undefined" && localStorage.getItem("usertoken");

  const fetchAccounts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/v1/accounts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setAccounts(response.data.accounts);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.error || "Failed to fetch accounts");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("usertoken")) {
      fetchAccounts();
    }
  }, []);

  const handleCreateAccount = async (data: any) => {
    try {
      const response = await axios.post("/api/v1/accounts", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setAccounts([...accounts, response.data]);
      setIsAddAccountOpen(false);
      setUpdateOpen(false);
      setSelectedAccount(null);
      toast.success("Account created successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Failed to create account");
    }
  };

  const handleUpdateAccount = async (data: any) => {
    try {
      const response = await axios.put(`/api/v1/accounts/${selectedAccount?.id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setAccounts(
        accounts.map((account) =>
          account.id === response.data.id ? response.data : account
        )
      );
      setUpdateOpen(false);
      setIsAddAccountOpen(false);
      setUpdateOpen(false);
      setSelectedAccount(null);
      toast.success("Account updated successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Failed to update account");
    }
  };

  const columns: ColumnDef<Account, any>[] = AccountColumns(
    setIsOpen,
    setDeleteOpen,
    setUpdateOpen,
    setSelectedAccount
  );

  return (
    <div className="p-10">
        <div>{isAddAccountOpen&&"add acount open"}</div>
      {isAddAccountOpen  && (
        <AccountForm
          onSubmit={handleCreateAccount}
          onUpdate={handleUpdateAccount}
          initialValues={selectedAccount || { name: '', type: 'BANK', balance: 0, currency: '' }}
          isUpdate={!!selectedAccount}
        />
      )}

      {
         updateOpen && (
        <AccountForm
          onSubmit={handleCreateAccount}
          onUpdate={handleUpdateAccount}
          initialValues={selectedAccount || { name: '', type: 'BANK', balance: 0, currency: '' }}
          isUpdate={!!selectedAccount}
        />
        )
      }

      

      <AccountTable
        columns={columns}
        data={accounts}
        setIsAddAccountOpen={setIsAddAccountOpen}
        isAddAccountOpen={isAddAccountOpen}
        isLoading={isLoading}
        updateOpen={updateOpen}
        setUpdateOpen={setUpdateOpen}
      />
    </div>
  );
};

export default AccountPage;
