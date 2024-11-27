// components/LoginButtons.tsx
import React from "react";
import { loginWithGoogle, loginWithGithub } from "@/lib/firebase/authUtils";

const LoginButtons = () => {
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
        } catch (error) {
            alert("Erro ao fazer login com GitHub.");
        }
    };

    return (
        <div>
            <button onClick={handleGoogleLogin}>Login com Google</button>
            <button onClick={handleGithubLogin}>Login com GitHub</button>
        </div>
    );
};

export default LoginButtons;
