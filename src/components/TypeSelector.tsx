interface TypeSelectorProps {
  selected: string | null;
  onSelect: (type: string) => void;
  disabled?: boolean;
}

const TYPES = [
  { id: "watch", label: "watch" },
  { id: "listen", label: "listen" },
  { id: "whatever", label: "whatever" },
];

export default function TypeSelector({
  selected,
  onSelect,
  disabled = false,
}: TypeSelectorProps) {
  return (
    <div
      className={`
        flex items-center gap-4 
        w-[90%] max-w-[420px] h-[100px]
        overflow-x-auto overflow-y-hidden
        snap-x snap-mandatory scrollbar-hide px-3
        z-50
        transition-all duration-300
        ${disabled ? "opacity-30 grayscale pointer-events-none" : ""}
      `}
    >
      {TYPES.map((t) => {
        const isSelected = selected === t.id;

        return (
          <div
            key={t.id}
            onClick={() => {
              if (!disabled) onSelect(t.id);
            }}
            className={`
              relative min-w-[110px] h-[70px] rounded-2xl overflow-hidden
              flex items-center justify-center 
              border backdrop-blur-sm
              shrink-0 transform transition-all duration-300 snap-start cursor-pointer
              ${
                isSelected
                  ? "scale-110 border-white/90 shadow-[0_0_25px_rgba(255,255,255,0.6)]"
                  : "border-white/40 opacity-80 hover:scale-105 hover:shadow-[0_0_14px_rgba(255,255,255,0.3)]"
              }
            `}
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
              boxShadow: isSelected
                ? "inset 0 0 20px rgba(255,255,255,0.3)"
                : "inset 0 0 6px rgba(255,255,255,0.1)",
            }}
          >
            <div
              className={`
                absolute inset-0 rounded-2xl pointer-events-none
                transition-all duration-500
                ${
                  isSelected
                    ? "border border-white/80 shadow-[0_0_25px_rgba(255,255,255,0.7)]"
                    : "border border-white/30"
                }
              `}
            />

            {/* Text */}
            <div
              className={`
                relative z-10 font-medium text-base tracking-wide uppercase
                transition-all duration-300 select-none
                ${
                  isSelected
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-100 to-sky-200 drop-shadow-[0_0_5px_rgba(255,255,255,0.4)]"
                    : "text-sky-100/80"
                }
              `}
              style={{
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: "1.5px",
              }}
            >
              {t.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
