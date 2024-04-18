export default function Detail({ params }: { params: { id: string } }) {
  return <p>Post: {params.id}</p>;
}
