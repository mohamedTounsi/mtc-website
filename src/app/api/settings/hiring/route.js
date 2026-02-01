import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Setting from "@/models/setting";

export async function GET() {
  try {
    await connectDB();
    const setting = await Setting.findOne({ key: "isHiringOpen" });
    // Default to false if not set
    const isOpen = setting ? setting.value : false;
    return NextResponse.json({ isOpen }, { status: 200 });
  } catch (error) {
    console.error("Error fetching hiring status:", error);
    return NextResponse.json({ error: "Failed to fetch status" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const { isOpen } = await req.json();

    const setting = await Setting.findOneAndUpdate(
      { key: "isHiringOpen" },
      { value: isOpen },
      { upsert: true, new: true }
    );

    return NextResponse.json({ isOpen: setting.value }, { status: 200 });
  } catch (error) {
    console.error("Error updating hiring status:", error);
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}
