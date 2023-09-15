// pages/api/unbook/[eventId].js

import { getSession } from "next-auth/react";
import dbConnect from "db/connect"; // Your MongoDB connection module
import MyBookings from "db/Models/MyBookings"; // Your Mongoose Booking model

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = session.user.id;
  const eventId = req.query.eventId;

  if (req.method === "DELETE") {
    try {
      // Check if the user has booked this event
      const booking = await MyBookings.findOneAndDelete({
        userId: userId,
        eventId: eventId,
      });

      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }

      return res.status(204).end(); // Successful deletion, no content
    } catch (error) {
      console.error("An error occurred:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
