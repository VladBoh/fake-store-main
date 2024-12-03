import { api } from '..'

import type { Product, ProductAddData, ProductQueryParams } from './products.types'
import { getQueryParamString } from '@/utils/get-query-param-string'

const productsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], Partial<ProductQueryParams>>({
            query: (queryParams) => {
                const queryParamsString = getQueryParamString(queryParams)
                return `/products?${queryParamsString}`
            },
            providesTags: ['Products']
        }),
        addProduct: builder.mutation<Product, ProductAddData>({
            query: (data) => {
                return {
                    url: '/products',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['Products']
        }),
        getAllCategories: builder.query<string[], void>({
            query: () => '/products/categories',
            providesTags: ['Products']
        }),
        // patchProduct: builder.mutation<Product, ProductPatchData>({
        //     query: ({ id, data }) => {
        //         return {
        //             url: `/products/${id}`,
        //             method: 'PUT',
        //             body: data
        //         }
        //     },
        //     invalidatesTags: ['Products']
        // }),
        deleteProduct: builder.mutation<Product, number>({
            query: (id) => {
                return {
                    url: `/products/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['Products']
        })
    })
})

export const {
    useGetProductsQuery,
    useGetAllCategoriesQuery,
    useAddProductMutation,
    // usePatchProductMutation,
    useDeleteProductMutation
} = productsApi
