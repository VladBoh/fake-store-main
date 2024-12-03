import { House, Locate, MapPin, Package } from 'lucide-react'

import type { User } from '@/api/users/users.types'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface AddressCellProps {
    user: User
}
export const AddressCell = ({ user }: AddressCellProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    className='w-52 justify-start truncate'
                    variant='outline'>
                    <span className='truncate'>
                        {user.address.city}, {user.address.street}
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className='bg-accent'>
                <ul className='space-y-2 text-sm'>
                    <li className='flex items-center gap-x-2 px-2'>
                        <House className='size-4 text-primary' />
                        <span>City: {user.address.city}</span>
                    </li>
                    <li className='flex items-center gap-x-2 border-t px-2 pt-2'>
                        <Locate className='size-4 text-primary' />
                        <span>Street: {user.address.street}</span>
                    </li>
                    <li className='flex items-center gap-x-2 border-t px-2 pt-2'>
                        <MapPin className='size-4 text-primary' />
                        <span> Number: {user.address.number}</span>
                    </li>
                    <li className='flex items-center gap-x-2 border-t px-2 pt-2'>
                        <Package className='size-4 text-primary' />
                        <span>Zipcode: {user.address.zipcode}</span>
                    </li>
                </ul>
            </PopoverContent>
        </Popover>
    )
}
