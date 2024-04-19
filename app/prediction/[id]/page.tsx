import Auth from "@/components/Auth";
export default async function Detail({ params }: { params: { id: string } }) {
  return (
    <div>
      <p>Post: {params.id}</p>
    </div>
  );
}
