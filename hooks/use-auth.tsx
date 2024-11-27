import { useState, useCallback, useEffect } from "react";
import { onAuthStateChanged, setPersistence, browserLocalPersistence, User } from "firebase/auth";
import { auth } from "@/lib/firebase/firebaseClient";
import { checkCookie } from "@/lib/cookies";
import { logout } from "@/lib/firebase/authUtils";

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Verificação da sessão (cookies)
    const checkSession = useCallback(async () => {
        const session = await checkCookie("session");
        if (!session) {
            logout();
            setUser(null);
        }
    }, []);

    // Efeito para configurar a persistência e verificar o estado de autenticação
    useEffect(() => {
        const setupAuth = async () => {
            // Configura persistência local para manter o login ativo entre sessões
            await setPersistence(auth, browserLocalPersistence);

            // Verifica o estado do usuário
            const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                setUser(currentUser || null);
                setLoading(false);
            });

            await checkSession();

            // Limpeza do listener quando o componente for desmontado
            return () => unsubscribe();
        };

        setupAuth();
    }, [checkSession]);

    return { user, loading, checkSession };
}
