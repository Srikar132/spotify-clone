import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";


const MobileMenu = () => {
    return (
        <div className="lg:hidden z-20 place-self-end">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="cursor-pointer border !rounded-[10px] px-2 py-2">
                        <Image src="/images/menu.svg" alt="menu" height={30} width={24} />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent side="bottom" align="end" className="w-48 bg-[#121212] text-white">
                    <DropdownMenuItem asChild>
                        <Link href="/support">Support</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/premium">Premium</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/login">Login</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/signup">Signup</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
};

export default MobileMenu;