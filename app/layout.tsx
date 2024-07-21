"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DataContextProvider } from "./lib/repository/store";
import { useEffect } from 'react';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('Service Worker registered'))
        .catch((err) => console.error('Service Worker registration failed', err));
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <DataContextProvider>
          {children}
        </DataContextProvider>
      </body>
    </html>
  );
}
