// import React, { useState } from "react";
// import ImageUpload from "Components/ImageUpload";
// import Form from "Components/Form";
// import { useRouter } from "next/router";

// export default function CreateEvent() {
//   const router = useRouter();
//   const [imageData, setImageData] = useState(""); // State to store image data

//   async function addEvent(event) {
//     event.image = imageData; // Add the image data to the event object

//     try {
//       const response = await fetch("/api/events", {
//         method: "POST",
//         body: JSON.stringify(event),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         router.push("/");
//       } else {
//         console.error("Failed to add event");
//       }
//     } catch (error) {
//       console.error("Error adding event:", error);
//     }
//   }

//   return (
//     <>
//       <h2 id="add-event">Add Event</h2>

//       <ImageUpload setImageData={setImageData} />
//       <Form onSubmit={addEvent} formName={"add-event"} />
//     </>
//   );
// }

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
        <h1 className="event-add-title" id="add-event">
          Add Event
        </h1>
        <ImageUpload setImageData={setImageData} />
        <Form onSubmit={addEvent} formName={"add-event"} />
        {/* Display the image */}
        {/* <DisplayImage /> */}
      </main>
      <Footer />
    </div>
  );
}
