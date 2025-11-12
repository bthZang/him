import WeatherBar from "./WeatherBar";

export default function TopBar() {
  return (
    <div className="w-full relative py-4 flex flex-col items-center">
      <div className="absolute left-4 top-3 scale-[55%] origin-top-left">
        <WeatherBar />
      </div>

      <h1 className="text-2xl font-bold text-sky-100 text-center select-none mt-10">
        💙 Choose what you need
      </h1>
    </div>
  );
}
