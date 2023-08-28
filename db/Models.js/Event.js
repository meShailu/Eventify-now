import mongoose from "mongoose";

const { Schema } = mongoose;

const eventSchema = new Schema({
  Title: { type: String, required: true },
  Date: { type: Number, required: true },
  Time: { type: Number, required: true },
  Location: { type: String, required: true },
  mapURL: { type: String, required: true },
  Description: { type: String, required: true },
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
