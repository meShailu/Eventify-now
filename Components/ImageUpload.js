import React, { useState } from "react";
import { Button } from "@nextui-org/react";

function ImageUpload({ setImageData }) {
  const [image, setImage] = useState(null);

  function covertToBase64(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const imageData = reader.result; // Get the base64 image data
      setImage(imageData);
      setImageData(imageData); // Lift the state up to the parent component
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="flex gap-4 items-center">
      <input
        className="event-image-upload"
        accept="image/*"
        type="file"
        onChange={covertToBase64}
      />
      {image && (
        <img className="img-preview" src={image} alt="Selected Image" />
      )}
    </div>
  );
}

export default ImageUpload;
