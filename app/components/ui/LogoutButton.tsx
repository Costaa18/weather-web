import { logout } from "@/lib/firebase/authUtils";

const handleLogout = async () => {
    await logout();
    localStorage.removeItem("firebaseToken");
};

export default function LogOutButton() {
    return <button onClick={handleLogout}>Logout</button>;
}