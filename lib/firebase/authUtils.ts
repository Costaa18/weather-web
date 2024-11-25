// lib/firebase/authUtils.ts
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseClient";

// Login com Google
export const loginWithGoogle = async (): Promise<string> => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const token = await user.getIdToken();
    console.log("Usuário Google logado:", user);
    return token; // Retorna o token JWT
  } catch (error) {
    console.error("Erro ao fazer login com Google:", error);
    throw error;
  }
};

// Login com GitHub
export const loginWithGithub = async (): Promise<string> => {
  const provider = new GithubAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const token = await user.getIdToken();
    console.log("Usuário GitHub logado:", user);
    return token; // Retorna o token JWT
  } catch (error) {
    console.error("Erro ao fazer login com GitHub:", error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log("Usuário deslogado.");
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
};
