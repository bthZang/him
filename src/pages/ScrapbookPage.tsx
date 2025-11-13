// src/pages/ScrapbookPage.tsx
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { X, FileText } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { specialDays } from "../constants/specialDays";

/**
 * ScrapbookPage (TypeScript-fixed)
 *
 * Fix: orientationOf returns explicit union type "vertical" | "horizontal"
 * and randomized is typed so TS knows the shape.
 */

type ItemType = "image" | "video";
type PopupKind = "inline" | "modal";

type ScrapItem = {
  id: number;
  type: ItemType;
  src: string;
  caption?: string;
  note?: string;
  popupKind: PopupKind;
};

const DEMO_PLACEHOLDER = "https://picsum.photos/800/1000";
const DEMO_VIDEO = "https://www.w3schools.com/html/mov_bbb.mp4";

export default function ScrapbookPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const day = useMemo(
    () => specialDays.find((s) => s.path.endsWith(slug || "")),
    [slug]
  );

  const ITEMS: ScrapItem[] = useMemo(
    () => [
      {
        id: 1,
        type: "image",
        src: `${DEMO_PLACEHOLDER}?1`,
        caption: "Khoảnh khắc 1",
        note: "Ngày ấy trời yên lặng.",
        popupKind: "inline",
      },
      {
        id: 2,
        type: "image",
        src: `${DEMO_PLACEHOLDER}?2`,
        caption: "Khoảnh khắc 2",
        note: "Nụ cười không phai.",
        popupKind: "modal",
      },
      {
        id: 3,
        type: "video",
        src: DEMO_VIDEO,
        caption: "Clip ngắn",
        note: "Gửi cậu một đoạn clip.",
        popupKind: "inline",
      },
      {
        id: 4,
        type: "image",
        src: `${DEMO_PLACEHOLDER}?4`,
        caption: "Ảnh 4",
        note: "Một chút nhớ.",
        popupKind: "modal",
      },
      {
        id: 5,
        type: "image",
        src: `${DEMO_PLACEHOLDER}?5`,
        caption: "Ảnh 5",
        note: "Cảm ơn vì đã ở đó.",
        popupKind: "inline",
      },
      {
        id: 6,
        type: "image",
        src: `${DEMO_PLACEHOLDER}?6`,
        caption: "Ảnh 6",
        note: "Lời chúc nhẹ.",
        popupKind: "modal",
      },
      {
        id: 7,
        type: "video",
        src: DEMO_VIDEO,
        caption: "Clip 2",
        note: "Và ta đi qua.",
        popupKind: "inline",
      },
      {
        id: 8,
        type: "image",
        src: `${DEMO_PLACEHOLDER}?8`,
        caption: "Ảnh 8",
        note: "Hồi ức nhỏ.",
        popupKind: "modal",
      },
      {
        id: 9,
        type: "image",
        src: `${DEMO_PLACEHOLDER}?9`,
        caption: "Ảnh 9",
        note: "Một chút ấm.",
        popupKind: "inline",
      },
      {
        id: 10,
        type: "image",
        src: `${DEMO_PLACEHOLDER}?10`,
        caption: "Ảnh 10",
        note: "Ghi chú cuối.",
        popupKind: "modal",
      },
    ],
    []
  );

  const frameTypeOf = (index: number) => (index % 4) + 1;

  // <-- fix: explicitly return union type so TS knows this is not arbitrary string
  const orientationOf = (index: number): "vertical" | "horizontal" =>
    index % 5 < 3 ? "vertical" : "horizontal";

  // typed randomized so TS knows exact shape (orientation specifically)
  const randomized: Array<
    ScrapItem & {
      rotate: number;
      tx: number;
      ty: number;
      frameType: number;
      orientation: "vertical" | "horizontal";
    }
  > = useMemo(
    () =>
      ITEMS.map((it, i) => ({
        ...it,
        rotate: (Math.random() - 0.5) * 8,
        tx: (Math.random() - 0.5) * 8,
        ty: (Math.random() - 0.5) * 6,
        frameType: frameTypeOf(i),
        orientation: orientationOf(i),
      })),
    [ITEMS]
  );

  const [inlineOpenId, setInlineOpenId] = useState<number | null>(null);
  const [modalOpenItem, setModalOpenItem] = useState<ScrapItem | null>(null);

  return (
    <div
      className="min-h-screen w-full text-white"
      style={{
        background: "linear-gradient(180deg,#0a2247 0%,#183c73 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-3xl md:text-4xl font-extralight mb-1 text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(90deg,#ffffff,#9be7ff,#62d0ff)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            🎂 {day?.label ?? "Special"} —{" "}
            {day ? new Date(day.date).toLocaleDateString() : "13.11"}
          </motion.h1>
          <div className="text-sm text-white/70 mb-6">
            Scroll to see memories — tap to read notes
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {randomized.map((it, idx) => (
            <div key={it.id} className="flex justify-center">
              <ScrapCard
                item={it}
                index={idx}
                onInlineToggle={(id) =>
                  setInlineOpenId((prev) => (prev === id ? null : id))
                }
                inlineOpenId={inlineOpenId}
                onOpenModal={(item) => setModalOpenItem(item)}
              />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {modalOpenItem && (
          <Dialog.Root
            open
            onOpenChange={(open) => !open && setModalOpenItem(null)}
          >
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
              <Dialog.Content
                className="fixed z-60 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-gray-900 rounded-2xl shadow-2xl p-4 max-w-xl w-[92%]"
                onInteractOutside={() => setModalOpenItem(null)}
              >
                <div className="flex justify-end">
                  <button
                    onClick={() => setModalOpenItem(null)}
                    className="p-1 rounded hover:bg-black/5 text-gray-700"
                  >
                    <X />
                  </button>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="flex-1">
                    {modalOpenItem.type === "image" ? (
                      <img
                        src={modalOpenItem.src}
                        alt={modalOpenItem.caption}
                        className="w-full rounded"
                      />
                    ) : (
                      <video
                        src={modalOpenItem.src}
                        controls
                        className="w-full rounded"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-2">
                      {modalOpenItem.caption}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {modalOpenItem.note}
                    </p>
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- ScrapCard ---------- */
function ScrapCard({
  item,
  index,
  onInlineToggle,
  inlineOpenId,
  onOpenModal,
}: {
  item: ScrapItem & {
    rotate: number;
    tx: number;
    ty: number;
    frameType: number;
    orientation: "vertical" | "horizontal";
  };
  index: number;
  onInlineToggle: (id: number) => void;
  inlineOpenId: number | null;
  onOpenModal: (it: ScrapItem) => void;
}) {
  const isInlineOpen = inlineOpenId === item.id;
  const orientationClass =
    item.orientation === "vertical"
      ? "aspect-[3/4] w-[220px]"
      : "aspect-video w-[300px]";

  const baseFrameCommon =
    "relative rounded-lg overflow-hidden flex flex-col items-stretch justify-start transition-transform shadow-lg";
  const frameStyle =
    item.frameType === 1
      ? `${baseFrameCommon} bg-gradient-to-br from-white/95 to-sky-50/60 border border-white/0`
      : item.frameType === 2
      ? `${baseFrameCommon} bg-white/95 relative after:absolute after:inset-[6px] after:border-[3px] after:border-dashed after:border-sky-300 after:rounded-lg after:pointer-events-none`
      : item.frameType === 3
      ? `${baseFrameCommon} bg-amber-50/90`
      : `${baseFrameCommon} bg-white/98 border border-white/90`;

  const jaggedClip =
    "polygon(0% 4%,4% 0%,96% 0%,100% 4%,100% 92%,96% 100%,4% 100%,0% 92%)";

  return (
    <div
      className="relative"
      style={{
        transform: `translate(${item.tx}px, ${item.ty}px) rotate(${item.rotate}deg)`,
      }}
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={`${frameStyle} ${orientationClass}`}
        style={{
          boxShadow: "0 8px 18px rgba(2,6,23,0.45)",
          ...(item.frameType === 3 ? { clipPath: jaggedClip } : {}),
        }}
      >
        <div className="flex-1 relative">
          <div
            className={`${
              item.frameType === 2 ? "p-3" : "p-1"
            } h-full flex items-center justify-center bg-transparent`}
          >
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={item.caption}
                className="w-full h-full object-cover rounded-sm"
              />
            ) : (
              <video
                src={item.src}
                className="w-full h-full object-cover"
                muted
                loop
              />
            )}
          </div>

          {item.frameType === 4 && (
            <div className="absolute bottom-0 left-0 right-0 text-center pb-3 pt-2">
              <div className="text-xs text-gray-600">{item.caption}</div>
            </div>
          )}

          <div className="absolute top-3 right-3 flex items-center gap-2">
            {item.popupKind === "inline" ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onInlineToggle(item.id);
                }}
                className="bg-white/95 text-gray-800 p-1 rounded-full shadow-sm border"
                title="Open note"
              >
                <FileText className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenModal(item);
                }}
                className="bg-white/95 text-gray-800 px-2 py-1 rounded-md text-xs font-medium shadow-sm border"
              >
                {item.caption ?? "Preview"}
              </button>
            )}
          </div>

          <AnimatePresence>
            {item.popupKind === "inline" && isInlineOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -6 }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                onClick={(e) => e.stopPropagation()}
                className="absolute right-3 top-12 z-40 max-w-xs md:max-w-sm"
              >
                <div className="bg-yellow-50/95 text-gray-900 p-3 rounded-lg shadow-md border">
                  <div className="flex items-start gap-2">
                    <div className="p-1 rounded-md bg-white/90">
                      <FileText className="w-4 h-4 text-gray-700" />
                    </div>
                    <div className="text-sm leading-relaxed">{item.note}</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
