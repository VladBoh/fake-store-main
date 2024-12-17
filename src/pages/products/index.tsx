import { SortingFilter } from './components/filters/sorting'

import { ProductList } from './components/products-list'

import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetProductsQuery } from '@/api/products/product'
import { AddProductModal } from '@/components/products/modals/add-product'

export const ProductsPage = () => {

    const { data: products, isLoading } = useGetProductsQuery({
        offset: 0,
        limit: 10,
        search: '',
    });

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
                <AddProductModal/>
            </div>

            <div className='mt-4 flex items-center justify-between gap-x-4'>
                <SortingFilter />
            </div>

            <ProductList products={products || []} />
        </section>
    )
}
