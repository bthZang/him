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
    contents: [],
  },
  {
    id: "2",
    label: "Hào hứng",
    contents: [],
  },
  {
    id: "3",
    label: "Tức giận",
    contents: [],
  },
  {
    id: "4",
    label: "Tủi thân",
    contents: [],
  },
  {
    id: "5",
    label: "Cô đơn",
    contents: [],
  },
  {
    id: "6",
    label: "Mệt mỏi",
    contents: [],
  },
  {
    id: "7",
    label: "Buồn",
    contents: [],
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
