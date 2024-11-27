// lib/firebase/authUtils.ts
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { signOut } from "firebase/auth";
import { setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth } from "./firebaseClient";
import { removeCookie } from "../cookies";

export const loginWithGoogle = async (): Promise<string> => {
  const provider = new GoogleAuthProvider();
  try {
    await setPersistence(auth, browserLocalPersistence);
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Usuário logado com Google:", user);
    const token = await user.getIdToken();
    return token;
  } catch (error) {
    console.error("Erro no login com Google:", error);
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

    return token;
  } catch (error) {
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
    removeCookie("session");
  } catch (error) {
    throw error;
  }
};
