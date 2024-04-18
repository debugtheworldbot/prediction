import { CardDemo } from "@/components/CardDemo";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="p-4">
      <Button className="block ml-auto">+ prediction</Button>
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
