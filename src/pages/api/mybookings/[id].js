import dbConnect from "db/connect";
import MyBookings from "db/Models/MyBookings";

export default async function handler(req, res) {
  await dbConnect();

  try {
    if (req.method === "POST") {
      const { userId, eventId } = req.body;
      const booking = {
        userId: userId,
        eventId: eventId,
        bookingStatus: "confirmed",
        paymentInfo: "",
        notes: "Special requests or additional notes from the user",
      };
      console.log("booking", booking);
      const bookings = await MyBookings.create(booking);

      //    const bookings = await MyBookings.find({ userId }).exec();
      res.status(200).json("Event saved");
    }
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
