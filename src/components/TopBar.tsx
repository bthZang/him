import { motion } from "framer-motion";
import WeatherBar from "./WeatherBar";
import SpecialDayButton from "./SpecialDayButton";

export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-sm bg-transparent select-none">
      <div className="absolute inset-0 backdrop-blur-sm -z-10" />

      {/* Hàng trên: weather & calendar */}
      <div className="relative flex items-center justify-between w-full px-2 pt-3 pb-2 z-10">
        <div className="flex-shrink-0 ml-0 scale-50 sm:scale-95 origin-left">
          <div className="rounded-lg overflow-hidden shadow-sm">
            <WeatherBar />
          </div>
        </div>

        {/* Calendar icon: nhỏ và gọn bên phải */}
        <div className="flex-shrink-0 mr-2 scale-90 sm:scale-100 origin-right">
          <SpecialDayButton />
        </div>
      </div>

      {/* Hàng dưới: title & subtitle */}
      <div className="flex flex-col items-center text-center mt-1">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            fontFamily: "'Allura', cursive",
            fontSize: "clamp(36px, 6vw, 54px)",
            lineHeight: "1",
            color: "rgba(255,255,255,0.96)",
            textShadow: "0 0 8px rgba(180,200,255,0.4)",
            letterSpacing: "0.6px",
            marginBottom: "-4px",
            whiteSpace: "nowrap",
          }}
        >
          Inner Motion
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 100,
            fontSize: "clamp(10px, 2vw, 13px)",
            letterSpacing: "6px",
            color: "rgba(255,255,255,0.85)",
            transform: "scaleY(1.9)",
            textTransform: "uppercase",
            lineHeight: "1",
          }}
        >
          Choose what you need
        </motion.h2>
      </div>
    </header>
  );
}
