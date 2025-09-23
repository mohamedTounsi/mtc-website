import { connectDB } from "@/lib/mongodb";
import Member from "@/models/Member";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const newMember = await Member.create(body);

    return new Response(JSON.stringify(newMember), {
      status: 201,
    });
  } catch (error) {
    console.error("Error saving member:", error);
    return new Response("Error saving member", { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const members = await Member.find({});
    return new Response(JSON.stringify(members), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error fetching members", { status: 500 });
  }
}
