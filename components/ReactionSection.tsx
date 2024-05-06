"use client";

import { getEntries, reactionMap } from "@/lib/utils";
import { Prediction } from "./PredictionCard";
import clsx from "clsx";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Button } from "./ui/button";
import { makeReaction } from "@/app/actions";
import { useCallback, useState } from "react";

interface Props {
  reactions: Prediction["reactions"];
  selfReactions: Prediction["userReactions"][0];
  predictionId: string;
}
export function ReactionSection({
  reactions,
  selfReactions,
  predictionId,
}: Props) {
  const [localReactions, setLocalReactions] = useState(reactions);
  const [localSelfReactions, setLocalSelfReactions] = useState(selfReactions);

  const onReaction = useCallback(
    (key: keyof typeof reactionMap, value: boolean) => {
      setLocalSelfReactions((s) => ({
        ...s,
        [key]: value,
      }));
      setLocalReactions((r) => {
        if (!r) return reactions;
        const v = r[key];
        const result: Prediction["reactions"] = {
          ...r,
          [key]: value ? (v || 0) + 1 : v && v > 1 ? v - 1 : null,
        };
        return result;
      });
    },
    [reactions],
  );

  return (
    <div className="flex gap-2 text-gray-500 flex-wrap">
      {localReactions &&
        getEntries(localReactions)
          .filter(([, v]) => v && v > 0)
          .map(([k, v]) => (
            <Button
              key={k}
              variant="outline"
              className={clsx(
                "rounded-full border px-2 h-8 text-base hover:bg-blue-200",
                localSelfReactions &&
                localSelfReactions[k] &&
                "border-blue-500 bg-blue-100",
              )}
              onClick={async () => {
                const value = !localSelfReactions[k];
                setLocalSelfReactions({
                  ...localSelfReactions,
                  [k]: value,
                });
                setLocalReactions({
                  ...localReactions,
                  [k]: value ? (v || 0) + 1 : v && v > 1 ? v - 1 : null,
                });
                await makeReaction(predictionId, { [k]: value });
              }}
            >
              {reactionMap[k]}&nbsp;
              {v}
            </Button>
          ))}
      <Reactions
        id={predictionId}
        selfReactions={localSelfReactions}
        onReaction={onReaction}
      />
    </div>
  );
}

function Reactions(props: {
  id: string;
  selfReactions: Prediction["userReactions"][0];
  onReaction: (key: keyof typeof reactionMap, value: boolean) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="rounded-full border w-8 h-8 p-0">
          {emoji}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex gap-2">
        {getEntries(reactionMap).map(([k, v]) => (
          <PopoverClose
            className={clsx(
              "p-0 w-10 h-10 rounded hover:bg-gray-100 cursor-pointer",
              props.selfReactions && props.selfReactions[k] && "bg-blue-100",
            )}
            key={k}
            onClick={async () => {
              props.onReaction(k, !props.selfReactions[k]);
              await makeReaction(props.id, { [k]: !props.selfReactions[k] });
            }}
          >
            {v}
          </PopoverClose>
        ))}
      </PopoverContent>
    </Popover>
  );
}

const emoji = (
  <svg
    height="18"
    aria-hidden="true"
    viewBox="0 0 16 16"
    version="1.1"
    width="18"
    data-view-component="true"
  >
    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm3.82 1.636a.75.75 0 0 1 1.038.175l.007.009c.103.118.22.222.35.31.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371.13-.088.247-.192.35-.31l.007-.008a.75.75 0 0 1 1.222.87l-.022-.015c.02.013.021.015.021.015v.001l-.001.002-.002.003-.005.007-.014.019a2.066 2.066 0 0 1-.184.213c-.16.166-.338.316-.53.445-.63.418-1.37.638-2.127.629-.946 0-1.652-.308-2.126-.63a3.331 3.331 0 0 1-.715-.657l-.014-.02-.005-.006-.002-.003v-.002h-.001l.613-.432-.614.43a.75.75 0 0 1 .183-1.044ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM5 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm5.25 2.25.592.416a97.71 97.71 0 0 0-.592-.416Z"></path>
  </svg>
);
