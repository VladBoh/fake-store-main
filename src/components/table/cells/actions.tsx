import { MoreHorizontal } from 'lucide-react'


import type { User } from '@/api/users/users.types'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface ActionCellProps {
    user: User
}
export const ActionCell = ({}: ActionCellProps) => {
    return (
        <div className='flex w-full items-center justify-center'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant='ghost'
                        size='icon'>
                        <MoreHorizontal className='size-4' />
                    </Button>
                </DropdownMenuTrigger>
            </DropdownMenu>
        </div>
    )
}
