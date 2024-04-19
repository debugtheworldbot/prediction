import { CardDemo, Prediction, PredictionStatus } from "@/components/CardDemo";
import { PredictDialog } from "@/components/PredictDialog";
import ServerAuth from "@/components/ServerAuth";
import { getPredictions } from "./actions";

export default async function Home() {
  const predictions = await getPredictions();
  console.log(predictions);
  return (
    <div className="px-4">
      <header className="flex justify-end items-center gap-4 py-4">
        <ServerAuth />
        <PredictDialog />
      </header>
      <main className="flex flex-col items-center gap-6">
        {predictions?.map((p, index) => (
          <CardDemo
            key={index}
            user={p.userInfo as Prediction["user"]}
            prediction={{
              id: p.id,
              content: p.content,
              possibility: p.possibility,
              status: p.status,
              evidence: p.evidence,
              risk: p.risk,
            }}
          />
        ))}
      </main>
    </div>
  );
}
