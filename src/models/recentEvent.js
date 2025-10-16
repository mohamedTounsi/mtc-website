import mongoose from "mongoose";

const RecentEventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["workshop", "bootcamp", "hackathon", "talk", "other"],
      default: "workshop",
      required: true,
    },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },
    tags: [{ type: String }],
    description: { type: String, required: true },
    attendees: { type: Number, required: true },
    duration: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    eventTime: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "recent_events" }
);

export default mongoose.models.RecentEvent ||
  mongoose.model("RecentEvent", RecentEventSchema);
