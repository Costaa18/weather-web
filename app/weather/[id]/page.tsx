"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import WeatherByCitySection from "@/app/components/pages/weatherCity/page";

export default function WeatherByCityPage() {

    const params = useParams<{ id: string }>();

    if (!params) {
        notFound();
    }

    return (
        <div className="h-[75vh] flex items-center justify-center">
            <WeatherByCitySection city={params.id} />
        </div>

    )
}