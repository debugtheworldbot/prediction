"use client";

import { useEffect } from "react";
import { Button } from "./ui/button";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
async function signInWithGithub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });
}

export default function Auth() {
  useEffect(() => {
    supabase.auth.getUser().then((data) => {
      console.log(data);
    });
  });
  return <Button onClick={signInWithGithub}>github Auth</Button>;
}
