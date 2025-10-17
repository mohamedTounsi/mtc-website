import { connectDB } from "@/lib/mongodb";
import EventForm from "@/models/eventform";
import * as XLSX from "xlsx";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Fetch all event member documents
    const members = await EventForm.find({}).lean();

    // Prepare data for Excel
    const data = members.map(member => ({
      "First Name": member.firstName,
      "Last Name": member.lastName,
      "Email": member.email,
      "Phone": member.phone
    }));

    // Create workbook and sheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "EventMembers");

    // Write Excel file as buffer
    const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    // Headers for download
    const headers = {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": "attachment; filename=event-members.xlsx"
    };

    // Serve the Excel file
    return new NextResponse(excelBuffer, { status: 200, headers });
  } catch (error) {
    console.error("Error exporting event members:", error);
    return NextResponse.json(
      { error: "Failed to export event members" },
      { status: 500 }
    );
  }
}
