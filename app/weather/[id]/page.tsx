"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import WeatherCard from "@/app/components/ui/WeatherCard";

export default function WeatherByCityPage() {

    const params = useParams<{ id: string }>();

    if (!params) {
        notFound();
    }

    return (
        <div className="h-[75vh] flex items-center justify-center">
            <section className="relative w-full">
                <WeatherCard city={params.id} />
            </section>
        </div>

    )
}