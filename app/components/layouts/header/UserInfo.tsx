"use client"

import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    History,
    LogOut,
    Sparkles,
    User,
    IdCard,
} from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menubar } from "@/components/ui/menubar"
import avatarFallback from "@/lib/avatarFallback"
import Link from "next/link"
import { logout } from "@/lib/firebase/authUtils"

interface UserInfoProps {
    user: {
        displayName: string,
        email: string,
        photoURL: string,
    },
    isMobile: boolean
}

// Componente Avatar para evitar repetição
const UserAvatar = ({ user }: { user: UserInfoProps['user'] }) => (
    <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage src={user.photoURL} alt={user.displayName} />
        <AvatarFallback className="rounded-lg">{avatarFallback(user.displayName)}</AvatarFallback>
    </Avatar>
)

const handleLogout = () => {
    logout()
    console.log("Usuário deslogado")
    localStorage.removeItem("firebaseToken")
}

export default function UserInfo({ user, isMobile }: UserInfoProps) {
    const { displayName, email, photoURL } = user

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Menubar className="px-4 py-6 transition-colors duration-300 ease-in-out hover:bg-zinc-500/10 dark:hover:bg-slate-400/20 border-none shadow-none cursor-pointer">
                    <UserAvatar user={user} />
                    {!isMobile && (
                        <>
                            <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                                <span className="truncate font-semibold text-foreground">{displayName}</span>
                                <span className="truncate text-xs text-foreground">{email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4 text-foreground" />
                        </>
                    )}
                </Menubar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="start"
                sideOffset={4}
            >
                {isMobile && (
                    <>
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <UserAvatar user={user} />
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{displayName}</span>
                                    <span className="truncate text-xs">{email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                    </>
                )}
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <User />
                        <Link href="/profile/">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <History />
                        <Link href="/profile/activity">Your Activity</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <IdCard />
                        <Link href="/profile/card">Your Card</Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                    <LogOut />
                    Log Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
