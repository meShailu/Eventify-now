import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import Form from "Components/Form";

export default function EditEventPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  console.log(id);
  const { data: event, isLoading, error } = useSWR(`/api/events/${id}`);

  async function editEvent(eventData) {
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: "PATCH",
        body: JSON.stringify(eventData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.push(`/events/${id}`);
      } else {
        console.error("Error updating event:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating event:", error.message);
    }
  }

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <>
      <h1>Edit Page</h1>
      <Link href={`/events/${id}`} passHref>
        Back to Event
      </Link>
      <Form onSubmit={editEvent} defaultData={event} />
    </>
  );
}
