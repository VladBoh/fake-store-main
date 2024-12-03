import { useQueryState } from 'nuqs'

import { useGetAllCategoriesQuery } from '@/api/products/products'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

export const CategoryFilter = () => {
    const { data: categories } = useGetAllCategoriesQuery()

    const [category, setCategory] = useQueryState('category', { defaultValue: '' })

    const onChange = (category: string) => {
        setCategory(category)
    }

    return (
        <Select
            value={category}
            onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue placeholder='Choose category' />
            </SelectTrigger>
            <SelectContent>
                {categories?.map((category) => (
                    <SelectItem value={category}>{category}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
