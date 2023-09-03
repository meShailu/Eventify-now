import mongoose from "mongoose";

const { Schema } = mongoose;

const eventSchema = new Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  start_at: { type: String, required: true },
  ends_at: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  hosted_by: { type: String, required: true },
  tags: { type: Array, required: true },
  mapURL: { type: String, required: true },
  description: { type: String, required: true },
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
