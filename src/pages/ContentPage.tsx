import { useMemo } from "react";
import ContentCard from "../components/ContentCard";
import { useEncryptedContent } from "../hooks/useEncryptedContent";
import { useParams } from "react-router-dom";

const DEMO_PLACEHOLDER = "https://picsum.photos/800/1000";
const DEMO_VIDEO = "https://www.w3schools.com/html/mov_bbb.mp4";

type RawItem = {
  id?: number | string;
  type?: string;
  src?: string;
  caption?: string;
  note?: string;
  popup?: "inline" | "modal";
};

type ScrapItem = {
  id: number;
  type: "image" | "video";
  src: string;
  caption?: string;
  note?: string;
  popupKind: "inline" | "modal";
  frameType: number;
  orientation: "vertical" | "horizontal";
  rotate: number;
  tx: number;
  ty: number;
};

function normalizeSrc(src?: string): string {
  if (!src) return "";
  if (src.includes("/embed/")) return src;

  try {
    const url = new URL(src);

    if (url.hostname.includes("youtube.com")) {
      const id = url.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }

    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.replace("/", "");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch {}

  if (src.endsWith(".mp4")) {
    return src.replace(/\s/g, "%20");
  }

  return src;
}


export default function ContentPage() {

  const { feelingId, type } = useParams();
  const feeling = Number(feelingId);
  const contentType = type ?? "whatever";

  const { data: encryptedItems, error } = useEncryptedContent(
    feeling,
    contentType
  );

  const mapped = useMemo<ScrapItem[]>(() => {
    if (!Array.isArray(encryptedItems) || encryptedItems.length === 0)
      return [];

    return encryptedItems.map((raw: RawItem, idx: number) => {
      const src = normalizeSrc(raw.src);
      const detectedType =
        raw.type ??
        (src.includes(".mp4") ||
        src.includes("youtube") ||
        src.includes("youtu.be") ||
        src.includes("/embed/")
          ? "video"
          : "image");

      const idFromRaw =
        typeof raw.id === "number" ? raw.id : raw.id ? Number(raw.id) : null;
      const id =
        idFromRaw !== null && !Number.isNaN(idFromRaw) ? idFromRaw : 1000 + idx;

      return {
        id,
        type: detectedType === "video" ? "video" : "image",
        src:
          src ||
          (detectedType === "video"
            ? DEMO_VIDEO
            : `${DEMO_PLACEHOLDER}?mapped-${idx}`),
        caption: raw.caption ?? `Love ${idx + 1}`,
        popupKind: (raw.popup as "inline" | "modal") ?? "inline",
        frameType: 1,
        orientation: "vertical",
        rotate: 0,
        tx: 0,
        ty: 0,
      };
    });
  }, [encryptedItems]);

  const FALLBACK: ScrapItem[] = useMemo(() => {
    const base = [
      {
        id: 1,
        type: "image" as const,
        src: `${DEMO_PLACEHOLDER}?1`,
        caption: "Ảnh 1",
        popupKind: "inline" as const,
      },
      {
        id: 2,
        type: "image" as const,
        src: `${DEMO_PLACEHOLDER}?2`,
        caption: "Ảnh 2",
        popupKind: "modal" as const,
      },
      {
        id: 3,
        type: "video" as const,
        src: DEMO_VIDEO,
        caption: "Video",
        popupKind: "inline" as const,
      },
      {
        id: 4,
        type: "image" as const,
        src: `${DEMO_PLACEHOLDER}?4`,
        caption: "Ảnh 4",
        popupKind: "inline" as const,
      },
      {
        id: 5,
        type: "image" as const,
        src: `${DEMO_PLACEHOLDER}?5`,
        caption: "Ảnh 5",
        popupKind: "modal" as const,
      },
    ] as const;

    const usedIds = new Set(mapped.map((m) => m.id));
    return base.map((it) => {
      let id = it.id;
      while (usedIds.has(id)) id += 100;

      const item: ScrapItem = {
        id,
        type: it.type,
        src: it.src,
        caption: it.caption,
        note: undefined,
        popupKind: it.popupKind,
        frameType: 1,
        orientation: "vertical",
        rotate: (Math.random() - 0.5) * 6,
        tx: (Math.random() - 0.5) * 10,
        ty: (Math.random() - 0.5) * 8,
      };

      return item;
    });
  }, [mapped]);

  const ITEMS = useMemo<ScrapItem[]>(() => {
    const max = 5;
    const items: ScrapItem[] = [];

    for (let i = 0; i < max; i++) {
      if (mapped[i]) items.push(mapped[i]);
      else items.push(FALLBACK[i]);
    }

    return items;
  }, [mapped, FALLBACK]);

  const randomized = useMemo<ScrapItem[]>(() => {
    return ITEMS.map((it, i) => ({
      ...it,
      frameType: (i % 4) + 1,
      orientation: i % 5 < 3 ? "vertical" : "horizontal",
      rotate: (Math.random() - 0.5) * 6,
      tx: (Math.random() - 0.5) * 10,
      ty: (Math.random() - 0.5) * 8,
    }));
  }, [ITEMS]);

  if (error) console.warn("Decrypt error:", error);

  return (
    <div className="min-h-screen w-full" style={{ background: "#07182A" }}>
      <div className="w-full max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-center text-white text-xl mb-6">
          Enjoyed 💙
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {randomized.map((it) => (
            <div key={it.id} className="flex justify-center">
              <ContentCard item={it} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
