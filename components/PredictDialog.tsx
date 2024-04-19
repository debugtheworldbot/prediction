"use client";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Slider } from "./ui/slider";
import { toast } from "sonner";
import { createPrediction } from "@/app/actions";

export function PredictDialog() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>+ prediction</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Prediction</DialogTitle>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>+ prediction</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  const [canSave, setCanSave] = useState(false);
  const [possibility, setPossibility] = useState(33);
  return (
    <form
      action={async (formData: FormData) => {
        const result = await createPrediction(formData);
        console.log(result);
        toast("Prediction created");
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
          <span>{possibility}%</span>
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
      <DialogClose asChild>
        <Button disabled={!canSave} type="submit">
          Create
        </Button>
      </DialogClose>
    </form>
  );
}
