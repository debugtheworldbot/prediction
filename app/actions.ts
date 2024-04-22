"use server";

import { PredictionStatus } from "@/components/CardDemo";
import { Reaction } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  content: z.string({
    invalid_type_error: "Invalid prediction",
  }),
  possibility: z.number({
    invalid_type_error: "Invalid possibility",
  }),
  evidence: z.string({
    invalid_type_error: "Invalid evidence",
  }),
  risk: z.string({
    invalid_type_error: "Invalid risk",
  }),
});

export async function makeReaction(payload: {
  id: string;
  type: Reaction;
  isIncrement?: boolean;
}) {
  const supabase = createClient();
  const { type, isIncrement = true } = payload;
  const { data: reaction, error } = await supabase
    .from("reactions")
    .select("*")
    .eq("id", payload.id);
  const value = reaction?.[0];
  if (value) {
    const { data, error } = await supabase
      .from("reactions")
      .update({
        ...value,
        [type]: isIncrement
          ? (value[type] || 0) + 1
          : Math.max((value[type] || 0) - 1, 0),
      })
      .eq("id", payload.id);
  } else {
    const { data, error } = await supabase
      .from("reactions")
      .insert({ id: payload.id, [type]: 1 });
  }
  revalidatePath("/");
  return "ok";
}

export async function getPredictions() {
  const supabase = createClient();
  const { data: predictions, error } = await supabase
    .from("predictions")
    .select(
      `
    id,
    content,
    possibility,
    status,
    evidence,
    risk,
    userInfo,
    reactions ( up, down, fire, lol, thinking, watching )
`,
    )
    .order("created_at", { ascending: false });
  return predictions;
}

export async function createPrediction(formData: FormData) {
  const supabase = createClient();
  const validatedFields = schema.safeParse({
    content: formData.get("prediction"),
    possibility: parseInt((formData.get("possibility") as string) || "0"),
    evidence: formData.get("evidence"),
    risk: formData.get("risk"),
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { avatar_url, email, name } = user?.user_metadata || {};

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { error } = await supabase.from("predictions").insert({
    ...validatedFields.data,
    status: PredictionStatus.ToBeRevealed,
    userInfo: {
      avatar_url,
      email,
      name,
    },
  });

  if (error) {
    return {
      errors: error,
    };
  }

  revalidatePath("/");
  // ...
}
