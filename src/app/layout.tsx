import { Onest } from "next/font/google";

import ClientWrapper from "@/app/ClientWrapper";
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
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
