import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import RecentEvent from "@/models/recentEvent";

// POST: Create a recent event
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json(); // receive JSON from client

    // Validate required fields for recent event
    const requiredFields = [
      "title",
      "category",
      "location",
      "description",
      "eventTime",
      "image",
      "attendees",
      "duration",
      "difficulty",
    ];
    for (const field of requiredFields) {
      if (!body[field]) throw new Error(`${field} is required`);
    }

    // Convert eventTime to Date
    const eventTime = new Date(body.eventTime);
    if (isNaN(eventTime.getTime())) throw new Error("Invalid eventTime");

    // Format date/time fields from eventTime
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

    // Save recent event
    const newEvent = await RecentEvent.create({
      title: body.title,
      category: body.category,
      location: body.location,
      description: body.description,
      image: body.image,
      eventTime,
      date,
      time,
      tags: Array.isArray(body.tags)
  ? body.tags.map((t) => t.trim())
  : typeof body.tags === "string"
    ? body.tags.split(",").map((t) => t.trim())
    : [],

      attendees: body.attendees,
      duration: body.duration,
      difficulty: body.difficulty,
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("Error uploading recent event:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET: Get all recent events, latest first
export async function GET() {
  try {
    await connectDB();
    const events = await RecentEvent.find().sort({ createdAt: -1 });
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching recent events:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
