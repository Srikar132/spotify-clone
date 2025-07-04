import type { Metadata } from "next";
import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import SpotifyBannerPreview from "@/components/SpotifyBannerPreview";
import Footer from "@/components/Footer";

export const metadata : Metadata = {
    title : "Spotify -Web Player for everyone.",
    description : "Listen to music and get chilled here."
}

export default function RootLayout({
   children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={'h-screen flex flex-col overflow-hidden'}>
            <Navbar/>
            <main className={'flex-1 px-4 flex gap-2 overflow-hidden'}>
                <Sidebar/>
                <section className={'layout overflow-y-auto'}>
                    {children}
                    <Footer/>
                </section>
            </main>
            <SpotifyBannerPreview/>
        </div>
    );
};