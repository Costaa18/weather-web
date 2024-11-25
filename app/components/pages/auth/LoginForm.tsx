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


const handleGoogleLogin = async () => {
    try {
        const token = await loginWithGoogle();
        console.log("Token Google JWT:", token);
        // Envie o token ao backend ou armazene em cookies/localStorage
    } catch (error) {
        alert("Erro ao fazer login com Google.");
    }
};

const handleGithubLogin = async () => {
    try {
        const token = await loginWithGithub();
        console.log("Token GitHub JWT:", token);
        // Envie o token ao backend ou armazene em cookies/localStorage
    } catch (error: any) {
        toast.error(error.message);
    }
};

export function LoginForm() {
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
                    <Button onClick={handleGoogleLogin} variant="outline" className="w-full">
                        Login with Google
                    </Button>

                    <Button onClick={handleGithubLogin} variant="secondary" className="w-full">
                        Login with Google
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