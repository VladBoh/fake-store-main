import { type ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '../data-table-column-header'

import { AddressCell } from './cells/address'
import type { User } from '@/api/users/users.types'

export const columns: ColumnDef<User>[] = [
    // {
    //     accessorKey: 'avatar',
    //     header: 'Avatar',
    //     cell: ({ row }) => (
    //         <Avatar>
    //             <AvatarImage src={row.original.avatar} />
    //             <AvatarFallback>
    //                 {row.original.name.charAt(0).toUpperCase()}
    //             </AvatarFallback>
    //         </Avatar>
    //     )
    // },
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Name'
            />
        ),
        cell: ({ row }) => (
            <div className='flex items-center gap-x-2'>
                {row.original.name.firstname} {row.original.name.lastname}
            </div>
        )
    },
    {
        accessorKey: 'address',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Address'
                className='w-52'
            />
        ),
        cell: ({ row }) => <AddressCell user={row.original} />
    },
    {
        accessorKey: 'email',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Email'
            />
        )
    },
    {
        accessorKey: 'phone',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Phone'
            />
        )
    }
    // {
    //     accessorKey: 'role',
    //     header: ({ column }) => (
    //         <DataTableColumnHeader
    //             column={column}
    //             title='Role'
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <div
    //             className={cn(
    //                 'w-fit rounded-full px-2.5 py-1 text-xs text-background',
    //                 roleColors[row.original.role]
    //             )}>
    //             {row.original.role}
    //         </div>
    //     )
    // },
    // {
    //     id: 'actions',
    //     cell: ({ row }) => <ActionCell user={row.original} />
    // }
]
