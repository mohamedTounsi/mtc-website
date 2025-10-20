import { connectDB } from "@/lib/mongodb";
import EventForm from "@/models/eventform";

export async function PATCH(req, { params }) {
  const { id } = await params;
  try {
    await connectDB();
    const body = await req.json();
    const updatedEventForm = await EventForm.findByIdAndUpdate(id, body, { new: true });
    return new Response(JSON.stringify(updatedEventForm), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to update EventForm", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await connectDB();
    await EventForm.findByIdAndDelete(id);
    return new Response("Deleted successfully", { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to delete member", { status: 500 });
  }
}
