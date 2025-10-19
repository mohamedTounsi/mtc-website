import { connectDB } from "@/lib/mongodb";
import EventForm from "@/models/eventform";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    await connectDB(); // Ensure connection is established

    const result = await EventForm.deleteMany({});
    return NextResponse.json(
      { message: "All event members deleted", deletedCount: result.deletedCount },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting event members:", error?.stack || error);
    return NextResponse.json(
      { error: "Failed to delete event members", details: error?.message },
      { status: 500 }
    );
  }
}
