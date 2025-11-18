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
        "Other",
      ],
      required: true,
    },
    message: { type: String },
    facebook: { type: String, required: true },
  },
  { timestamps: true }
);

if (mongoose.models.Application) {
  delete mongoose.models.Application;
}
export default mongoose.model("Application", ApplicationSchema);
