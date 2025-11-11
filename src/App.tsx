import { useState } from "react";
import FeelingWheel from "./components/FeelingWheel";
import TypeSelector from "./components/TypeSelector";
import TopBar from "./components/TopBar";
import RenderItem from "./components/RenderItem";

export default function App() {
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-[#0a2247] to-[#183c73] text-sky-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(70,120,250,0.2),transparent_70%)]" />

      <TopBar />
      <div className="flex flex-col items-center justify-center flex-1 gap-6 relative z-10">
        <FeelingWheel
          selected={selectedFeeling}
          onSelect={(id) => setSelectedFeeling(id)}
        />
        <TypeSelector
          selected={selectedType}
          onSelect={(t) => setSelectedType(t)}
        />

        <button
          className="bg-white/10 px-6 py-3 rounded-full hover:bg-white/20 backdrop-blur-sm transition-all font-semibold mt-4"
          onClick={() =>
            alert(`Feeling: ${selectedFeeling}, Type: ${selectedType}`)
          }
        >
          Xem nội dung ✨
        </button>
      </div>
    </div>
  );
}
