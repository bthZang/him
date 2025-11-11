// src/ruleEngine.ts
import { FEELINGS, SPECIAL_DAYS } from "./feelings";
import type { Feeling, ContentItem } from "./feelings";

export type ResolvedContent = { feeling: Feeling; items: ContentItem[] };

export function getFeelingById(id?: string): Feeling | undefined {
  return FEELINGS.find((f) => f.id === id);
}

export function checkSpecialDay(dateStr?: string): ResolvedContent | null {
  const d = dateStr || new Date().toISOString().slice(0, 10);
  const s = SPECIAL_DAYS[d];
  if (!s) return null;
  const feeling = getFeelingById(s.feelingId);
  if (!feeling) return null;
  const items =
    typeof s.contentIndex === "number"
      ? [feeling.contents[s.contentIndex]]
      : feeling.contents;
  return { feeling, items };
}

export function resolveContent(
  feelingId?: string,
  type?: string,
  dateStr?: string
): ResolvedContent | null {
  const special = checkSpecialDay(dateStr);
  if (special) {
    return filterByType(special, type);
  }

  let feeling = feelingId ? getFeelingById(feelingId) : undefined;
  if (!feeling) {
    const aggregated: ContentItem[] = [];
    FEELINGS.forEach((f) => {
      if (type && type !== "all") {
        const arr = f.contents.filter((c) => c.kind === type);
        aggregated.push(...arr);
      } else {
        aggregated.push(...f.contents);
      }
    });
    if (aggregated.length === 0) return null;
    return { feeling: FEELINGS[0], items: aggregated };
  }

  const items =
    type && type !== "all"
      ? feeling.contents.filter((c) => c.kind === type)
      : feeling.contents;
  return { feeling, items };
}

function filterByType(
  resolved: ResolvedContent,
  type?: string
): ResolvedContent {
  if (!type || type === "all") return resolved;
  const filtered = resolved.items.filter((c) => c.kind === type);
  return {
    feeling: resolved.feeling,
    items: filtered.length ? filtered : resolved.items,
  };
}

export function surpriseMe(): { feelingId: string; type: string } {
  const rndFeeling = FEELINGS[Math.floor(Math.random() * FEELINGS.length)];
  const types = ["quote", "image", "video", "music", "all"];
  const rndType = types[Math.floor(Math.random() * types.length)];
  return { feelingId: rndFeeling.id, type: rndType };
}
