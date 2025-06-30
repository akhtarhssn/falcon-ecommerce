import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/lib/axiosBaseQuery';
import { Product, SingleProduct } from '@/types/product';

// Define the API service
export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: axiosBaseQuery({ baseUrl: 'http://157.230.240.97:9999/api/v1' }),
    endpoints: (builder) => ({
        getProducts: builder.query<SingleProduct[], void>({
            query: () => ({
                url: '/shop/products',
                method: 'GET',
            }),
            transformResponse: (response: { data: SingleProduct[] }) => response.data,
        }),
        getProductBySlug: builder.query<Product, string>({
            query: (slug) => ({
                url: `/product/${slug}`,
                method: 'GET',
            }),
            transformResponse: (response: { data: Product }) => response.data,
        }),
    }),
});

// Export hooks for usage in components
export const { useGetProductsQuery, useGetProductBySlugQuery } = shopApi;