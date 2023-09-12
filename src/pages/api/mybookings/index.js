import dbConnect from "db/connect";
import MyBookings from "db/Models/MyBookings";

export default async function handler(req, res) {
  const userId = req.query.userId;
  console.log("userId!!!!!", req.query);
  await dbConnect();

  try {
    if (req.method === "GET") {
      const foundBookings = await MyBookings.find({ userId: userId });
      res.status(200).json(foundBookings);
    }
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
