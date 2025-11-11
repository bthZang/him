import WeatherBar from "./WeatherBar";

export default function TopBar() {
  return (
    <div className="w-full max-w-3xl mx-auto text-center py-4">
      <h1 className="text-2xl font-bold text-sky-100">💙 Our Playlist</h1>
      <WeatherBar />
    </div>
  );
}
