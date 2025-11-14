// src/feelings.ts

export type ContentItem =
  | { kind: "watch"; url: string; caption?: string }
  | { kind: "listen"; url: string; caption?: string }
  | { kind: "whatever"; url: string; caption?: string };

export type Feeling = {
  id: string;
  label: string;
  contents: ContentItem[];
};

export const FEELINGS: Feeling[] = [
  {
    id: "Chán",
    label: "Chán",
    contents: [
      {
        kind: "watch",
        url: "",
        caption: "Niềm vui là hạnh phúc nhỏ nhoi ghép lại 💙",
      },
      {
        kind: "listen",
        url: "https://www.youtube.com/embed/5qap5aO4i9A",
        caption: "Chill vibes 🎵",
      },
      {
        kind: "whatever",
        url: "https://www.youtube.com/embed/5qap5aO4i9A",
        caption: "Chill vibes 🎵",
      },
    ],
  },
  {
    id: "Tăng động",
    label: "Tăng động",
    contents: [
      {
        kind: "watch",
        url: "",
        caption: "Niềm vui là hạnh phúc nhỏ nhoi ghép lại 💙",
      },
      {
        kind: "listen",
        url: "https://www.youtube.com/embed/5qap5aO4i9A",
        caption: "Chill vibes 🎵",
      },
      {
        kind: "whatever",
        url: "https://www.youtube.com/embed/5qap5aO4i9A",
        caption: "Chill vibes 🎵",
      },
    ],
  },
  {
    id: "Tức giận",
    label: "Tức giận",
    contents: [
      {
        kind: "watch",
        url: "",
        caption: "Niềm vui là hạnh phúc nhỏ nhoi ghép lại 💙",
      },
      {
        kind: "listen",
        url: "https://www.youtube.com/embed/5qap5aO4i9A",
        caption: "Chill vibes 🎵",
      },
      {
        kind: "whatever",
        url: "https://www.youtube.com/embed/5qap5aO4i9A",
        caption: "Chill vibes 🎵",
      },
    ],
  },
  {
    id: "Tủi thân",
    label: "Tủi thân",
    contents: [
      {
        kind: "watch",
        url: "",
        caption: "Niềm vui là hạnh phúc nhỏ nhoi ghép lại 💙",
      },
      {
        kind: "listen",
        url: "https://www.youtube.com/embed/5qap5aO4i9A",
        caption: "Chill vibes 🎵",
      },
      {
        kind: "whatever",
        url: "https://www.youtube.com/embed/5qap5aO4i9A",
        caption: "Chill vibes 🎵",
      },
    ],
  },
  {
    id: "Cô đơn",
    label: "Cô đơn",
    contents: [
      {
        kind: "watch",
        url: "",
        caption: "Niềm vui là hạnh phúc nhỏ nhoi ghép lại 💙",
      },
      {
        kind: "listen",
        url: "https://www.youtube.com/embed/5qap5aO4i9A",
        caption: "Chill vibes 🎵",
      },
      {
        kind: "whatever",
        url: "https://www.youtube.com/embed/5qap5aO4i9A",
        caption: "Chill vibes 🎵",
      },
    ],
  },
  {
    id: "Mệt mỏi",
    label: "Mệt mỏi",
    contents: [
      {
        kind: "watch",
        url: "",
        caption: "Niềm vui là hạnh phúc nhỏ nhoi ghép lại 💙",
      },
      {
        kind: "listen",
        url: "https://www.youtube.com/embed/5qap5aO4i9A",
        caption: "Chill vibes 🎵",
      },
      {
        kind: "whatever",
        url: "https://www.youtube.com/embed/5qap5aO4i9A",
        caption: "Chill vibes 🎵",
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
