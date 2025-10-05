import mongoose from "mongoose";

const EventFormSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
}, { timestamps: true });

// Prevent recompilation in dev
export default mongoose.models.EventForm || mongoose.model("EventForm", EventFormSchema);
