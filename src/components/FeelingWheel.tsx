import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

type FeelingWheelProps = {
  selected: string | null;
  onSelect: (id: string) => void;
};

const FEELINGS = [
  "Tức giận",
  "Bình yên",
  "Hào hứng",
  "Cô đơn",
  "Mệt mỏi",
  "Hi vọng",
  "Hoài niệm",
  "Biết ơn",
  "Chán",
  "Thanh thản",
];

export default function FeelingWheel({
  selected,
  onSelect,
}: FeelingWheelProps) {
  const [rotation, setRotation] = useState(0);
  const dragging = useRef(false);
  const lastY = useRef(0);

  const START_BOUND = 60;
  const END_BOUND = 265;
  const SLICE_WIDTH = 30;
  const RADIUS_INNER = 80;
  const RADIUS_OUTER = 180;

  const totalAngle = FEELINGS.length * SLICE_WIDTH;
  const visibleRange = END_BOUND - START_BOUND;
  const minRotation = -(totalAngle / 2 - visibleRange / 2);
  const maxRotation = totalAngle / 2 - visibleRange / 2;

  const slicePath = (startDeg: number, endDeg: number) => {
    const startRad = (startDeg * Math.PI) / 180;
    const endRad = (endDeg * Math.PI) / 180;
    const x1 = Math.cos(startRad) * RADIUS_INNER;
    const y1 = Math.sin(startRad) * RADIUS_INNER;
    const x2 = Math.cos(endRad) * RADIUS_INNER;
    const y2 = Math.sin(endRad) * RADIUS_INNER;
    const x3 = Math.cos(endRad) * RADIUS_OUTER;
    const y3 = Math.sin(endRad) * RADIUS_OUTER;
    const x4 = Math.cos(startRad) * RADIUS_OUTER;
    const y4 = Math.sin(startRad) * RADIUS_OUTER;
    return `M${x1},${y1} L${x2},${y2} L${x3},${y3} L${x4},${y4}Z`;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    lastY.current = e.clientY;
    e.preventDefault(); 
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    e.preventDefault();
    const deltaY = e.clientY - lastY.current;
    lastY.current = e.clientY;

    setRotation((prev) => {
      const next = prev - deltaY * 0.4;
      return Math.min(Math.max(next, minRotation), maxRotation);
    });
  };

  const handlePointerUp = () => {
    dragging.current = false;
  };

  return (
    <div
      className="flex justify-center items-center w-full h-[400px] select-none touch-none "
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <svg width="400" height="400" viewBox="-200 -200 400 400">
        <circle
          cx="0"
          cy="0"
          r={RADIUS_OUTER}
          fill="none"
          stroke="#555"
          strokeDasharray="4 6"
          opacity="0.2"
        />

        {FEELINGS.map((label, i) => {
          const baseAngle =
            180 -
            SLICE_WIDTH * Math.floor(FEELINGS.length / 2) +
            i * SLICE_WIDTH +
            rotation;

          if (
            baseAngle < START_BOUND - SLICE_WIDTH ||
            baseAngle > END_BOUND + SLICE_WIDTH
          )
            return null;

          let opacity = 1;
          const fade = 10;
          if (baseAngle < START_BOUND + fade)
            opacity = Math.max(0, (baseAngle - START_BOUND) / fade);
          else if (baseAngle > END_BOUND - fade)
            opacity = Math.max(0, (END_BOUND - baseAngle) / fade);

          const path = slicePath(
            baseAngle - SLICE_WIDTH / 2,
            baseAngle + SLICE_WIDTH / 2
          );
          const labelAngle = (baseAngle * Math.PI) / 180;
          const labelX =
            Math.cos(labelAngle) * ((RADIUS_INNER + RADIUS_OUTER) / 2);
          const labelY =
            Math.sin(labelAngle) * ((RADIUS_INNER + RADIUS_OUTER) / 2);

          const isSelected = selected === label;

          return (
            <motion.g
              key={label}
              animate={{ opacity }}
              transition={{ duration: 0.2 }}
              onClick={() => onSelect(label)}
              style={{ cursor: "pointer", touchAction: "none" }}
            >
              <path
                d={path}
                fill={isSelected ? "#3B82F6" : "url(#grad)"}
                stroke={isSelected ? "#93C5FD" : "rgba(255,255,255,0.15)"}
                strokeWidth="1"
              />
              <text
                x={labelX}
                y={labelY + 5}
                textAnchor="middle"
                fill={isSelected ? "#fff" : "#ccc"}
                fontSize="12"
                fontWeight={isSelected ? "700" : "600"}
              >
                {label}
              </text>
            </motion.g>
          );
        })}

        <circle cx="0" cy="0" r="20" fill="#1e3a8a" opacity="0.6" />
        <circle cx="0" cy="0" r="6" fill="#60a5fa" />

        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
