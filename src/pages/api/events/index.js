import dbConnect from "../../../../db/connect";
import Event from "../../../../db/Models/Event.js";

export default async function handler(request, response) {
  await dbConnect();
  // console.log("TRYING TO GET");

  if (request.method === "GET") {
    const events = await Event.find();
    // console.log(events);
    return response.status(200).json(events);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
