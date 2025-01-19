

import { ColumnDef } from "@tanstack/react-table";
import { Budget } from "@/types/type";

export const BudgetColumns: ColumnDef<Budget>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Amount",
    accessorKey: "amount",
  },
  {
    header: "Start Date",
    accessorKey: "startDate",
  },
  {
    header: "End Date",
    accessorKey: "endDate",
  },
  {
    header: "Category ID",
    accessorKey: "categoryId",
  },
  {
    header: "User ID",
    accessorKey: "userId",
  },
];
