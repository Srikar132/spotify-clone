'use client';

import Image from "next/image";
import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";
import HomeIcon from "@/components/HomeIcon";
import Search from "@/components/Search";

const Navbar = () => {
    return (
        <header className="nav relative">
            {/* Logo */}
            <div className="nav-logo">
                <Link href="/">
                    <Image
                        src="/images/logo.svg"
                        alt="logo"
                        height={38}
                        width={38}
                        className="no-drag max-lg:w-7 max-lg:h-7 user-select-none select-none"
                    />
                </Link>
            </div>

            <div className={'hidden lg:flex items-center justify-center gap-5 w-full'}>
                <HomeIcon/>
                <Search/>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center justify-center gap-5 place-self-end">
                <div className="flex-center gap-5 border-r-2 border-white pr-5">
                    <Link href="/support">Support</Link>
                    <Link href="/premium">Premium</Link>
                </div>
                <div className="flex-center gap-2">
                    <Link href="/signup">
                        <button className="btn-ghost">Sign up</button>
                    </Link>
                    <Link href="/login">
                        <button className="btn">Log in</button>
                    </Link>
                </div>
            </div>

            {/* Mobile Hamburger Mene (dropdown) */}
            <MobileMenu />
        </header>
    );
};

export default Navbar;
