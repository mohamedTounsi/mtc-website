import { connectDB } from "@/lib/mongodb";
import EventForm from "@/models/eventform";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Delete all documents from the EventForm model
    const result = await EventForm.deleteMany({});

    // Respond with success and the count of deleted documents
    return NextResponse.json(
      { message: "All event members deleted", deletedCount: result.deletedCount },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting event members:", error);
    return NextResponse.json(
      { error: "Failed to delete event members" },
      { status: 500 }
    );
  }
}
