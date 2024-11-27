import WeatherCard from "../components/ui/WeatherCard";

export default function WeatherPage() {
    return (
        <div className="h-[75vh] flex items-center justify-center">
            <section className="relative w-full">
                <WeatherCard />
            </section>
        </div>
    )
}