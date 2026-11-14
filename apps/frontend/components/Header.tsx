import { User } from "./animate-ui/icons/user";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header({ className }: { className?: string }) {
    return (
        <>
            <div className={`h-15 px-4 py-3 bg-gray-900 text-white flex justify-between items-center ${className || ""}`}>
                <h1>
                    James Web Games
                </h1>

                <div className="rounded w-10 h-10 text-black text-center flex justify-center items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="outline" className="bg-gray-100" />}>
                            <User animateOnHover />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </>
    );
}