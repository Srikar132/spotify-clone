"use client";

import {usePathname} from "next/navigation";
import Link from "next/link";

const HomeIconOutlined = () => {
    const pathname = usePathname();
    const isActive = pathname === "/";
    return (
        <Link href={"/"}>
            <button  className="btn-ghost cursor-pointer border !flex-center hover:bg-accent !px-2 !py-2 !rounded-full ">
                <svg
                    viewBox="0 0 24 24"
                    fill={isActive ? "white" : "none"}
                    stroke={!isActive ? "white" : "none"}
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                >
                    <path d="M3 10L12 3L21 10V21C21 21.55 20.55 22 20 22H15V15H9V22H4C3.45 22 3 21.55 3 21V10Z" />
                </svg>
            </button>
        </Link>
    )
};

export default HomeIconOutlined;