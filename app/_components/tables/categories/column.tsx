import { ColumnDef } from "@tanstack/react-table";
import { Category } from "@/types/type";
import { format } from "date-fns";

export const CategoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.original.name ?? "N/A",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => row.original.description ?? "N/A",
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (row.original.isActive ? "Active" : "Inactive"),
  },
 
];
