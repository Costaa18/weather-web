import { ModeToggle } from "@/components/ui/toggle-mode";
import Link from "next/link";

export default function Header() {
    return (
        <>
            <header className=" flex items-center justify-between p-4 border-b border-zinc-900/20 dark:border-zinc-300/20 mb-4">
                <Link
                    href="/"
                    className="text-2xl font-bold">
                    Weather App
                </Link>

                <ModeToggle />
            </header>
        </>
    )
}