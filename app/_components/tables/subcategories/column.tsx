import { ColumnDef } from "@tanstack/react-table";
import { Subcategory } from "@/types/type";
import { format } from "date-fns";

export const SubcategoryColumns: ColumnDef<Subcategory>[] = [
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
  {
    accessorKey: "categoryId",
    header: "Category ID",
    cell: ({ row }) => row.original.categoryId ?? "N/A",
  },
 
];
