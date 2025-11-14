import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import ContentCard from "../components/ContentCard";

const DEMO_PLACEHOLDER = "https://picsum.photos/800/1000";
const DEMO_VIDEO = "https://www.w3schools.com/html/mov_bbb.mp4";

type ScrapItem = {
  type: string;
  src: string;
  caption?: string;
  frameType: number;
  orientation: "vertical" | "horizontal";
  rotate: number;
  tx: number;
  ty: number;
};

export default function ContentPage() {
  const location = useLocation();
  const content = location.state?.content ?? [];

  const ITEMS = useMemo(() => {
    let list = content;

    if (!list || list.length === 0) {
      list = [
        { type: "image", src: `${DEMO_PLACEHOLDER}?1`, caption: "Love 1" },
        { type: "image", src: `${DEMO_PLACEHOLDER}?2`, caption: "Love 2" },
        { type: "image", src: `${DEMO_PLACEHOLDER}?3`, caption: "Love 3" },
        { type: "image", src: `${DEMO_PLACEHOLDER}?4`, caption: "Love 4" },
        { type: "image", src: `${DEMO_PLACEHOLDER}?5`, caption: "Love 5" },
      ];
    }

    return list.map((item: any, i: number) => ({
      ...item,
      frameType: (i % 4) + 1,
      orientation: i % 5 < 3 ? "vertical" : "horizontal",
      rotate: (Math.random() - 0.5) * 6,
      tx: (Math.random() - 0.5) * 10,
      ty: (Math.random() - 0.5) * 8,
    }));
  }, [content]);

  return (
    <div className="min-h-screen w-full" style={{ background: "#07182A" }}>
      <div className="w-full max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-center text-white text-xl mb-6">
          Nội dung dành cho bạn 💙
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {ITEMS.map((it: ScrapItem, idx: number) => (
            <div key={idx} className="flex justify-center">
              <ContentCard item={it} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
