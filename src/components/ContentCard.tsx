import { motion } from "framer-motion";

export default function ContentCard({ item }: any) {
  const orientationClass =
    item.orientation === "vertical"
      ? "aspect-[3/4] w-[220px]"
      : "aspect-video w-[300px]";

  const baseFrameCommon =
    "relative rounded-lg overflow-visible flex flex-col items-stretch justify-start transition-transform shadow-lg";

  const frameStyle =
    item.frameType === 1
      ? `${baseFrameCommon} bg-gradient-to-br from-white/95 to-sky-50/60`
      : item.frameType === 2
      ? `${baseFrameCommon} bg-white/95 relative after:absolute after:inset-[6px] after:border-[3px] after:border-dashed after:border-sky-300 after:rounded-lg after:pointer-events-none`
      : item.frameType === 3
      ? `${baseFrameCommon} bg-amber-50/90`
      : `${baseFrameCommon} bg-white/98 border border-white/90`;

  const jaggedClip =
    "polygon(0% 4%,4% 0%,96% 0%,100% 4%,100% 92%,96% 100%,4% 100%,0% 92%)";

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`${frameStyle} ${orientationClass}`}
      style={{
        transform: `translate(${item.tx}px, ${item.ty}px) rotate(${item.rotate}deg)`,
        boxShadow: "0 8px 18px rgba(2,6,23,0.45)",
        ...(item.frameType === 3 ? { clipPath: jaggedClip } : {}),
      }}
    >
      <div className={`flex-1 p-2`}>
        {item.type === "image" ? (
          <img
            src={item.src}
            className="w-full h-full object-cover rounded-sm"
          />
        ) : (
          <video
            src={item.src}
            className="w-full h-full object-cover"
            muted
            playsInline
            controls
          />
        )}
      </div>

      <div className="p-3 text-center text-gray-700 text-sm">
        {item.caption}
      </div>
    </motion.div>
  );
}
