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
    provider: "google",
  });
}

export default function Auth() {
  useEffect(() => {
    supabase.auth.getSession().then((data) => {
      console.log(data);
    });
    supabase.auth.getUserIdentities().then((data) => {
      console.log("iiiiiii", data);
    });
    supabase.auth.getUser().then((data) => {
      console.log("user", data);
    });
  }, []);
  return (
    <div>
      <Button onClick={signInWithGithub}>google Auth</Button>;
    </div>
  );
}