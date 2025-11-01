import { connectDB } from "@/lib/mongodb"; // ✔

import Application from "@/models/application";

export async function GET() {
  try {
    await connectDB();
    const applications = await Application.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(applications), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    const newApplication = await Application.create(data);
    return new Response(JSON.stringify(newApplication), { status: 201 });
  } catch (err) {
    console.error("POST /api/hireform error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
