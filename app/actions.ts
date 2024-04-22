"use server";

import { PredictionStatus } from "@/components/PredictionCard";
import { updateCounts } from "@/lib/utils";
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

export async function makeReaction(
  id: string,
  payload: {
    up?: boolean;
    down?: boolean;
    fire?: boolean;
    lol?: boolean;
    thinking?: boolean;
    watching?: boolean;
  },
) {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  if (!user.data?.user) {
    console.error("User not found");
    return;
  }
  const { data: existingRow } = await supabase
    .from("user_reactions")
    .select("id")
    .eq("reaction_id", id)
    .eq("user_id", user.data.user.id);
  if (existingRow && existingRow.length > 0) {
    const { error } = await supabase
      .from("user_reactions")
      .update({ ...payload })
      .match({ id: existingRow[0].id });
    if (error) {
      console.log(error);
    }
  } else {
    const { error } = await supabase.from("user_reactions").insert([
      {
        ...payload,
        reaction_id: id,
        user_id: user.data.user.id,
      },
    ]);
    if (error) {
      console.log(error);
    }
  }

  const { data: result } = await supabase
    .from("user_reactions")
    .select("*")
    .eq("reaction_id", id);

  const counts = updateCounts(result);
  await supabase.from("reactions").update(counts).eq("id", id);

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
    reactions ( up, down, fire, lol, thinking, watching ),
    user_reactions ( user_id, up, down, fire, lol, thinking, watching )
`,
    )
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
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
