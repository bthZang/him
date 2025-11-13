import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FeelingWheel from "./components/FeelingWheel";
import TypeSelector from "./components/TypeSelector";
import TopBar from "./components/TopBar";
import { resolveContent } from "./ruleEngine";
import SpecialDayButton from "./components/SpecialDayButton"

export default function App() {
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleShowContent = () => {
    const resolved = resolveContent(
      selectedFeeling || undefined,
      selectedType || undefined
    );
    if (resolved) {
      navigate("/content", { state: { content: resolved } });
    } else {
      alert("Không tìm thấy nội dung phù hợp 😢");
    }
  };

  const readyToShow = selectedFeeling && selectedType;

  return (
    <div
      className="
        min-h-screen flex flex-col items-center justify-between 
        bg-gradient-to-br from-[#0a2247] to-[#183c73] 
        text-sky-50 relative overflow-hidden
      "
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(70,120,250,0.2),transparent_70%)]" />
      <TopBar />

      <div className="flex flex-col items-center justify-center flex-1 gap-8 relative z-10 w-full">
        <div className="relative flex flex-col flex-1 gap-8 z-10 items-center justify-center w-full">
          <div className="relative z-10">
            <FeelingWheel
              selected={selectedFeeling}
              onSelect={(id) => {
                setSelectedFeeling(id);
                setSelectedType(null);
              }}
            />
          </div>

          <div
            className="
            absolute 
            top-1/2
            flex justify-center items-center
            w-full
            pointerevents-auto
          "
            style={{
              left: "calc(50%-130px)",
            }}
          >
            <TypeSelector
              selected={selectedType}
              onSelect={(t) => setSelectedType(t)}
              disabled={!selectedFeeling}
            />
          </div>
        </div>

        <button
          disabled={!readyToShow}
          onClick={handleShowContent}
          className={`
            relative z-30 px-8 py-4 rounded-full mt-10 text-lg font-semibold 
            transition-all shadow-lg backdrop-blur-sm
            ${
              readyToShow
                ? "bg-white/20 hover:bg-white/30 text-white cursor-pointer"
                : "bg-white/5 text-white/40 cursor-not-allowed"
            }
          `}
        >
          Xem nội dung ✨
        </button>
      </div>
    </div>
  );
}
