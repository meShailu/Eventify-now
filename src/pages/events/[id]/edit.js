import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import Form from "Components/Form";
import ImageUpload from "Components/ImageUpload";
import { useState } from "react";
import Header from "Components/Header";
import Footer from "Components/Footer";
import { Button } from "@nextui-org/react";

export default function EditEventPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: event, isLoading, error } = useSWR(`/api/events/${id}`);
  const [imageData, setImageData] = useState(null);

  async function editEvent(eventData) {
    if (imageData) {
      eventData.image = imageData;
    }

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
    <div className="app">
      <Header />
      <main>
        <section className="event">
          <Button className="m-3" color="secondary">
            <Link href={`/events/${id}`} passHref>
              Back to Event
            </Link>
          </Button>
          <h1 className="event-title">Do you want to edit your event?</h1>

          <ImageUpload setImageData={setImageData} />

          <Form onSubmit={editEvent} defaultData={event} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
