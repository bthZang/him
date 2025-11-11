// src/components/RenderItem.tsx
export default function RenderItem({ item }: { item: any }) {
  if (!item) return null;

  switch (item.type) {
    case "quote":
      return <p className="italic text-sky-100/90 text-lg">{item.content}</p>;

    case "image":
      return (
        <img
          src={item.content}
          alt=""
          className="rounded-xl shadow-lg mx-auto max-h-[400px]"
        />
      );

    case "video":
    case "music":
      return (
        <iframe
          src={item.content}
          className="w-full aspect-video rounded-lg"
          allow="autoplay; encrypted-media"
        />
      );

    default:
      return null;
  }
}
