import { CardDemo, Prediction } from "@/components/CardDemo";
import { PredictDialog } from "@/components/PredictDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const predictions: Prediction[] = [
  {
    user: {
      name: "username",
      avatar: "https://github.com/shadcn.png",
    },
    prediction: {
      content: "A WILL WIN",
      possibility: 55,
      evidence: "1111111111",
      risk: "risk",
      status: "Incorrect",
    },
  },
  {
    user: {
      name: "username",
      avatar: "https://github.com/shadcn.png",
    },
    prediction: {
      content: "A WILL WIN",
      possibility: 55,
      evidence: "1111111111",
      risk: "risk",
      status: "Correct",
    },
  },
  {
    user: {
      name: "username",
      avatar: "https://github.com/shadcn.png",
    },
    prediction: {
      content: "A WILL WIN",
      possibility: 55,
      evidence: "1111111111",
      risk: "risk",
      status: "To be revealed",
    },
  },
  {
    user: {
      name: "username",
      avatar: "https://github.com/shadcn.png",
    },
    prediction: {
      content: "A WILL WIN",
      possibility: 55,
      evidence: "1111111111",
      risk: "risk",
      status: "To be revealed",
    },
  },
];

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
        {predictions.map((p, index) => (
          <CardDemo key={index} user={p.user} prediction={p.prediction} />
        ))}
      </main>
    </div>
  );
}
