import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import clsx from "clsx";

type CardProps = React.ComponentProps<typeof Card> & {
  avatar: string;
  name: string;
  prediction: string;
  status: "Correct" | "Incorrect" | "To be revealed";
  possibility: number;
};

export function CardDemo({
  className,
  avatar,
  name,
  prediction,
  status,
  possibility,
  ...props
}: CardProps) {
  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <CardTitle className="flex items-center gap-4 sm:min-w-[380px] min-w-[70vw]">
          <Avatar>
            <AvatarImage src={avatar} />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
          {prediction}
        </CardTitle>
        <CardDescription
          className={clsx(
            status === "Correct"
              ? "text-green-500"
              : status === "Incorrect"
                ? "text-red-500"
                : "text-gray-500",
          )}
        >
          {status}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <Progress value={possibility} />
        {possibility}%
      </CardContent>
      <CardFooter className="flex gap-2 text-gray-500">
        <Button variant="outline">🔥 10</Button>
        <Button variant="outline">🤣</Button>
        <Button variant="outline">👍</Button>
        <Button variant="outline">🤔</Button>
      </CardFooter>
    </Card>
  );
}
