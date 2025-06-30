import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/redux/features/cart/cartSlice';
import { shopApi } from '@/lib/api';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        [shopApi.reducerPath]: shopApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(shopApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;