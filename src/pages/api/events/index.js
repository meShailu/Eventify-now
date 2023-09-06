import App from "src/pages/_app";
import dbConnect from "../../../../db/connect";
import Event from "../../../../db/Models/Event.js";
import { images } from "next.config";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const events = await Event.find();
    return response.status(200).json(events);
  } else if (request.method === "POST") {
    try {
      const eventData = request.body;

      console.log(eventData);
      const event = new Event(eventData);
      console.log(event);

      await event.save();
      response.status(201).json({ status: "Event created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  } else {
    response.status(405).json({ message: "Method not allowed" });
  }
}
