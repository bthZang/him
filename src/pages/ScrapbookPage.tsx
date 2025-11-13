// src/pages/ScrapbookPage.tsx
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { X, FileText } from "lucide-react";

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
  const ITEMS: ScrapItem[] = useMemo(
    () => [
      {
        id: 1,
        type: "image",
        src: `${DEMO_PLACEHOLDER}?1`,
        caption: "Ảnh 1",
        note: "Chúc anh luôn tinh tế, kinh tế và tử tế.",
        popupKind: "inline",
      },
      {
        id: 2,
        type: "image",
        src: `${DEMO_PLACEHOLDER}?2`,
        caption: "Ảnh 2",
        note: "Nụ cười không phai.",
        popupKind: "modal",
      },
      {
        id: 3,
        type: "video",
        src: DEMO_VIDEO,
        caption: "Clip 1",
        note: "Hạnh phúc nhé.",
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
  const orientationOf = (index: number): "vertical" | "horizontal" =>
    index % 5 < 3 ? "vertical" : "horizontal";

  const randomized = useMemo(
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
        background: "linear-gradient(#0b1f35)",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col items-center mb-10 "
        >
          <div className="absolute inset-0 flex items-center justify-center text-[180px] font-bold text-[#bcd9f7]/20 select-none animate-22">
            22
          </div>

          <div className="relative mb-6 z-[9999]">
            <div
              className="absolute -top-[45px] left-1/2 -translate-x-1/2 flex flex-col items-center scale-50 "
              style={{ zIndex: 99999 }}
            >
              <div
                className="w-3 h-5 rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 animate-flicker z-[90999]"
                style={{
                  filter:
                    "drop-shadow(0 0 8px rgba(255,200,120,0.9)) drop-shadow(0 0 10px rgba(255,150,50,0.7))",
                }}
              ></div>
              <div className="w-2.5 h-[40px] bg-gradient-to-t from-[#a3c8f0] to-[#d4e8fb] rounded-t-sm shadow-inner"></div>
            </div>

            <div className="w-28 h-12 bg-[#d4e8fb] rounded-t-xl border-4 border-[#a3c8f0] shadow-inner relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-4 bg-[#f7fbff] rounded-t-xl" />
              <div className="absolute bottom-0 left-0 w-full h-2 bg-[#a3c8f0]/60" />
            </div>

            <div
              className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-10 rounded-full blur-xl opacity-60 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,180,100,0.7) 0%, rgba(255,180,100,0) 70%)",
              }}
            ></div>
          </div>

          <motion.h1
            className="text-3xl md:text-4xl font-light text-transparent bg-clip-text z-10"
            style={{
              backgroundImage:
                "linear-gradient(90deg,#ffffff,#cfe7ff,#a3c8f0,#d4e8fb)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            🎂 Happy Birthday to <span className="font-semibold">Mus</span> —
            26/9
          </motion.h1>

          {/* Subtext */}
          <div className="text-sm text-white/80 mt-2 z-10">
            Scroll to see memories — tap to read notes 💌
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {randomized.map((it, idx) => (
            <div key={it.id} className="flex justify-center">
              <ScrapCard
                item={it}
                index={idx}
                onInlineToggle={(id: number) =>
                  setInlineOpenId((prev) => (prev === id ? null : id))
                }
                inlineOpenId={inlineOpenId}
                onOpenModal={(item: ScrapItem) => setModalOpenItem(item)}
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
              {/* Overlay */}
              <motion.div
                className="fixed inset-0 bg-black/60 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* ✅ Fixed centered modal */}
              <Dialog.Content asChild forceMount>
                <motion.div
                  className="fixed inset-0 z-50 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-4 max-w-xl w-[92%]">
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
                            className="w-full rounded-lg object-cover"
                          />
                        ) : (
                          <video
                            src={modalOpenItem.src}
                            controls
                            className="w-full rounded-lg object-cover"
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
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- ScrapCard ---------- */
function ScrapCard({ item, onInlineToggle, inlineOpenId, onOpenModal }: any) {
  const isInlineOpen = inlineOpenId === item.id;
  const orientationClass =
    item.orientation === "vertical"
      ? "aspect-[3/4] w-[220px]"
      : "aspect-video w-[300px]";

  const baseFrameCommon =
    "relative rounded-lg overflow-hidden flex flex-col items-stretch justify-start transition-transform shadow-lg";
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
        onClick={() => {
          item.popupKind === "modal"
            ? onOpenModal(item)
            : onInlineToggle(item.id);
        }}
      >
        <div className={`flex-1 ${item.frameType === 2 ? "p-3" : "p-1"}`}>
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

        {/* Nút mở note */}
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
      </motion.div>
    </div>
  );
}
