import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Reaction = keyof typeof reactionMap;
export const reactionMap = {
  up: "👍",
  down: "👎",
  fire: "🔥",
  lol: "🤣",
  thinking: "🤔",
  watching: "👀",
};
