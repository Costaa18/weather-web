import { getCityByName } from '@/api/weather/get-by-city';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface WeatherCardProps {
    city: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city }) => {
    const [weatherData, setWeatherData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchWeatherData = async () => {
            setLoading(true);
            const data = await getCityByName(city);
            setWeatherData(data);
            setTimeout(() => {
                setLoading(false);
            }, 3000);
        };

        fetchWeatherData();
    }, [city]);

    const userLanguage = typeof navigator !== 'undefined' ? navigator.language : 'en';
    const today = new Date();
    const date = today.toLocaleDateString(userLanguage, { weekday: 'long', month: '2-digit', day: 'numeric' });

    const metersToKm = (meters: number) => {
        return meters / 1000;
    };

    const roundToUnits = (numero: number) => {
        return Math.round(numero);
    };

    return (
        <div className="m-10 items-center flex flex-col md:flex-row md:justify-center">
            <div className="w-72 flex flex-col bg-card dark:bg-primary p-4 rounded-lg transition duration-500 ease-in-out transform hover:scale-105 cursor-pointer shadow-xl shadow-foregorund/60 dark:shadow-primary/40">
                {loading ? (
                    <div className="flex flex-col justify-center items-center h-48">
                        <svg className="pl" width="240" height="240" viewBox="0 0 240 240">
                            <circle className="pl__ring pl__ring--a" cx="120" cy="120" r="105" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 660" strokeDashoffset="-330" strokeLinecap="round"></circle>
                            <circle className="pl__ring pl__ring--b" cx="120" cy="120" r="35" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 220" strokeDashoffset="-110" strokeLinecap="round"></circle>
                            <circle className="pl__ring pl__ring--c" cx="85" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
                            <circle className="pl__ring pl__ring--d" cx="155" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
                        </svg>
                        <span className='text-sm'>Getting Weather Data</span>
                    </div>
                ) : weatherData ? (
                    <>
                        <div className="font-bold text-xl uppercase">{weatherData.city}, {weatherData.country}</div>
                        <div className="text-sm">{date}</div>
                        <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-32 w-32">
                            <Image
                                width={150}
                                height={150}
                                src={`https://openweathermap.org/img/wn/${weatherData.icon}@4x.png`}
                                alt="Weather icon"
                            />
                        </div>
                        <div className="flex flex-row items-center justify-center mt-6">
                            <div className="font-medium text-6xl">{roundToUnits(weatherData.temperature)}°</div>
                            <div className="flex flex-col items-center ml-6">
                                <div>Cloudy</div>
                                <div className="mt-1">
                                    <span className="text-sm"><i className="far fa-long-arrow-up"></i></span>
                                    <span className="text-sm font-light text-gray-500">{roundToUnits(weatherData.tempMax)}°C</span>
                                </div>
                                <div>
                                    <span className="text-sm"><i className="far fa-long-arrow-down"></i></span>
                                    <span className="text-sm font-light text-gray-500">{roundToUnits(weatherData.tempMin)}°C</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between mt-6">
                            <div className="flex flex-col items-left">
                                <div className="font-bold text-sm">Wind</div>
                                <div className="text-xs dark:font-semibold dark:text-gray-100 uppercase">{weatherData.windSpeed}km/h</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="font-bold text-sm">Humidity</div>
                                <div className="text-xs dark:font-semibold dark:text-gray-100 uppercase">{weatherData.humidity}%</div>
                            </div>
                            <div className="flex flex-col items-right">
                                <div className="font-bold text-sm">Visibility</div>
                                <div className="text-xs dark:font-semibold dark:text-gray-100 uppercase">{metersToKm(weatherData.visibility)}km</div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center text-gray-500">No data available</div>
                )}
            </div>
        </div>
    );
};

export default WeatherCard;
