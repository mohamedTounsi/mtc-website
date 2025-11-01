import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    position: {
      type: String,
      enum: [
        "HR Manager",
        "Logistics and Planning Assistant",
        "Developer",
        "Videomaker",
        "Graphic Designer",
        "Sponsoring Manager",
      ],
      required: true,
    },
    message: { type: String }, // optional now
  },
  { timestamps: true }
);

export default mongoose.models.Application ||
  mongoose.model("Application", ApplicationSchema);
