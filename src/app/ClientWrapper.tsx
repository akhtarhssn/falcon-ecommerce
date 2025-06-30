'use client';

import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { store } from '@/redux/store';

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <Header />
            {children}
            <Toaster position="top-center" />
            <Footer />
        </Provider>
    );
};

export default ClientWrapper;