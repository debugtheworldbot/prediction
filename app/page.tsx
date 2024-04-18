import { CardDemo } from "@/components/CardDemo";
import { PredictDialog } from "@/components/PredictDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="px-4">
      <header className="flex justify-end items-center gap-4 py-4">
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <PredictDialog />
      </header>
      <main className="flex flex-col items-center gap-6">
        <CardDemo
          avatar="https://github.com/shadcn.png"
          name="username"
          prediction="A WILL WIN"
          possibility={55}
          status={"Incorrect"}
        />
        <CardDemo
          avatar="https://github.com/shadcn.png"
          name="username"
          prediction="B WILL WIN"
          possibility={85}
          status={"Correct"}
        />
        <CardDemo
          avatar="https://github.com/shadcn.png"
          name="username"
          prediction="B WILL WIN"
          possibility={85}
          status={"To be revealed"}
        />
      </main>
    </div>
  );
}
