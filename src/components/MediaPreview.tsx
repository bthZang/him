// components/MediaPreview.tsx
const isYoutubeUrl = (url: string) =>
  url.includes("youtube.com") || url.includes("youtu.be");

const isImage = (url: string) => url.match(/\.(jpeg|jpg|png|gif|webp)$/i);

const isVideo = (url: string) => url.match(/\.(mp4|mov|webm|ogg)$/i);

export default function MediaPreview({ src }: { src: string }) {
  if (!src) return null;

  if (isYoutubeUrl(src)) {
    const embed = src
      .replace("watch?v=", "embed/")
      .replace("youtu.be/", "www.youtube.com/embed/");

    return (
      <iframe
        src={embed}
        width="100%"
        height="220"
        allowFullScreen
        className="rounded-xl"
      ></iframe>
    );
  }

  if (isImage(src)) {
    return <img src={src} className="w-full rounded-xl object-cover" alt="" />;
  }

  if (isVideo(src)) {
    return <video src={src} controls className="w-full rounded-xl" />;
  }

  return (
    <div className="text-white p-3 bg-gray-700 rounded-xl">
      Unsupported: {src}
    </div>
  );
}
