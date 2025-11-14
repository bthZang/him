import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FeelingWheel from "./components/FeelingWheel";
import TypeSelector from "./components/TypeSelector";
import TopBar from "./components/TopBar";
import { resolveContent } from "./ruleEngine";

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
        <div className="relative flex-1 w-full flex items-center justify-center">
          <div className="relative flex flex-col items-center justify-center">
            <FeelingWheel
              selected={selectedFeeling}
              onSelect={(id) => {
                setSelectedFeeling(id);
                setSelectedType(null);
              }}
            />

            <button
              disabled={!readyToShow}
              onClick={handleShowContent}
              className={`
        mt-8 px-10 py-3 text-lg font-semibold 
        transition-all shadow-md backdrop-blur-sm
        border border-sky-300/30
        ${
          readyToShow
            ? "bg-white/15 hover:bg-white/25 text-white cursor-pointer"
            : "bg-white/5 text-white/40 cursor-not-allowed"
        }
        rounded-xl
        `}
            >
              Xeam
            </button>
          </div>

          <div
            className="absolute flex items-center"
            style={{
              left: "calc(50% - 10px)",
              right: "calc(5px)",
              top: "calc(50% - 50px)",
              transform: "translateY(-50%)",
            }}
          >
            <TypeSelector
              selected={selectedType}
              onSelect={(t) => setSelectedType(t)}
              disabled={!selectedFeeling}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
