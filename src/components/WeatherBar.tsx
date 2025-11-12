import ReactAnimatedWeather from "react-animated-weather";

export default function WeatherBar() {
  const weather = "RAIN";

  const weatherMap: Record<string, string> = {
    CLEAR_DAY: "Trời nắng",
    CLOUDY: "Có mây",
    RAIN: "Mưa nhẹ",
    SNOW: "Tuyết",
    WIND: "Gió mạnh",
    FOG: "Sương mù",
  };

  return (
    <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm shadow-md">
      <ReactAnimatedWeather
        icon={weather}
        color="#FFD93D"
        size={40}
        animate={true}
      />
      <span className="text-sky-50 text-sm font-medium">
        27°C – {weatherMap[weather]}
      </span>
    </div>
  );
}
