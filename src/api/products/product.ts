import { api } from "@/api";
import type { Product, ProductsQueryParams } from "./products.types";
import { getQueryParamString } from "@/utils/get-query-param-string";

const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], Partial<ProductsQueryParams>>({
      query: (queryParams) => {
        const queryParamsString = getQueryParamString(queryParams);
        return `/products?${queryParamsString}`;
      },
    }),
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (newProduct) => ({ 
        url: '/products',
        method: 'POST',
        body: newProduct,
      }),
    }),
    deleteProduct: builder.mutation<Product, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
    }),
    getSingleProduct: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),
  }), 
});

export const { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation , useGetSingleProductQuery, } = productsApi;
