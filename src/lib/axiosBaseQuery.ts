import axios from 'axios';

export const axiosBaseQuery = ({ baseUrl }: { baseUrl: string } = { baseUrl: '' }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return async ({ url, method, data, params }: any) => {
        try {
            const result = await axios({
                url: baseUrl + url,
                method,
                data,
                params,
            });
            return { data: result.data };
        } catch (axiosError) {
            return { error: axiosError };
        }
    };
};