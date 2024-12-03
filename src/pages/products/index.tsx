import { useSearchParams } from 'react-router-dom'

import { CategoryFilter } from './components/filters/category'
import { SortingFilter } from './components/filters/sorting'
import { AddProductModal } from './components/modals/add-product'
import { ProductList } from './components/products-list'
import { useGetProductsQuery } from '@/api/products/products'
import type { Sorting } from '@/api/products/products.types'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

export const ProductsPage = () => {
    const [searchParams] = useSearchParams()

    const { data: products, isLoading } = useGetProductsQuery({
        sorting: (searchParams.get('sorting') as Sorting) || 'desc'
    })

    return (
        <section className='mt-10'>
            <div className='flex items-center justify-between gap-x-8'>
                <div className='flex items-center gap-x-4'>
                    <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
                        Products
                    </h1>
                    {isLoading ? (
                        <Skeleton className='h-[22px] w-9 rounded-full' />
                    ) : (
                        <Badge>{products?.length}</Badge>
                    )}
                </div>
                <AddProductModal />
            </div>

            <div className='mt-4 flex items-center justify-between gap-x-4'>
                <CategoryFilter />
                <SortingFilter />
            </div>

            <ProductList products={products || []} />
        </section>
    )
}
