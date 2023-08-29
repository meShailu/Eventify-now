import dbConnect from "../../../../db/connect";
import Event from "../../../../db/Models/Event";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const event = await Event.findById(id);
    console.log(event);
    if (!event) {
      return response.status(404).json({ status: "Not found" });
    }

    response.status(200).json(event);
  }
}
