import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    niveau: { type: String, required: true },
    membership: { type: String, required: true },
    groupName: String,
    address: String,
    facebook: String,
    payNow: { type: String, enum: ["Yes", "No"], required: true },
    paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Member ||
  mongoose.model("Member", MemberSchema);
