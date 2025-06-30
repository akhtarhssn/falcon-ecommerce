import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@//lib/axiosBaseQuery';
import { Product } from '@/types/product';

// Define the API service
export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: axiosBaseQuery({ baseUrl: 'http://157.230.240.97:9999/api/v1' }),
    endpoints: (builder) => ({
        getProducts: builder.query<Product, void>({
            query: () => ({
                url: '/product/iphone-15-plus',
                method: 'GET',
            }),
            transformResponse: (response: { data: Product }) => response.data,
        }),

    }),
});

// Export hooks for usage in components
export const { useGetProductsQuery } = shopApi;