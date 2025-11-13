// src/pages/SpecialDayPage.tsx
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { specialDays } from "../constants/specialDays";
import { useParams, useNavigate } from "react-router-dom";

/**
 * Scrapbook-style SpecialDay page
 * - 10 slots (img/video/text) shown as polaroid cards
 * - responsive grid (3 / 2 / 1 cols)
 * - click a card -> opens modal (paper note) with full content + text
 *
 * Replace ITEMS' `content` values with your real assets / text.
 */

type ItemType = "image" | "video" | "text";

type ScrapItem = {
  id: string;
  type: ItemType;
  content: string; // url or text
  caption?: string;
  rotation?: number;
  width?: string;
};

const demoPLACEHOLDER = "/assets/placeholder.jpg"; // replace with your real images in /public/assets

export default function SpecialDayPage() {
  const { slug } = useParams(); // expects /special/:slug
  const navigate = useNavigate();

  const day = useMemo(
    () => specialDays.find((s) => s.path.endsWith(slug || "")),
    [slug]
  );

  // If the special day contains its own notes/contents, you can map them to the ITEMS below.
  // For convenience, we create 10 demo items (mix of image/video/text).
  const ITEMS: ScrapItem[] = useMemo(() => {
    // If day has notes (with type/content), use them (map & pad to 10)
    // Otherwise fallback to demo placeholders.
    const fromDay =
      (day as any)?.notes?.map(
        (n: any, idx: number): ScrapItem => ({
          id: `day-${idx}`,
          type:
            n.type === "text" ? "text" : n.type === "video" ? "video" : "image",
          content: n.content,
          caption: n.caption,
          rotation: n.style?.rotation ?? Math.round(Math.random() * 10 - 5),
          width: n.style?.width ?? "100%",
        })
      ) ?? [];

    // fill/pad to 10 with demo mixes
    const demo: ScrapItem[] = [
      {
        id: "1",
        type: "image",
        content: demoPLACEHOLDER,
        caption: "Khoảnh khắc",
        rotation: -4,
      },
      {
        id: "2",
        type: "text",
        content: "Sinh nhật 22 — nhớ mọi lời chúc.",
        caption: "Lời chúc",
        rotation: 3,
        width: "260px",
      },
      {
        id: "3",
        type: "image",
        content: demoPLACEHOLDER,
        caption: "Ảnh polaroid",
        rotation: 6,
      },
      {
        id: "4",
        type: "video",
        content: "/assets/demo_video.mp4",
        caption: "Clip ngắn",
        rotation: -2,
      },
      {
        id: "5",
        type: "text",
        content: "Ngày ấy mưa, chúng ta cùng cười.",
        caption: "Ghi chú",
        rotation: 5,
        width: "240px",
      },
      {
        id: "6",
        type: "image",
        content: demoPLACEHOLDER,
        caption: "Bức ảnh",
        rotation: -6,
      },
      {
        id: "7",
        type: "image",
        content: demoPLACEHOLDER,
        caption: "Kỷ niệm",
        rotation: 2,
      },
      {
        id: "8",
        type: "text",
        content: "Cảm ơn vì đã ở đó.",
        caption: "Note",
        rotation: -3,
      },
      {
        id: "9",
        type: "video",
        content: "/assets/demo_video2.mp4",
        caption: "Lời chúc",
        rotation: 4,
      },
      {
        id: "10",
        type: "image",
        content: demoPLACEHOLDER,
        caption: "Last",
        rotation: -1,
      },
    ];

    const merged = [...fromDay, ...demo].slice(0, 10);

    // ensure stable ids and some defaults
    return merged.map((it, i) => ({
      id: it.id ?? `auto-${i}`,
      type: it.type,
      content: it.content,
      caption: it.caption,
      rotation: it.rotation ?? Math.round(Math.random() * 8 - 4),
      width: it.width ?? "100%",
    }));
  }, [day]);

  const [active, setActive] = useState<ScrapItem | null>(null);

  return (
    <div className="min-h-screen p-4 md:p-8 bg-[url('/assets/grid-paper.png')] bg-repeat text-white/95">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="text-sm text-white/70 px-2 py-1 rounded hover:bg-white/5"
            >
              ← Quay lại
            </button>
            <h1 className="text-2xl md:text-3xl font-thin mt-2">
              {day?.label ?? "Special"}
            </h1>
            <div className="text-xs text-white/60 mt-1">
              {day
                ? `Ngày đặc biệt: ${new Date(day.date).toLocaleDateString()}`
                : "Demo scrapbook"}
            </div>
          </div>
        </div>

        {/* Grid: 3 cols desktop / 2 cols tablet / 1 col mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ITEMS.map((it) => (
            <ScrapCard key={it.id} item={it} onOpen={setActive} />
          ))}
        </div>
      </div>

      {/* Modal / Note */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              onClick={() => setActive(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="relative z-50 max-w-lg w-full bg-white/95 text-black rounded-2xl shadow-2xl p-5"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-3 right-3 text-sm text-black/60 hover:text-black"
              >
                ✕
              </button>

              <div className="flex flex-col items-center gap-4">
                {/* tape */}
                <div className="w-24 h-5 bg-[linear-gradient(90deg,#222,#555)] rounded-sm -translate-y-1" />

                <div className="w-full">
                  {active.type === "image" && (
                    <img
                      src={active.content}
                      alt={active.caption ?? ""}
                      className="w-full h-auto rounded-md object-cover"
                    />
                  )}
                  {active.type === "video" && (
                    <video
                      src={active.content}
                      controls
                      className="w-full rounded-md"
                    />
                  )}
                  {active.type === "text" && (
                    <div className="p-4 bg-white/90 rounded-md">
                      <p className="text-sm">{active.content}</p>
                    </div>
                  )}
                </div>

                {active.caption && (
                  <div className="text-sm text-black/60">{active.caption}</div>
                )}
                <div className="w-full text-xs text-black/60">
                  <em>Click outside or ✕ to close</em>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ScrapCard component (polaroid style) */
function ScrapCard({
  item,
  onOpen,
}: {
  item: ScrapItem;
  onOpen: (i: ScrapItem) => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="relative cursor-pointer"
      onClick={() => onOpen(item)}
    >
      {/* Polaroid white frame */}
      <div
        className="bg-white rounded-md p-3 shadow-lg"
        style={{
          transform: `rotate(${item.rotation}deg)`,
        }}
      >
        {/* tape */}
        <div className="flex justify-center">
          <div className="w-14 h-3 bg-black/80 rounded-sm -mt-2 shadow-md" />
        </div>

        {/* content area */}
        <div className="bg-white mt-2 rounded-md overflow-hidden flex items-center justify-center">
          {item.type === "image" && (
            <img
              src={item.content}
              alt={item.caption ?? ""}
              className="w-full h-56 object-cover"
            />
          )}

          {item.type === "video" && (
            <div className="w-full h-56 bg-black flex items-center justify-center">
              {/* show poster if you have one; otherwise video tag (muted) */}
              <video
                src={item.content}
                className="w-full h-full object-cover"
                muted
              />
            </div>
          )}

          {item.type === "text" && (
            <div className="p-4 h-56 flex items-center justify-center">
              <p className="text-sm text-gray-800 font-thin">{item.content}</p>
            </div>
          )}
        </div>

        {/* caption / white border bottom like polaroid */}
        <div className="text-center mt-2 pb-2">
          <div className="text-xs text-black/70">{item.caption ?? ""}</div>
        </div>
      </div>

      {/* small shadow / drop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "0 12px 24px rgba(0,0,0,0.35)",
          transform: `rotate(${item.rotation}deg)`,
        }}
      />
    </motion.div>
  );
}
