import Auth from "@/components/Auth";
import { CardDemo, Prediction } from "@/components/CardDemo";
import { PredictDialog } from "@/components/PredictDialog";
import ServerAuth from "@/components/ServerAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const predictions: Prediction[] = [
  {
    user: {
      id: "1",
      name: "username",
      avatar: "https://github.com/shadcn.png",
    },
    prediction: {
      id: "1aaa",
      content:
        "A WILL WIN p content: A WILL WINA WILL WIN p content: A WILL WINA WILL WIN p content: A WILL WINA WILL WIN p content: A WILL WINA WILL WIN p content: A WILL WIN",
      possibility: 85,
      evidence: "1111111111",
      risk: "risk",
      status: "Incorrect",
    },
  },
  {
    user: {
      id: "1",
      name: "username",
      avatar: "https://github.com/shadcn.png",
    },
    prediction: {
      id: "1",
      content: "A WILL WIN",
      possibility: 25,
      evidence: "1111111111",
      risk: "risk",
      status: "Correct",
    },
  },
  {
    user: {
      id: "1",
      name: "username",
      avatar: "https://github.com/shadcn.png",
    },
    prediction: {
      id: "1",
      content: "A WILL WIN",
      possibility: 55,
      evidence: "1111111111",
      risk: "risk",
      status: "To be revealed",
    },
  },
  {
    user: {
      id: "1",
      name: "username",
      avatar: "https://github.com/shadcn.png",
    },
    prediction: {
      id: "1",
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
        <ServerAuth />
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
