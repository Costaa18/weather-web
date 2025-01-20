"use client";

import { ModeToggle } from "@/components/ui/toggle-mode";
import AuthButtons from "@/app/components/layouts/header/LoginButton";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect } from "react";
import UserInfo from "./UserInfo";
import { Cloud } from "lucide-react";

export default function Header() {
  const { user, loading, checkSession } = useAuth();
  const isMobile = useIsMobile();

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return (
    <header className="flex items-center justify-between p-4 border-b border-zinc-900/20 dark:border-zinc-300/20 mb-4">
      <Link href="/" className="flex items-center">
        <Cloud size={32} className="mr-2" />
        <span className="text-md font-bold uppercase ">Weather App</span>
      </Link>

      <div className="flex gap-4 items-center">
        {loading ? (
          <div className="spinner">Loading...</div>
        ) : user ? (
          <UserInfo
            user={{
              displayName: user.displayName || "Anonymous",
              email: user.email || "No email",
              photoURL: user.photoURL || "/default-photo.png",
            }}
            isMobile={isMobile}
          />
        ) : (
          <AuthButtons />
        )}
        <ModeToggle />
      </div>
    </header>
  );
}
