import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

export const axiosBaseQuery = ({
    baseUrl,
}: {
    baseUrl: string;
}): BaseQueryFn<
    {
        url: string;
        method?: AxiosRequestConfig['method'];
        data?: AxiosRequestConfig['data'];
        params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown
> => async ({ url, method = 'GET', data, params }) => {
    try {
        const result = await axios({
            url: `${baseUrl}${url}`,
            method,
            data,
            params,
            timeout: 10000,
            headers: { 'Content-Type': 'application/json' },
        });
        return { data: result.data };
    } catch (axiosError) {
        const err = axiosError as AxiosError;
        return {
            error: {
                status: err.response?.status,
                data: err.response?.data || err.message,
            },
        };
    }
};