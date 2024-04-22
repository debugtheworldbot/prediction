"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Slider } from "./ui/slider";
import { toast } from "sonner";
import { createPrediction } from "@/app/actions";

export function PredictDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ prediction</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Prediction</DialogTitle>
        </DialogHeader>
        <ProfileForm closeDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

function ProfileForm({
  className,
  closeDialog,
}: React.ComponentProps<"form"> & { closeDialog: () => void }) {
  const [canSave, setCanSave] = useState(false);
  const [pending, setPending] = useState(false);
  const [possibility, setPossibility] = useState(33);
  return (
    <form
      action={async (formData: FormData) => {
        await createPrediction(formData);
        closeDialog();
        toast("Prediction created");
      }}
      onSubmit={() => {
        setPending(true);
      }}
      className={cn("grid items-start gap-4 mt-2", className)}
    >
      <div className="grid gap-2">
        <Label htmlFor="prediction">Prediction *</Label>
        <Input
          name="prediction"
          onChange={(e) => {
            setCanSave(e.target.value.length > 0);
          }}
          required
          placeholder="What's your prediction?"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="possibility">Possibility</Label>
        <div className="flex gap-4">
          <Slider
            name="possibility"
            defaultValue={[possibility]}
            onValueChange={(v) => {
              setPossibility(v[0]);
            }}
            max={100}
            step={1}
          />
          <span className="font-momo w-10">{possibility}%</span>
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="evidence">Evidence</Label>
        <Input name="evidence" placeholder="What support your prediction?" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="risk">Risk</Label>
        <Input name="risk" placeholder="What against your prediction?" />
      </div>
      <Button disabled={!canSave || pending} type="submit">
        {pending ? "Loading..." : "Create"}
      </Button>
    </form>
  );
}
