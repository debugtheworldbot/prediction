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
    status: "Correct" | "Incorrect" | "To be revealed";
    evidence?: string;
    risk?: string;
  };
};
type CardProps = React.ComponentProps<typeof Card> & Prediction;

export function CardDemo({ className, user, prediction, ...props }: CardProps) {
  return (
    <Link href={`/prediction/${prediction.id}`}>
      <Card className={cn(className)} {...props}>
        <CardHeader>
          <CardTitle className="flex items-center gap-4 sm:w-96 w-[70vw]">
            <Avatar className="self-start cursor-pointer">
              <AvatarImage src={user.avatar} />
            </Avatar>
            {prediction.content}
          </CardTitle>
          <CardDescription
            className={clsx(
              "font-medium",
              prediction.status === "Correct"
                ? "text-green-500"
                : prediction.status === "Incorrect"
                  ? "text-red-500"
                  : "text-gray-500",
            )}
          >
            {prediction.status}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Progress value={prediction.possibility} />
          {prediction.possibility}%
        </CardContent>
        <CardFooter className="flex gap-2 text-gray-500">
          <Reactions />
        </CardFooter>
      </Card>
    </Link>
  );
}
