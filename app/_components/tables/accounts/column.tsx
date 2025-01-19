import { ColumnDef } from "@tanstack/react-table";

import { format } from "date-fns";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { AccountType } from "@/types/type";
import { Account } from "@/types/type";

export const AccountColumns: (
  setIsOpen: (value: boolean) => void,
  setDeleteOpen: (value: boolean) => void,
  setUpdateOpen: (value: boolean) => void,
  setSelectedAccount: (value: Account ) => void
) => ColumnDef<Account>[] = (
  setIsOpen,
  setDeleteOpen,
  setUpdateOpen,
  setSelectedAccount
) => [
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
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => row.original.type ?? "N/A",
  },
  {
    accessorKey: "balance",
    header: "Balance",
    cell: ({ row }) => row.original.balance ?? "N/A",
  },
  {
    accessorKey: "currency",
    header: "Currency",
    cell: ({ row }) => row.original.currency ?? "N/A",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => format(new Date(row.original.createdAt), "dd/MM/yyyy"),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }: any) => {
      const account = row.original;

      return (
        <div className=" flex justify-between cursor-pointer">
          <MdDelete
            size={30}
            className="text-[red] border-[red] "
            onClick={() => {
              setSelectedAccount(account);
              setDeleteOpen(true);
              setIsOpen(false);
            }}
          />

          {/* <FaEye
            size={30}
            className="text-[#008CFF] border-[#008CFF] bg-blue-100  "
            onClick={() => {
              setSelectedAccount(account);
              setDeleteOpen(false);
              setUpdateOpen(false);
              setIsOpen(true);
            }}
          /> */}

          <FaEdit
            size={30}
            className="text-[#008CFF] border-[#008CFF] bg-blue-100 "
            onClick={() => {
              setSelectedAccount(account);
              setUpdateOpen(true);
              setIsOpen(false);
            }}
          />
        </div>
      );
    },
  },
];
