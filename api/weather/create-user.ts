import api from '@/lib/axios';

interface UserData {
    email?: string;
}

export async function saveUserToDatabase(user: UserData): Promise<UserData | undefined> {
    try {
        const apiResponse = await api.post<UserData>(`${process.env.NEXT_PUBLIC_API_URL}/users`, user);
     
        return apiResponse.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return undefined;
    }
}
