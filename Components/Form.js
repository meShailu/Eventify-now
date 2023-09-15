import ImageUpload from "./ImageUpload";
import React from "react";
import { useState } from "react";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

export default function Form({ onSubmit, defaultData }) {
  const [tags, setTags] = useState(defaultData?.tags || "");

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const tagsValue = tags;
    const tagsArray = tagsValue.split(",").map((tag) => tag.trim());

    // Replace the "tags" field in formData with the array
    // formData.set("tags", tagsArray);

    const data = Object.fromEntries(formData);
    data.tags = tagsArray;
    console.log(data);

    onSubmit(data, defaultData); // Pass defaultData as a parameter
  }
  const placements = ["inside", "outside", "outside-left"];

  return (
    <form className="event-add" onSubmit={handleSubmit}>
      <div>
        <Input
          key="outside-left"
          type="text"
          label="Type"
          name="type"
          labelPlacement="outside-left"
          placeholder="Enter the type of event"
          description="Example: Music,Tech"
          defaultValue={defaultData?.type}
          size="lg"
          required
        />
      </div>

      <div>
        <Input
          key="outside-left"
          type="text"
          label="Title"
          name="title"
          labelPlacement="outside-left"
          placeholder="Enter the title of the event"
          description="Short title of the event"
          defaultValue={defaultData?.title}
          size="lg"
        />
      </div>
      <div>
        <Input
          key="outside-left"
          type="datetime-local"
          label="Start_at"
          name="start_at"
          labelPlacement="outside-left"
          placeholder="Enter the Starting date of the event"
          description=""
          defaultValue={defaultData?.start_at}
          size="lg"
        />
      </div>

      <div>
        <Input
          type="datetime-local"
          defaultValue={defaultData?.ends_at}
          key="outside-left"
          label="End Date and Time"
          name="ends_at"
          labelPlacement="outside-left"
          placeholder="Enter the Ending date of the event"
          size="lg"
        />
      </div>
      <div>
        <Input
          key="outside-left"
          type="text"
          label="Address"
          name="address"
          labelPlacement="outside-left"
          placeholder=""
          defaultValue={defaultData?.address}
          size="lg"
        />
      </div>
      <div>
        <Input
          key="outside-left"
          type="text"
          label="City"
          name="city"
          labelPlacement="outside-left"
          defaultValue={defaultData?.city}
          size="lg"
        />
      </div>
      <div>
        <Input
          key="outside-left"
          type="text"
          label="Country"
          name="country"
          labelPlacement="outside-left"
          defaultValue={defaultData?.country}
          size="lg"
        />
      </div>
      <div>
        <Input
          key="outside-left"
          label="Tags"
          type="text"
          name="tags"
          labelPlacement="outside-left"
          defaultValue={defaultData?.tags}
          size="lg"
          onChange={(e) => setTags(e.target.value)} // Update the "tags" state when the input changes
        />
      </div>
      <div>
        <Input
          key="outside-left"
          type="text"
          label="Hosted By"
          name="hosted_by"
          labelPlacement="outside-left"
          defaultValue={defaultData?.hosted_by}
          size="lg"
        />
      </div>
      <div>
        <Input
          key="outside-left"
          type="text"
          label="Map URL"
          labelPlacement="outside-left"
          name="mapURL"
          defaultValue={defaultData?.mapurl}
          size="lg"
        />
      </div>
      <div>
        <Textarea
          key="outside-left"
          type="text"
          label="Description"
          name="description"
          labelPlacement="outside-left"
          defaultValue={defaultData?.description}
          size="lg"
        />
      </div>
      <div className="btn-container">
        <Button type="submit" color="primary">
          {defaultData ? "Update Event" : "Add Event"}
        </Button>
      </div>
    </form>
  );
}
