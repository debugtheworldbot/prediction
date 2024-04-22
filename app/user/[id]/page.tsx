export default async function UserHome({ params }: { params: { id: string } }) {
  return (
    <div>
      <p>user: {params.id}</p>
    </div>
  );
}
