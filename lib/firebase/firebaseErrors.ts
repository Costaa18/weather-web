const firebaseErrors = {
    "auth/email-already-exists": "O email já esta em uso.",
    "auth/invalid-email": "O email é inválido.",
    "auth/weak-password": "A palavra-passe é fraca.",
    "auth/user-not-found": "Utilizador não encontrado.",
    "auth/wrong-password": "Palavra-Passe incorreta.",
    "auth/account-exists-with-different-credential": "Já existe uma conta com o mesmo email.",
};

export const getFirebaseErrorMessage = (code: keyof typeof firebaseErrors): string => {
    if (firebaseErrors[code]) {
        return firebaseErrors[code];
    }
    return "Erro desconhecido.";
}