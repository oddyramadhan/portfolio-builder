"use client";

import { Toaster } from "sonner";
import "./globals.css";
import Link from "next/link"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
          <div className="flex w-full max-w-7xl mx-auto items-center justify-between">
            <Link href="/">
              <h1 className="text-lg font-semibold text-gray-900">
                My Portfolio
              </h1>
            </Link>
            <Link href="/settings">
              <h1 className="text-lg font-semibold text-gray-500">Editor</h1>
            </Link>
          </div>
        </header>
        <Toaster />
        <main>{children}</main>
      </body>
    </html>
  );
}
