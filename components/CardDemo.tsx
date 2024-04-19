import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "./ui/progress";
import { Avatar, AvatarImage } from "./ui/avatar";
import clsx from "clsx";
import Reactions, { reactionMap } from "./Reactions";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export enum PredictionStatus {
  Correct,
  Incorrect,
  ToBeRevealed,
}

export type Prediction = {
  user: {
    avatar_url: string;
    email: string;
    name: string;
  };
  prediction: {
    id: string;
    content: string;
    possibility: number;
    status: PredictionStatus;
    evidence: string | null;
    risk: string | null;
  };
  reactions: {
    up: number | null;
    down: number | null;
    fire: number | null;
    lol: number | null;
    thinking: number | null;
    watching: number | null;
  } | null;
};
type CardProps = React.ComponentProps<typeof Card> & Prediction;

const statusMap = {
  [PredictionStatus.Correct]: "Correct",
  [PredictionStatus.Incorrect]: "Incorrect",
  [PredictionStatus.ToBeRevealed]: "To be revealed",
};

export function CardDemo({
  className,
  user,
  prediction,
  reactions,
  ...props
}: CardProps) {
  return (
    <Card className={cn(className, "w-[70vw] sm:w-[40rem]")} {...props}>
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <Avatar className="self-start cursor-pointer">
            <AvatarImage src={user.avatar_url} />
          </Avatar>
          {prediction.content}
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        {prediction.evidence && (
          <div className="break-all flex items-center gap-2">
            <Badge className="flex-shrink-0">PROS</Badge>
            {prediction?.evidence}
          </div>
        )}
        {prediction.risk && (
          <div className="break-all flex items-center gap-2 mt-2">
            <Badge variant="destructive" className="self-start flex-shrink-0">
              CONS
            </Badge>
            {prediction?.risk}
          </div>
        )}
        <div className="flex items-center gap-4 mt-4">
          <Progress value={prediction.possibility} />
          <span className="font-mono font-medium">
            {prediction.possibility}%
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 text-gray-500">
        {reactions &&
          getEntries(reactions)
            .filter(([, v]) => v && v > 0)
            .map(([k, v]) => (
              <Button
                variant="outline"
                className="rounded-full border px-2 h-8"
              >
                {reactionMap[k]}&nbsp;
                {v}
              </Button>
            ))}
        <Reactions />
        <span
          className={clsx(
            "font-medium text-center",
            prediction.status === PredictionStatus.Correct
              ? "text-green-500"
              : prediction.status === PredictionStatus.Incorrect
                ? "text-red-500"
                : "text-gray-500",
          )}
        >
          {statusMap[prediction.status]}
        </span>
      </CardFooter>
    </Card>
  );
}

const getEntries = <T extends object>(obj: T) =>
  Object.entries(obj) as Entries<T>;

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
