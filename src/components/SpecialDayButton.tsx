import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CalendarDays, X } from "lucide-react";
import Calendar from "react-calendar";
import { motion } from "framer-motion";
import { specialDays } from "../constants/specialDays";
import { isSameDay } from "../utils/date";
import { useNavigate } from "react-router-dom";
import "react-calendar/dist/Calendar.css";

export default function SpecialDayButton() {
  const [open, setOpen] = useState(false);
  const [todaySpecial, setTodaySpecial] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const now = new Date();
    setTodaySpecial(specialDays.some((d) => isSameDay(d.date, now)));
  }, []);

  const handleDayClick = (date: Date) => {
    const found = specialDays.find((d) => isSameDay(d.date, date));
    if (found) {
      setOpen(false);
      navigate(found.path);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <motion.button
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.9, rotate: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="relative flex items-center justify-center p-2 rounded-md hover:bg-white/10 active:bg-white/20 transition cursor-pointer"
        >
          <CalendarDays className="w-5 h-5 text-white" />
          {todaySpecial && (
            <motion.span
              layoutId="dot"
              className="absolute -top-[-3px] -right-[-3px] h-2.5 w-2.5 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_6px_rgba(255,100,150,0.7)]"
            />
          )}
        </motion.button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]" />
        <Dialog.Content className="fixed z-[10000] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-lg w-[300px] text-white focus:outline-none">
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

          <Dialog.Close asChild>
            <button className="absolute top-3 right-3 p-1 rounded-md hover:bg-white/20 transition">
              <X className="w-4 h-4" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
