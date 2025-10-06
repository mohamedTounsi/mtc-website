import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import Member from "@/models/Member"; // Adjust the path if needed

if (mongoose.connection.readyState !== 1) {
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export async function POST(req) {
  // Dashboard-auth check
  const auth = req.headers.get("x-dashboard-auth");
  if (auth !== process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { to, groupName, subject, message } = await req.json();

    if (!subject || !message) {
      return NextResponse.json({ error: "Subject and message are required" }, { status: 400 });
    }

    // Members filter
    let filter = {};
    if (to === "paid") filter.paid = true;
    else if (to === "unpaid") filter.paid = false;
    else if (to === "new") filter.membership = "New members";
    else if (to === "renewing") filter.membership = "Renewing members";
    else if (to === "group") {
      if (!groupName) return NextResponse.json({ error: "Missing group name" }, { status: 400 });
      filter.groupName = groupName;
    }
    const members = await Member.find(filter, "email");
    const emails = members.map(m => m.email).filter(Boolean);

    if (!emails.length) {
      return NextResponse.json({ error: "No recipients found." }, { status: 404 });
    }

    // Setup your SMTP transport (update as needed for your service)
    // For Gmail: use "smtp.gmail.com" and create an app password if 2FA
    // For Outlook: "smtp.office365.com"
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587 or 25
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Build HTML email (styled basic template)
    const emailHTML = `
      <div style="font-family:sans-serif;padding:24px;background:#f9f7fa;">
        <h2 style="color:#6d28d9;">${subject}</h2>
        <div style="font-size:1.1em;color:#333;line-height:1.6;">${message.replace(/\n/g, "<br/>")}</div>
        <hr style="margin:32px 0;border:none;border-top:1px solid #e5e7eb"/>
        <div style="color:#6d28d9;font-size:0.93em;">Microsoft Tech Club</div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,     // "Your Club <noreply@yourclub.com>"
      bcc: emails,                      // Privacy for mass mail, or use "to" if needed
      subject,
      text: message,                    // Plain text fallback
      html: emailHTML,                  // Styled HTML!
    });

    return NextResponse.json({ message: "Emails sent successfully!" });
  } catch (err) {
    console.error("Email sending error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
