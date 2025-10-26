import nodemailer from "nodemailer";

export function createTransporter() {
  if (!process.env.SMTP_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Missing SMTP configuration variables!");
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true", // true for 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== "false",
    },
  });

  return transporter;
}

export async function verifySMTP(transporter: any) {
  try {
    await transporter.verify();
    console.log("✅ SMTP Verified");
  } catch (error) {
    console.error("SMTP Verification Failed ❌", error);
    throw error;
  }
}
