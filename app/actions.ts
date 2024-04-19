"use server";

import { createClient } from "@/utils/supabase/server";
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

export async function createPrediction(formData: FormData) {
  const supabase = createClient();
  console.log(
    "pp",
    formData.get("prediction"),
    formData.get("possibility"),
    formData.get("evidence"),
    formData.get("risk"),
  );
  const validatedFields = schema.safeParse({
    content: formData.get("prediction"),
    possibility: parseInt((formData.get("possibility") as string) || "0"),
    evidence: formData.get("evidence"),
    risk: formData.get("risk"),
  });

  console.log("create", validatedFields);
  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { data, error } = await supabase.from("predictions").insert({
    ...validatedFields.data,
    status: "To be revealed",
  });
  console.log(error);

  if (error) {
    return {
      errors: error,
    };
  }

  // ...
}
