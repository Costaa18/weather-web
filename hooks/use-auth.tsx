import { useState, useCallback, useEffect } from "react";
import { onAuthStateChanged, setPersistence, browserLocalPersistence, User } from "firebase/auth";
import { auth } from "@/lib/firebase/firebaseClient";
import { checkCookie } from "@/lib/cookies";
import { logout } from "@/lib/firebase/authUtils";

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const checkSession = useCallback(async () => {
        const session = await checkCookie("session");
        if (!session) {
            logout();
            setUser(null);
        }
    }, []);

    useEffect(() => {
        const setupAuth = async () => {
            await setPersistence(auth, browserLocalPersistence);
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
