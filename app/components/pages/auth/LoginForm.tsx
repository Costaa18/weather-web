"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { loginWithGoogle, loginWithGithub } from "@/lib/firebase/authUtils";
import toast from "react-hot-toast";
import { getFirebaseErrorMessage } from "@/lib/firebase/firebaseErrors";
import { checkCookie, setCookie } from "@/lib/cookies";
import { useRouter } from 'next/navigation'

import { useEffect } from 'react';

export function LoginForm() {
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const hasSession = await checkCookie("session");
            if (hasSession) {
                router.push("/");
            }
        };
        checkSession();
    }, [router]);

    const handleGoogleLogin = async () => {
        try {
            const token = await loginWithGoogle();
            setCookie("session", token);
            router.push("/");
        } catch (error) {
            alert("Erro ao fazer login com Google.");
        }
    };

    const handleGithubLogin = async () => {
        try {
            const token = await loginWithGithub();
            setCookie("session", token);
            router.push("/");
        } catch (error: any) {
            console.log(error.code);
            const errorMessage = getFirebaseErrorMessage(error.code);
            console.log("ErrorMessage: " + errorMessage);
            toast.error(errorMessage as string);
        }
    };



    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link href="#" className="ml-auto inline-block text-sm underline">
                                Forgot your password?
                            </Link>
                        </div>
                        <Input id="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                    <div className="flex items-center">
                        <hr className="flex-1" />
                        <span className="mx-4 text-sm">or</span>
                        <hr className="flex-1" />
                    </div>
                    <Button onClick={handleGoogleLogin} variant="outline" className="w-full">
                        Sign In with Goole
                    </Button>

                    <Button onClick={handleGithubLogin} variant="secondary" className="w-full">
                        Sign In with Github
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="#" className="underline">
                        Sign up
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}

export default LoginForm