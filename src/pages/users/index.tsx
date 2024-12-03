import type { SortingState } from '@tanstack/react-table'
import { useState } from 'react'

import { AddUserModal } from './components/modals/add-user'
import { columns } from './components/table/columns'
import { UsersTabel } from './components/table/table'
import { useGetUsersQuery } from '@/api/users/users'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

export const UsersPage = () => {
    const [sorting, setSorting] = useState<SortingState>([])

    const currentSortingDirection = sorting[0]?.desc ? 'desc' : 'asc'

    const { data: users, isLoading } = useGetUsersQuery({
        limit: 30,
        sorting: currentSortingDirection
    })

    return (
        <section className='mt-10'>
            <div className='flex items-center justify-between gap-x-8'>
                <div className='flex items-center gap-x-4'>
                    <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
                        Users
                    </h1>
                    {isLoading ? (
                        <Skeleton className='h-[22px] w-9 rounded-full' />
                    ) : (
                        <Badge>{users?.length}</Badge>
                    )}
                </div>
                <AddUserModal />
            </div>

            <UsersTabel
                setSorting={setSorting}
                data={users || []}
                columns={columns}
            />
        </section>
    )
}
