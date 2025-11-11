// src/components/RenderItem.tsx
export default function RenderItem({ item }: { item: any }) {
  if (!item) return null;

  switch (item.kind) {
    case "quote":
      return (
        <p className="italic text-sky-100/90 text-lg text-center max-w-xl">
          {item.text}
        </p>
      );

    case "image":
      return (
        <div className="flex flex-col items-center">
          <img
            src={item.url}
            alt={item.caption || ""}
            className="rounded-xl shadow-lg mx-auto max-h-[400px] object-cover"
          />
          {item.caption && (
            <p className="mt-3 text-sky-200 text-sm italic">{item.caption}</p>
          )}
        </div>
      );

    case "video":
    case "music":
      return (
        <div className="w-full max-w-2xl flex flex-col items-center">
          <iframe
            src={item.url}
            className="w-full aspect-video rounded-lg shadow-lg"
            allow="autoplay; encrypted-media"
          />
          {item.caption && (
            <p className="mt-2 text-sky-200 text-sm italic">{item.caption}</p>
          )}
        </div>
      );

    default:
      return null;
  }
}
