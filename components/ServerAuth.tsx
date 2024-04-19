import { createClient } from "@/utils/supabase/server";
import { Button } from "./ui/button";

async function signInWithGithub() {
  "use server";
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });
}

export default async function ServerAuth() {
  return (
    <form action={signInWithGithub}>
      <Button formAction={signInWithGithub} type="submit">
        server google Auth
      </Button>
      ;
    </form>
  );
}
