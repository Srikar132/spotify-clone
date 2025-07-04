import type { Metadata } from "next";
import React from "react";


export const metadata : Metadata = {
    title : "Signup - Spotify",
    description : "Welcome to Spotify , create an account to get started."
}

export default function AuthLayout({
   children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className={'auth-layout'}>
            {children}
        </main>
    );
};