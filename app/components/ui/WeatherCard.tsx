"use client";

import { getCityByName } from '@/api/weather/get-by-city';
import { getCityByIP } from '@/api/weather/get-by-ip';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Loading from '@/app/components/ui/Loading';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface WeatherCardProps {
    city?: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city }) => {
    const [weatherData, setWeatherData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                setLoading(true);
                let data;
                if (city) {
                    data = await getCityByName(city);
                } else {
                    data = await getCityByIP();
                }

                setWeatherData(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            } finally {
                setLoading(false);
                /*
                setTimeout(() => {
                    setLoading(false);
                }, 2500);
                */
            }
        };

        fetchWeatherData();
    }, [city]);

    const userLanguage = typeof navigator !== 'undefined' ? navigator.language : 'en';
    const today = new Date();
    const date = today.toLocaleDateString(userLanguage, { weekday: 'long', month: '2-digit', day: 'numeric' });

    if (loading) {
        return (
            <Loading />
        );
    }

    const metersToKm = (meters: number) => {
        return meters / 1000;
    };

    const roundToUnits = (numero: number) => {
        return Math.round(numero);
    };

    return (
        <div className="m-10 items-center flex flex-col md:flex-row md:justify-center">
            <div className="w-72 flex flex-col bg-card dark:bg-primary p-4 rounded-lg transition duration-500 ease-in-out transform hover:scale-105 cursor-pointer shadow-xl shadow-foregorund/60 dark:shadow-primary/40">
                {weatherData ? (
                    <>
                        <div className="font-bold text-xl uppercase">{weatherData.city}, {weatherData.country}</div>
                        <div className="text-sm">{date}</div>
                        <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-32 w-32">
                            <Image
                                width={150}
                                height={150}
                                src={`https://openweathermap.org/img/wn/${weatherData.icon}@4x.png`}
                                priority
                                alt="Weather icon"
                            />
                        </div>
                        <div className="flex flex-row items-center justify-center mt-6">
                            <div className="font-medium text-6xl">{roundToUnits(weatherData.temperature)}°</div>
                            <div className="flex flex-col items-center ml-6">
                                <div >
                                    <span className='font-bold'>{weatherData.weather}</span>
                                </div>
                                <div className="mt-1 flex justify-center">
                                    <span className="text-sm font-light">{roundToUnits(weatherData.tempMax)}°C</span>
                                </div>
                                <div className='flex justify-center'>
                                    <span className="text-sm font-light">{roundToUnits(weatherData.tempMin)}°C</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between mt-6">
                            <div className="flex flex-col items-left">
                                <div className="font-bold text-sm">Wind</div>
                                <div className="text-xs uppercase">{weatherData.windSpeed}km/h</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="font-bold text-sm">Humidity</div>
                                <div className="text-xs uppercase">{weatherData.humidity}%</div>
                            </div>
                            <div className="flex flex-col items-right">
                                <div className="font-bold text-sm">Visibility</div>
                                <div className="text-xs uppercase">{metersToKm(weatherData.visibility)}km</div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center">No data available</div>
                )}
            </div>
        </div>
    );
};

export default WeatherCard;
