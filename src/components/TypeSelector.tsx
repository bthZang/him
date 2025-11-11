interface TypeSelectorProps {
  selected: string | null;
  onSelect: (type: string) => void;
}

const TYPES = [
  {
    id: "quote",
    label: "QUOTE",
    bg: "url('https://images.unsplash.com/photo-1503264116251-35a269479413')",
  },
  {
    id: "image",
    label: "IMAGE",
    bg: "url('https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e')",
  },
  {
    id: "video",
    label: "VIDEO",
    bg: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')",
  },
  {
    id: "music",
    label: "MUSIC",
    bg: "url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4')",
  },
];

export default function TypeSelector({
  selected,
  onSelect,
}: TypeSelectorProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-2">
      {TYPES.map((t) => (
        <div
          key={t.id}
          onClick={() => onSelect(t.id)}
          className={`relative w-20 h-32 rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 ${
            selected === t.id
              ? "scale-105 shadow-[0_0_15px_rgba(100,200,255,0.7)]"
              : "hover:scale-105 hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]"
          }`}
          style={{
            backgroundImage: `${t.bg}`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-semibold text-xs uppercase">
            {t.label}
          </div>
        </div>
      ))}
    </div>
  );
}
