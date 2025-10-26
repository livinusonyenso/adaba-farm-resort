import { NextRequest, NextResponse } from "next/server";
import { createTransporter, verifySMTP } from "@/lib/email";
import { companyEmailTemplate, clientEmailTemplate } from "@/lib/emailTemplates";

export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;
    const gender = formData.get("gender") as string;
    const message = formData.get("message") as string;
    const receiptFile = formData.get("receiptFile") as File | null;

    // Validate required fields
    if (!name || !email || !phone || !address || !gender) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Optional: validate email format
    if (!email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Validate file size limit (2MB recommended)
    if (receiptFile && receiptFile.size > 2_000_000) {
      return NextResponse.json(
        { error: "Receipt file too large (max 2MB)" },
        { status: 400 }
      );
    }

    const transporter = createTransporter();
    await verifySMTP(transporter);

    // Format email data passed to templates
    const emailData = {
      name,
      email,
      phone,
      address,
      gender,
      message,
      receiptFile: receiptFile ? receiptFile.name : null,
      receiptFileName: receiptFile ? receiptFile.name.replace(/[^\w\s.-]/g, '').replace(/\s+/g, '_').toLowerCase() : null,
    };
// Convert file to attachment (if exists)
const attachments = [];
if (receiptFile && typeof receiptFile !== "string") {
  const buffer = Buffer.from(await receiptFile.arrayBuffer());

  const cleanName = receiptFile.name
    .replace(/[^\w\s.-]/g, "")
    .replace(/\s+/g, "_")
    .toLowerCase();

  attachments.push({
    filename: cleanName,
    content: buffer,
    contentType: receiptFile.type || "application/octet-stream",
    disposition: "attachment",
  });

  console.log("📎 Attachment ready:", {
    originalName: receiptFile.name,
    cleanName,
    size: buffer.length,
    type: receiptFile.type,
  });
}


    // Send to company
    try {
      console.log("📧 Sending company email with attachments:", attachments.length > 0 ? `${attachments.length} file(s)` : "no files");
      
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.COMPANY_EMAIL || process.env.EMAIL_USER,
        subject: `New Investment Submission from ${name}`,
        html: companyEmailTemplate(emailData),
        attachments,
      });
      console.log("✅ Company email sent successfully with attachments");
    } catch (error) {
      console.error("❌ Failed to send company email:", error);
      throw error;
    }

    // ⚠️ Required for Mailtrap rate limiting - increased delay
    console.log("⏳ Waiting 5 seconds for rate limiting...");
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Send to client with retry mechanism
    let clientEmailSent = false;
    let retryCount = 0;
    const maxRetries = 2;

    while (!clientEmailSent && retryCount < maxRetries) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Investment Submission Confirmation - Adaba Farm Estate",
          html: clientEmailTemplate(emailData),
        });
        console.log("✅ Client email sent successfully");
        clientEmailSent = true;
      } catch (error) {
        retryCount++;
        console.error(`❌ Failed to send client email (attempt ${retryCount}):`, error);
        
        if (retryCount < maxRetries) {
          console.log(`⏳ Retrying in 3 seconds... (${retryCount}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, 3000));
        } else {
          console.log("⚠️ Company email was sent, but client email failed after retries");
        }
      }
    }

    return NextResponse.json(
      { message: "Emails sent successfully!" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error sending emails:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
