import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import RecentEvent from "@/models/recentEvent";

// GET one event
export async function GET(req, { params }) {
  try {
    await connectDB();
    const event = await RecentEvent.findById(params.id);
    if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.error("Error fetching recent event:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT/PATCH for update
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();
    // Validate required fields if you want strictness
    // Use previous data for missing fields if you want PATCH support
    // Otherwise, only full replacement (PUT)

    // Defensive tags parsing
    const tags = Array.isArray(body.tags)
      ? body.tags.map((t) => t.trim())
      : typeof body.tags === "string"
        ? body.tags.split(",").map((t) => t.trim())
        : [];

    // Defensive date/time
    const eventTime = new Date(body.eventTime);
    if (isNaN(eventTime.getTime())) throw new Error("Invalid eventTime");
    const dateObj = new Date(body.eventTime);
    const date = dateObj.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "Africa/Tunis",
    });
    const time = dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Africa/Tunis",
    });

    const updateData = {
      ...body,
      eventTime,
      date,
      time,
      tags,
    };

    const updated = await RecentEvent.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    );
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Error updating recent event:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE for remove
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const deleted = await RecentEvent.findByIdAndDelete(params.id);
    if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting recent event:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
