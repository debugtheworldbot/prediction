import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getEntries = <T extends object>(obj: T) =>
  Object.entries(obj) as Entries<T>;

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export type Reaction = keyof typeof reactionMap;
export const reactionMap = {
  up: "👍",
  down: "👎",
  fire: "🔥",
  lol: "🤣",
  thinking: "🤔",
  watching: "👀",
};

export const updateCounts = (result: Record<string, any>[] | null) => {
  const counts = {
    up: 0,
    down: 0,
    fire: 0,
    lol: 0,
    thinking: 0,
    watching: 0,
  };
  result?.forEach((r) => {
    if (r.up) {
      counts.up++;
    }
    if (r.down) {
      counts.down++;
    }
    if (r.fire) {
      counts.fire++;
    }
    if (r.lol) {
      counts.lol++;
    }
    if (r.thinking) {
      counts.thinking++;
    }
    if (r.watching) {
      counts.watching++;
    }
  });
  return counts;
};
