import dbConnect from "../../../../db/connect";
import Event from "../../../../db/Models/Event";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const event = await Event.findById(id);
    if (!event) {
      return response.status(404).json({ status: "Not found" });
    }
    response.status(200).json(event);
  } else if (request.method === "PATCH") {
    try {
      const updatedEventData = request.body;
      console.log(updatedEventData);
      const updatedEvent = await Event.findByIdAndUpdate(id, updatedEventData, {
        new: true,
      });
      if (!updatedEvent) {
        return response.status(404).json({ status: "Event not found" });
      }
      response.status(200).json(updatedEvent);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  } else if (request.method === "DELETE") {
    const eventToDelete = await Event.findByIdAndDelete(id);
    if (!eventToDelete) {
      return response.status(404).json({ status: "Event not found" });
    }
    response.status(200).json(eventToDelete);
  }
}
