import type { Product } from "@/api/products/products.types";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table-column-header";

export const productcolumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader className="text-amber-950" column={column} title='Title' />
    ),
    cell: ({ row }) => (
      <div className='flex items-center text-base text-amber-600 bg-amber-950 gap-x-2'>
        {row.original.title}
      </div>
    )
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader className="text-amber-950" column={column} title='Price' />
    ),
    cell: ({ row }) => (
      <div className='flex items-center text-red-600 text-base gap-x-2'>
        {row.original.price}
      </div>
    )
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader className="text-amber-950" column={column} title='Category' />
    ),
    cell: ({ row }) => (
      <div className='flex items-center bg-amber-500 rounded-sm text-blue-700 text-base gap-x-2'>
        {row.original.category}
      </div>
    )
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader className="text-amber-950" column={column} title='Description' />
    ),
    cell: ({ row }) => (
      <div className='flex items-center text-amber-500 gap-x-2'>
        {row.original.description}
      </div>
    )
  },
];
