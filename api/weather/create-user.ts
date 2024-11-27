import api from '@/lib/axios';

interface UserData {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
    provider: string;
    emailVerified: boolean;
}

export async function saveUserToDatabase(user: UserData): Promise<UserData | undefined> {
    try {
        const apiResponse = await api.post<UserData>(`${process.env.NEXT_PUBLIC_API_URL}/users`,);
        apiResponse.data;
        return apiResponse.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return undefined;
    }
}
