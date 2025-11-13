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
    date: createLocalDate(2025, 11, 6),
    label: "Anniversary",
    path: "/special/stillness",
    content: {
      text: "Sau cơn bão là khoảng lặng, nơi hai đứa tìm lại nhau.",
      image: "/images/stillness.jpg",
      audio: "/audios/stillness.mp3",
    },
  },
  {
    date: createLocalDate(2025, 11, 13),
    label: "Birthday",
    path: "/special/scrapbook",
    content: {
      text: "Mọi người gửi lời chúc, còn mình chỉ muốn nghe cậu cười.",
      video: "/videos/birthday.mp4",
      image: "/images/birthday_note.jpg",
    },
  },
];
