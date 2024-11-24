import WeatherFrom from '@/app/components/pages/weather/WeatherForm';
import WeatherCard from '@/app/components/ui/WeatherCard';

export default function Home() {
  return (
    <>
      <main className="min-h-full flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="w-full max-w-md">
          <WeatherFrom />
          <div>
            <WeatherCard />
          </div>
        </div>
      </main>

    </>
  )
}