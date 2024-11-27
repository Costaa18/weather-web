// lib/firebase/authUtils.ts
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
import { signOut } from "firebase/auth";
import { setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth } from "./firebaseClient";
import { removeCookie } from "../cookies";
import { saveUserToDatabase } from "@/api/weather/create-user";

export const loginWithGoogle = async (): Promise<string> => {
  const provider = new GoogleAuthProvider();
  try {
    await setPersistence(auth, browserLocalPersistence);
    const result: UserCredential = await signInWithPopup(auth, provider);
    const user = result.user;
    const additionalUserInfo = (result as any).additionalUserInfo;

    if (additionalUserInfo?.isNewUser) {
      await saveUserToDatabase({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
        photoURL: user.photoURL ?? '',
        provider: user.providerId,
        emailVerified: user.emailVerified,
      });
    }
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
