// src/constants/specialDays.ts
export interface SpecialDay {
  date: Date;
  label: string;
  path: string;
  content: {
    text?: string;
    image?: string;
    video?: string;
    audio?: string;
  };
}

function createLocalDate(year: number, month: number, day: number) {
  const d = new Date(year, month - 1, day);
  d.setHours(0, 0, 0, 0);
  return d;
}

export const specialDays: SpecialDay[] = [
  {
    date: createLocalDate(2025, 11, 15),
    label: "Birthday",
    path: "/special/scrapbook",
    content: {
    },
  },
];
