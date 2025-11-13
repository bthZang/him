import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays } from "lucide-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { specialDays } from "../constants/specialDays";
import { isSameDay } from "../utils/date";

export default function SpecialDayButton() {
  const [open, setOpen] = useState(false);
  const [todaySpecial, setTodaySpecial] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const now = new Date();
    setTodaySpecial(specialDays.some((d) => isSameDay(d.date, now)));
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside, true);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside, true);
  }, [open]);

  const handleDayClick = (date: Date) => {
    const found = specialDays.find((d) => isSameDay(d.date, date));
    if (found) {
      setOpen(false);
      navigate(found.path);
    }
  };

  return (
    <div className="relative z-[10]">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className="relative flex items-center justify-center p-2 rounded-md hover:bg-white/10 transition cursor-pointer"
      >
        <CalendarDays className="w-5 h-5 text-white" />
        {todaySpecial && (
          <motion.span
            layoutId="dot"
            className="absolute -top-[2px] -right-[2px] h-2.5 w-2.5 rounded-full bg-pink-400 animate-pulse shadow-[0_0_6px_rgba(255,100,150,0.7)]"
          />
        )}
      </motion.button>

      <AnimatePresence>
        {open &&
          createPortal(
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center"
              onClick={() => setOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />

              <motion.div
                ref={wrapperRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()} // không bị click tắt
                className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 w-[300px] shadow-lg"
              >
                <Calendar
                  onClickDay={handleDayClick}
                  tileClassName={({ date, view }) =>
                    view === "month" &&
                    specialDays.some((d) => isSameDay(d.date, date))
                      ? "special-day"
                      : undefined
                  }
                  className="rounded-xl text-white
                    [&_.react-calendar__month-view__weekdays__weekday]:font-thin
                    [&_.react-calendar__tile]:font-light
                    [&_.react-calendar__tile]:text-[15px]
                    [&_.react-calendar__navigation__label]:font-light
                    [&_.react-calendar__navigation__label]:text-white
                    [&_.react-calendar__navigation__arrow]:text-white
                    [&_.react-calendar__month-view__weekdays__weekday]:text-white/80"
                />
                <div className="mt-3 text-xs text-white/70 text-center">
                  Click a red ring day to open content
                </div>
              </motion.div>
            </div>,
            document.body
          )}
      </AnimatePresence>
    </div>
  );
}
