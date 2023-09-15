import React, { useState } from "react";
import ImageUpload from "Components/ImageUpload";
import Form from "Components/Form";
// import DisplayImage from "Components/DisplayImage";
import { useRouter } from "next/router";
import Header from "Components/Header";
import Footer from "Components/Footer";

export default function CreateEvent() {
  const router = useRouter();
  const [imageData, setImageData] = useState("");

  async function addEvent(event) {
    event.image = imageData;

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Failed to add event");
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  }

  return (
    <div className="app">
      <Header />
      <main>
        <section className="event">
          <h1 className="event-title">Add Your Event Here...</h1>

          <ImageUpload setImageData={setImageData} />
          <Form onSubmit={addEvent} formName={"add-event"} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
