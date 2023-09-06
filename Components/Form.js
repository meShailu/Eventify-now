import ImageUpload from "./ImageUpload";
import React, { useState } from "react";

export default function Form({ onSubmit, defaultData }) {
  const [imageData, setImageData] = useState(null);
  function handleImageUpload(imageData) {
    setImageData(imageData);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("image", imageData); // Append the image data to the form data

    const data = Object.fromEntries(formData);
    onSubmit(data);

    data.image = imageData;
  }

  return (
    <form className="event-add" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="type">Type</label>
        <input
          id="type"
          name="type"
          type="text"
          defaultValue={defaultData?.type}
        />
      </div>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={defaultData?.title}
        />
      </div>
      <div>
        <label htmlFor="start_at">Start Date and Time</label>
        <input
          id="start_at"
          name="start_at"
          type="date"
          defaultValue={defaultData?.start_at}
        />
      </div>

      <div>
        <label htmlFor="ends_at">End Date and Time</label>
        <input
          id="ends_at"
          name="ends_at"
          type="date"
          defaultValue={defaultData?.ends_at}
        />
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <input
          id="address"
          name="address"
          type="text"
          defaultValue={defaultData?.address}
        />
      </div>
      <div>
        <label htmlFor="city">City</label>
        <input
          id="city"
          name="city"
          type="text"
          defaultValue={defaultData?.city}
        />
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          name="country"
          type="text"
          defaultValue={defaultData?.country}
        />
      </div>
      <div>
        <label htmlFor="tags">Tags</label>
        <input
          id="tags"
          name="tags"
          type="text"
          defaultValue={defaultData?.tags}
        />
      </div>
      <div>
        <label htmlFor="hosted_by">Hosted By</label>
        <input
          id="hosted_by"
          name="hosted_by"
          type="text"
          defaultValue={defaultData?.hosted_by}
        />
      </div>
      <div>
        <label htmlFor="mapURL">Map URL</label>
        <input
          id="mapURL"
          name="mapURL"
          type="text"
          defaultValue={defaultData?.mapURL}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          defaultValue={defaultData?.description}
        ></textarea>
      </div>
      <div className="btn-container">
        <button className="btn" type="submit">
          {defaultData ? "Update Event" : "Add Event"}
        </button>
      </div>
    </form>
  );
}
