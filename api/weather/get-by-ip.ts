import axios from "axios";

type WeatherProps = {
    temperature: number;
    feelsLike: number;
    tempMin: number;
    tempMax: number;
    pressure: number;
    humidity: number;
    windSpeed: number;
    windDeg: number;
    weather: string;
    description: string;
    city: string;
    country: string;
    sunrise: number;
    sunset: number;
    icon: string;
}

export async function getCityByIP(): Promise<WeatherProps | undefined> {
    try {
        //const weatherResponse = await axios.get<WeatherProps>(`${process.env.NEXT_PUBLIC_API_URL}/weather`);
        const testData = {
            "temperature": 14.55,
            "feelsLike": 14.46,
            "tempMin": 11.98,
            "tempMax": 14.56,
            "pressure": 1020,
            "humidity": 92,
            "windSpeed": 1.02,
            "windDeg": 53,
            "weather": "Clouds",
            "description": "broken clouds",
            "city": "Braga",
            "country": "PT",
            "sunrise": 1731914796,
            "sunset": 1731949893,
            "icon": "02d",
            "current_time": 1731972080,
            "visibility": 10000
        }
        return testData;
        //return weatherResponse.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return undefined;
    }
}
