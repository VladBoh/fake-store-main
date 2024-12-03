import { ArrowDownAz, ArrowDownZA } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useEffect } from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

export const SortingFilter = () => {
    const [sorting, setSorting] = useQueryState('sorting', {
        defaultValue: 'desc'
    })

    const onChange = (sorting: string) => {
        setSorting(sorting)
    }

    useEffect(() => {
        setSorting(sorting)
    }, [])

    return (
        <Select
            value={sorting}
            onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue placeholder='Choose sorting' />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='desc'>
                    <div className='flex items-center gap-x-2'>
                        <ArrowDownZA className='size-4' />
                        <span>Descending</span>
                    </div>
                </SelectItem>
                <SelectItem value='asc'>
                    <div className='flex items-center gap-x-2'>
                        <ArrowDownAz className='size-4' />
                        <span>Ascending</span>
                    </div>
                </SelectItem>
            </SelectContent>
        </Select>
    )
}
