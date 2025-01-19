"use client";

import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";
import { Transaction } from "@/types/type";

interface TransactionTableProps {
  columns: ColumnDef<Transaction>[];
  data: Transaction[];
  setIsAddTransactionOpen: (open: boolean) => void;
  isLoading: boolean;
  setSelectedTransaction: (transaction: Transaction | null) => void;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
  columns,
  data,
  setIsAddTransactionOpen,
  isLoading,
  setSelectedTransaction,
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  });

  return (
    <>
      <div className="flex justify-between items-center py-4">
        <Button
          size="sm"
          className="bg-primary mt-2 px-3 md:px-9 shadow-lg text-xs rounded-sm hover:bg-primary text-white"
          onClick={() => setIsAddTransactionOpen(true)}
        >
          Add Transaction
        </Button>
        <div className="relative w-[280px]">
          <Input
            placeholder="Search by amount or description"
            value={(table.getColumn("amount")?.getFilterValue() as string) ?? ""}
            onChange={(event: any) => {
              table.getColumn("amount")?.setFilterValue(event.target.value);
            }}
            className="max-w-sm"
          />
          <IoSearch size={24} className="absolute text-[red] right-2 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-primary bg-primary3">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    onClick={() => {
                      setSelectedTransaction(row.original);
                      setIsAddTransactionOpen(true);
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-xs bg-white">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 bold_text text-center">
                    No Data Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
};
