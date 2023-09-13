import dbConnect from "db/connect.js";
import Image from "next/image.js"; // Import the 'Image' model/schema

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { image } = req.body;

      // Assuming you have an 'Image' model/schema defined similarly to your 'Event' model
      const imageDoc = new Image({ image }); // Create a new instance of the 'Image' model
      await imageDoc.save(); // Save the image to the database

      res.status(201).json({ status: "Image uploaded" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
