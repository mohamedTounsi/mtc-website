import mongoose from "mongoose";

const FeaturedEventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["workshop", "bootcamp", "hackathon", "talk", "other"],
      default: "workshop",
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    image: {
      type: String, // Cloudinary URL
      required: true,
    },
    eventTime: {
      type: Date, // for countdown timer
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "featured_events" }
);

export default mongoose.models.FeaturedEvent ||
  mongoose.model("FeaturedEvent", FeaturedEventSchema);
