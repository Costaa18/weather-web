import WeatherCard from "../../WeatherCard";

type WeatherByCitySectionProps = {
    city: string
}

export default function WeatherByCitySection({ city }: WeatherByCitySectionProps) {
    return (
        <>
            <section className="relative w-full">
                <WeatherCard city={city} />
            </section>
        </>
    )
}