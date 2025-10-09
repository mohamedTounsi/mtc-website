import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import FeaturedEvent from "@/models/FeaturedEvent";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json(); // receive JSON from client

    // Validate required fields
    const requiredFields = [
      "title",
      "category",
      "location",
      "description",
      "eventTime",
      "image",
    ];
    for (const field of requiredFields) {
      if (!body[field]) throw new Error(`${field} is required`);
    }

    // Convert eventTime to Date
    const eventTime = new Date(body.eventTime);
    if (isNaN(eventTime.getTime())) throw new Error("Invalid eventTime");

    // Save event
    const newEvent = await FeaturedEvent.create({
      title: body.title,
      category: body.category,
      location: body.location,
      description: body.description,
      image: body.image,
      eventTime,
      tags: body.tags ? body.tags.split(",").map((t) => t.trim()) : [],
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("Error uploading event:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    // Get latest featured event
    const event = await FeaturedEvent.findOne().sort({ createdAt: -1 });
    return NextResponse.json(event);
  } catch (error) {
    console.error("Error fetching featured event:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
