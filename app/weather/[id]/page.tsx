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
        <WeatherByCitySection city={params.id} />
    )
}