interface TypeSelectorProps {
  selected: string | null;
  onSelect: (type: string) => void;
  disabled?: boolean;
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
  disabled = false,
}: TypeSelectorProps) {
  return (
    <div
      className={`
        relative -mt-[300px] ml-[300px] w-[420px] h-[160px]
        flex items-center gap-3 overflow-x-auto overflow-y-hidden
        snap-x snap-mandatory scrollbar-hide px-3 z-[999999]
        transition-all duration-300
        ${disabled ? "opacity-30 grayscale pointer-events-none" : ""}
      `}
    >
      {TYPES.map((t) => {
        const isSelected = selected === t.id;
        const isDisabled = selected !== null && !isSelected;

        return (
          <div
            key={t.id}
            onClick={() => {
              if (!disabled && !isDisabled) onSelect(t.id);
            }}
            className={`
              relative min-w-[100px] h-[60px] rounded-xl shadow-xl overflow-hidden
              shrink-0 transform transition-all duration-300 snap-start cursor-pointer
              ${
                isSelected
                  ? "scale-110 shadow-[0_0_20px_rgba(100,200,255,0.8)] border border-sky-400"
                  : isDisabled
                  ? "opacity-40 grayscale cursor-not-allowed"
                  : "hover:scale-105 hover:shadow-[0_0_12px_rgba(255,255,255,0.3)]"
              }
            `}
            style={{
              backgroundImage: t.bg,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className={`
                absolute inset-0 flex items-center justify-center font-bold text-sm uppercase tracking-wide transition-all duration-300
                ${
                  isSelected
                    ? "bg-black/20 text-sky-50"
                    : "bg-black/50 text-white"
                }
              `}
            >
              {t.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
