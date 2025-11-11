// src/feelings.ts

export type ContentItem =
  | { kind: "quote"; text: string }
  | { kind: "image"; url: string; caption?: string }
  | { kind: "video" | "music"; url: string; caption?: string };

export type Feeling = {
  id: string;
  label: string;
  contents: ContentItem[];
};

export const FEELINGS: Feeling[] = [
  {
    id: "happy",
    label: "Vui",
    contents: [
      { kind: "quote", text: "Niềm vui là hạnh phúc nhỏ nhoi ghép lại 💙" },
      {
        kind: "music",
        url: "https://www.youtube.com/embed/5qap5aO4i9A",
        caption: "Chill vibes 🎵",
      },
      {
        kind: "image",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        caption: "Bình minh thật đẹp ☀️",
      },
    ],
  },
  {
    id: "sad",
    label: "Buồn",
    contents: [
      {
        kind: "quote",
        text: "Buồn cũng cần được lắng nghe, như một bài hát trầm 🎧",
      },
      {
        kind: "music",
        url: "https://www.youtube.com/embed/lnM1QfZ1s8k",
        caption: "Sad lofi",
      },
    ],
  },
  {
    id: "love",
    label: "Yêu",
    contents: [
      { kind: "quote", text: "Yêu là khi ta thấy mọi thứ đều đáng giá 💫" },
      {
        kind: "image",
        url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
      },
    ],
  },
  {
    id: "lonely",
    label: "Cô đơn",
    contents: [
      {
        kind: "quote",
        text: "Cô đơn không đáng sợ, đáng sợ là không ai hiểu mình 🌙",
      },
      {
        kind: "music",
        url: "https://www.youtube.com/embed/tgbNymZ7vqY",
        caption: "Lonely night",
      },
    ],
  },
];

export const SPECIAL_DAYS: Record<
  string,
  { feelingId: string; contentIndex?: number }
> = {
  // format YYYY-MM-DD
  "2025-12-24": { feelingId: "love", contentIndex: 0 },
  "2025-02-14": { feelingId: "love" },
};
