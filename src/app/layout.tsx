'use client';

import { Onest } from "next/font/google";
import { Provider } from 'react-redux';

import Footer from "@/components/footer";
import Header from "@/components/header";
import { store } from "@/redux/store";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Falcon - Steadfast E-commerce Template",
//   description: "A modern e-commerce template built with Next.js and Tailwind CSS",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${onest.variable} antialiased`}
      >
        <Provider store={store}>
          <Header />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
