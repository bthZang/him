import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

type FeelingWheelProps = {
  selected: string | null;
  onSelect: (id: string) => void;
};

const FEELINGS = [
  "Tức giận",
  "Buồn",
  "Tủi thân",
  "Cô đơn",
  "Mệt mỏi",
  "Yên bình",
  "Chán",
];

export default function FeelingWheel({
  selected,
  onSelect,
}: FeelingWheelProps) {
  const [rotation, setRotation] = useState(0);
  const dragging = useRef(false);
  const lastY = useRef(0);

  const START_BOUND = 80;
  const END_BOUND = 260;
  const SLICE_WIDTH = 30;
  const RADIUS_INNER = 60;
  const RADIUS_OUTER = 150;

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
      className="flex justify-center items-center w-full h-[320px] select-none touch-none bg-transparent"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <svg width="360" height="320" viewBox="-180 -160 360 320">
        <defs>
          <radialGradient id="fadeCenter" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle
          cx="0"
          cy="0"
          r={RADIUS_OUTER}
          fill="url(#fadeCenter)"
          strokeWidth="1.2"
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
          const isSelected = selected === label;
          const arcId = `arc-${label.replace(/\s/g, "")}`;
          const arcRadius = RADIUS_OUTER - 20;
          const arcAngle = 13;

          return (
            <motion.g
              key={label}
              animate={{
                opacity,
                scale: isSelected ? 1.05 : 1,
              }}
              transition={{ duration: 0.25 }}
              onClick={() => onSelect(label)}
              style={{ cursor: "pointer", touchAction: "none" }}
            >
              <motion.path
                d={path}
                fill="transparent"
                stroke={
                  isSelected
                    ? "rgba(255,255,255,0.95)"
                    : "rgba(255,255,255,0.45)"
                }
                strokeWidth={isSelected ? "1.8" : "1.4"}
                filter={isSelected ? "url(#softGlow)" : "none"}
              />

              <path
                id={arcId}
                d={`
                  M ${
                    Math.cos(((baseAngle - arcAngle) * Math.PI) / 180) *
                    arcRadius
                  } ${
                  Math.sin(((baseAngle - arcAngle) * Math.PI) / 180) * arcRadius
                }
                  A ${arcRadius} ${arcRadius} 0 0 1 ${
                  Math.cos(((baseAngle + arcAngle) * Math.PI) / 180) * arcRadius
                } ${
                  Math.sin(((baseAngle + arcAngle) * Math.PI) / 180) * arcRadius
                }
                `}
                fill="none"
              />

              <motion.text
                fill={isSelected ? "#ffffff" : "rgba(255,255,255,0.8)"}
                fontSize="10"
                fontFamily="'Quicksand', 'Poppins', sans-serif"
                fontWeight={isSelected ? "600" : "400"}
                letterSpacing="0.3px"
                animate={{
                  textShadow: isSelected
                    ? "0px 0px 8px rgba(255,255,255,0.9)"
                    : "none",
                }}
                transition={{ duration: 0.25 }}
              >
                <textPath
                  href={`#${arcId}`}
                  startOffset="50%"
                  textAnchor="middle"
                >
                  {label}
                </textPath>
              </motion.text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
