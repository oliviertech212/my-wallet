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
import { usePathname } from "next/navigation";

interface CategoryTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setIsAddCategoryOpen?: (value: boolean) => void;
  isAddCategoryOpen?: boolean;
  isLoading?: boolean;
  updateOpen?: boolean;
  setUpdateOpen?: (value: boolean) => void;
}

export function CategoryTable<TData, TValue>({
  columns,
  data,
  setIsAddCategoryOpen,
  isAddCategoryOpen,
  isLoading,
  updateOpen,
  setUpdateOpen,
}: CategoryTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  });

  const pathname = usePathname();

  return (
    <>
      <div className="flex  flex-wrap md:space-x-3 items-center py-4 relative space-y-2 md:space-y-0 justify-start md:justify-end">
        {!isAddCategoryOpen && !updateOpen && (
          <Button
            size="sm"
            className={`bg-primary  mt-2 px-3 md:px-9 shadow-lg text-xs rounded-sm hover:bg-primary text-white   fixed 
              `}
            style={{ zIndex: 50 }}
            onClick={() => {
              return setIsAddCategoryOpen && setIsAddCategoryOpen(true);
            }}
          >
            Create Category
          </Button>
        )}

        {
            updateOpen && (
            <Button
                size="sm"
                className={`bg-primary  mt-2 px-3 md:px-9 shadow-lg text-xs rounded-sm hover:bg-primary text-white   fixed 
                `}
                style={{ zIndex: 50 }}
                onClick={() => {
                    return setUpdateOpen && setUpdateOpen(false);
                }}
            >
                Close Update
            </Button>
            )
        }

        {isAddCategoryOpen && (
          <Button
            size="sm"
            className={`bg-[red] mt-2 px-3 md:px-9 shadow-lg text-xs rounded-sm hover:bg-primary text-white   fixed 
              `}
            style={{ zIndex: 50 }}
            onClick={() => {
              return setIsAddCategoryOpen && setIsAddCategoryOpen(false);
            }}
          >
            Close Create
          </Button>
        )}
      </div>

      {isLoading ? (
        <></>
      ) : (
        <>
          <div className=" relative w-[280px]   items-center">
            <Input
              placeholder="Search by category name"
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event: any) => {
                table.getColumn("name")?.setFilterValue(event.target.value);
              }}
              className="max-w-sm "
            />
            <IoSearch
              size={24}
              className=" absolute   text-[red] right-2 top-1/2 transform -translate-y-1/2  "
            />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          className="text-primary bg-primary3"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell: any) => (
                        <TableCell key={cell.id} className=" text-xs bg-white">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 bold_text text-center"
                    >
                      No Data Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </>
  );
}
