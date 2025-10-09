import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import FeaturedEvent from "@/models/FeaturedEvent";

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = params;

    const deleted = await FeaturedEvent.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
