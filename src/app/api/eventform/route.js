import { connectDB } from "@/lib/mongodb";
import Eventform from "@/models/eventform";


export async function GET(req) {
  try {
    await connectDB();
    const forms = await Eventform.find({});
    return new Response(JSON.stringify(forms), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(req) {
    try {
      await connectDB();
      const data = await req.json();
      const newForm = await Eventform.create(data); // <-- match import name
      return new Response(JSON.stringify(newForm), { status: 201 });
    } catch (err) {
      console.error("POST /api/eventform error:", err);
      return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
  }
  
