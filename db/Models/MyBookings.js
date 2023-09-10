import mongoose from "mongoose";

const { Schema } = mongoose;

const myBookingsSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user who booked the event
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  bookingstatus: { type: String, required: true },
  paymentInfo: { type: String, required: true },
  notes: { type: String, required: true },
});

const MyBookings =
  mongoose.models.MyBookings || mongoose.model("MyBookings", myBookingsSchema);

export default MyBookings;
