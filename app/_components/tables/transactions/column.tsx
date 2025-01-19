


import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "@/types/type";

export const TransactionColumns: ColumnDef<Transaction>[] = [
  {
    header: "Type",
    accessorKey: "type",
  },
  {
    header: "Amount",
    accessorKey: "amount",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Date",
    accessorKey: "date",
  },
  {
    header: "Account",
    accessorKey: "account",
    cell: ({ row }) => row.original?.account?.name +"  " + "Type: " + row.original?.account?.type,
  },
  {
    header: "Category",
    accessorKey: "category",
    cell: ({ row }) => row.original?.category?.name,
  },
  {
    header: "Subcategory",
    accessorKey: "subcategory",
    cell: ({ row }) => row.original?.subcategory?.name,
  },
];
