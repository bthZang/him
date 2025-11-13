export interface SpecialDay {
  date: Date;
  label: string;
  path: string;
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
  },
  {
    date: createLocalDate(2025, 11, 13),
    label: "Birthday",
    path: "/special/missing",
  },
];
