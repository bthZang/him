import { useEffect, useRef, useState } from "react";
import { specialDays } from "../constants/specialDays";
import { isSameDay } from "../utils/date";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { motion, AnimatePresence } from "framer-motion";

export default function SpecialDayButton() {
  const [open, setOpen] = useState(false);
  const [todaySpecial, setTodaySpecial] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const btnRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const now = new Date();
    setTodaySpecial(specialDays.some((d) => isSameDay(d.date, now)));
  }, []);

  useEffect(() => {
    if (open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const modalWidth = 320;
      const modalHeight = 360;
      const x = Math.min(
        Math.max(rect.left + rect.width / 2 - modalWidth / 2, 8),
        window.innerWidth - modalWidth - 8
      );
      const y = Math.max(rect.top - modalHeight - 12, 8);
      setPos({ x, y });
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <>
      <div
        ref={btnRef}
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-8 right-8 z-[200] flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 cursor-pointer hover:scale-105 transition-transform"
      >
        <span className="text-xl">📅</span>
        {todaySpecial && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 text-red-500 text-lg"
          >
            ❤️
          </motion.span>
        )}
      </div>

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="fixed z-[9999] bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg border border-white/30 p-4"
              style={{
                left: pos.x,
                top: pos.y,
                width: 320,
                height: "auto",
              }}
            >
              <Calendar
                className="text-white font-light"
                tileContent={({ date }) => {
                  const special = specialDays.find((d) =>
                    isSameDay(d.date, date)
                  );
                  if (special) {
                    return (
                      <div
                        className="relative flex items-center justify-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(special.path);
                        }}
                      >
                        <div className="absolute inset-0 rounded-full border border-red-500"></div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <p className="text-center text-sm mt-2 text-white/60 font-thin">
                Click a heart day to open content
              </p>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
