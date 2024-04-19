"use server";

import { PredictionStatus } from "@/components/CardDemo";
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

export async function getPredictions() {
  const supabase = createClient();
  const { data: predictions, error } = await supabase
    .from("predictions")
    .select("*");
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

  const {
    user_metadata: { avatar_url, email, name },
  } = user!;

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
  revalidatePath("/");

  if (error) {
    return {
      errors: error,
    };
  }

  // ...
}
