import { connectDB } from "@/lib/mongodb";
import Member from "@/models/Member";
import * as XLSX from "xlsx";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to the database
    await connectDB();

    // Fetch all members from the database
    const members = await Member.find({}).lean();

    // Prepare data for Excel format
    const data = members.map(member => ({
      "First Name": member.firstName,
      "Last Name": member.lastName,
      "Email": member.email,
      "Phone": member.phone || "",
      "Niveau": member.niveau,
      "Membership": member.membership,
      "Group Name": member.groupName || "",
      "Address": member.address || "",
      "Facebook": member.facebook || "",
      "Paid": member.paid ? "Yes" : "No"
    }));

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Members");

    // Generate Excel file buffer
    const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    // Set the appropriate headers for Excel file download
    const headers = {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": "attachment; filename=members.xlsx"
    };

    // Return the Excel data with the appropriate headers
    return new NextResponse(excelBuffer, { status: 200, headers });
  } catch (error) {
    console.error("Error exporting members:", error);
    return NextResponse.json(
      { error: "Failed to export members" },
      { status: 500 }
    );
  }
}