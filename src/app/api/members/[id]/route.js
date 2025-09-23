import { connectDB } from "@/lib/mongodb";
import Member from "@/models/Member";

export async function PATCH(req, { params }) {
  const { id } = params;
  try {
    await connectDB();
    const body = await req.json();
    const updatedMember = await Member.findByIdAndUpdate(id, body, { new: true });
    return new Response(JSON.stringify(updatedMember), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to update member", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await connectDB();
    await Member.findByIdAndDelete(id);
    return new Response("Deleted successfully", { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to delete member", { status: 500 });
  }
}
