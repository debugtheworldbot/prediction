import { createClient } from "@/utils/supabase/server";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { headers } from "next/headers";

async function signIn() {
  "use server";
  const supabase = createClient();
  const headersList = headers();
  const domain = headersList.get("origin") || "http://localhost:3000";
  const { data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${domain}/api/auth/callback`,
    },
  });

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
}

async function signOut() {
  "use server";
  const supabase = createClient();
  await supabase.auth.signOut();
}

export default async function ServerAuth() {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  if (user) {
    return (
      <Popover>
        <PopoverTrigger>
          <Avatar>
            <AvatarImage src={user.user_metadata.avatar_url} />
          </Avatar>
        </PopoverTrigger>
        <PopoverContent>
          <form action={signOut}>
            <Button type="submit">sign out</Button>
          </form>
        </PopoverContent>
      </Popover>
    );
  }
  return (
    <div>
      <form action={signIn}>
        <Button type="submit">server google Auth</Button>
      </form>
    </div>
  );
}
