import React from "react";
import { motion } from "framer-motion";
import WeatherBar from "./WeatherBar";

export default function TopBar() {
  return (
    <div className="w-full relative px-10 pt-8 pb-4 select-none">
      <div className="absolute left-4 top-3 scale-[55%] origin-top-left">
        <WeatherBar />
      </div>

      {/* Cụm tiêu đề nghiêng hẳn sang phải */}
      <div className="absolute right-10 top-16 flex flex-col items-end">
        {/* Dòng 1 – liền mạch, mềm, rõ nét */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            fontFamily: "'Allura', cursive",
            fontSize: "52px",
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

        {/* Dòng 2 – siêu thin, sát dưới, căn phải */}
        <motion.h2
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 100,
            fontSize: "13px",
            letterSpacing: "6px",
            color: "rgba(255,255,255,0.85)",
            transform: "scaleY(1.9)",
            textTransform: "uppercase",
            textAlign: "right",
            lineHeight: "1",
            marginRight: "4px",
          }}
        >
          Choose what you need
        </motion.h2>
      </div>
    </div>
  );
}
