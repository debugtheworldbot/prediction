import { auth, signIn } from "@/auth";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  );
}
export default async function Detail({ params }: { params: { id: string } }) {
  const session = await auth();
  return (
    <div>
      <p>Post: {params.id}</p>
      <SignIn />
    </div>
  );
}
