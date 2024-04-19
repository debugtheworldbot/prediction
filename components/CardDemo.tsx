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
import Reactions from "./Reactions";
import Link from "next/link";

export enum PredictionStatus {
  Correct,
  Incorrect,
  ToBeRevealed,
}

export type Prediction = {
  user: {
    id: string;
    avatar: string;
    name: string;
  };
  prediction: {
    id: string;
    content: string;
    possibility: number;
    status: PredictionStatus;
    evidence?: string;
    risk?: string;
  };
};
type CardProps = React.ComponentProps<typeof Card> & Prediction;

const statusMap = {
  [PredictionStatus.Correct]: "Correct",
  [PredictionStatus.Incorrect]: "Incorrect",
  [PredictionStatus.ToBeRevealed]: "To be revealed",
};

export function CardDemo({ className, user, prediction, ...props }: CardProps) {
  return (
    <Link href={`/prediction/${prediction.id}`}>
      <Card className={cn(className)} {...props}>
        <CardHeader>
          <CardTitle className="flex items-center gap-4 sm:w-[40rem] w-[70vw]">
            <Avatar className="self-start cursor-pointer">
              <AvatarImage src={user.avatar} />
            </Avatar>
            {prediction.content}
          </CardTitle>
          <CardDescription
            className={clsx(
              "font-medium",
              prediction.status === PredictionStatus.Correct
                ? "text-green-500"
                : prediction.status === PredictionStatus.Incorrect
                  ? "text-red-500"
                  : "text-gray-500",
            )}
          >
            {statusMap[prediction.status]}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Progress value={prediction.possibility} />
          <span className="font-mono font-medium">
            {prediction.possibility}%
          </span>
        </CardContent>
        <CardFooter className="flex gap-2 text-gray-500">
          <Reactions />
        </CardFooter>
      </Card>
    </Link>
  );
}
