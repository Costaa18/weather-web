import { logout } from "@/lib/firebase/authUtils";

const handleLogout = async () => {
    await logout();
    console.log("Usuário deslogado");
    localStorage.removeItem("firebaseToken");
};

export default function LogOutButton() {
    return <button onClick={handleLogout}>Logout</button>;
}