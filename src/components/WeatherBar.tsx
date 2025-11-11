import { useEffect, useState } from "react";

export default function WeatherBar() {
  const [temp, setTemp] = useState<number | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=10.75&longitude=106.67&current=temperature_2m"
        );
        const data = await res.json();
        setTemp(data.current.temperature_2m);
      } catch {
        setTemp(31);
      }
    };
    fetchWeather();
  }, []);

  return (
    <div className="text-sky-200 text-sm mt-1 flex justify-center items-center gap-2">
      <span>🌤 SG:</span> {temp ? `${temp.toFixed(1)}°C` : "..."}
    </div>
  );
}
