import type { Metadata } from "next";
import React from "react";

export const metadata : Metadata = {
    title : "Admin - Dashboard",
    description : "Everything will be managed by Admin."
}

export default function RootLayout({
   children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            {children}
        </main>
    );
};