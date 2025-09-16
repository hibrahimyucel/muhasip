import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/homepage/navbar";
import "./globals.css";
import { Suspense } from "react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhasip",
  description: "Modüler Bilgi İşlem Sistemi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="h-[calc(100vh-3rem)] w-[calc(100vw-0.1rem)] place-self-center-safe overscroll-none">
            <div className="h-12 w-full">
              <Suspense>
                <Navbar />
              </Suspense>
            </div>
            <div className="h-[calc(100vh-4rem)] w-full justify-center">
              {children}
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
