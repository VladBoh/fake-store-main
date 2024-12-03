import React from "react";
import {
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { useGetProductsQuery } from "@/api/products/product";
import { productcolumns } from "./products-col";

export function ProductsTable() {
  const { data: products = [], isLoading } = useGetProductsQuery({});
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: products,
    columns: productcolumns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
  });

  return (
    <div className="w-full rounded-md border overflow-hidden">
      <Table className="bg-amber-950 text-amber-500">
        <TableCaption>List of Products</TableCaption>
        <TableHeader className="bg-amber-600">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={productcolumns.length} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : products.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={productcolumns.length}
                className="h-24 text-center"
              >
                No products found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={productcolumns.length} className="text-right">
              Total: {products.length} products
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
