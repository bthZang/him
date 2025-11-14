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
    id: "1",
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
    id: "2",
    label: "Hào hứng",
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
    id: "33",
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
    id: "4",
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
    id: "5",
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
    id: "6",
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
  {
    id: "7",
    label: "Buồn",
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
