import { isSameDay as fnsIsSameDay } from "date-fns";

export const isSameDay = (a: Date, b: Date) => fnsIsSameDay(a, b);
