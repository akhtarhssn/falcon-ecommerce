import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/lib/axiosBaseQuery';
import { Product, SingleProduct } from '@/types/product';
import { Category } from '@/types/category';

// Define the API service
export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: axiosBaseQuery({ baseUrl: '/api/v1' }), //for local add "/v1" after "/api"
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
        getCategories: builder.query<Category[], void>({
            query: () => ({
                url: `/categories`,
                method: 'GET',
            }),
            transformResponse: (response: { data: Category[] }) => response.data,
        }),
    }),
});

// Export hooks for usage in components
export const { useGetProductsQuery, useGetProductBySlugQuery, useGetCategoriesQuery } = shopApi;