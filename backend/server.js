// ---------------- Core dependencies ----------------
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// ---------------- Security & Middleware ----------------
app.use(helmet());
app.use(
  cors({
    origin: [
      "https://kazfieldisl.com",
      "https://kazfieldisl.com/adabafarmresort",
      "https://adaba-farm-resort.onrender.com",
      "http://localhost:3000",
      "http://localhost:3001",
      process.env.FRONTEND_URL,
    ].filter(Boolean),
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ---------------- Multer (upload) config ----------------
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed!"), false);
  },
});

// ---------------- Helper: environment guards ----------------
function assertEnv(name) {
  if (!process.env[name]) throw new Error(`Missing environment variable: ${name}`);
}

// ---------------- ✉️ Email HTML Templates (as requested) ----------------
function companyEmailTemplate({ name, email, phone, address, gender, message, receiptFile, referralSource, sourceName, sourceContact, sourceEmail }) {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 620px; margin:0 auto; background:#ffffff; border-radius:10px; overflow:hidden;">
    
    <!-- Header -->
    <div style="background:#007f3b; color:white; padding:18px; text-align:center;">
      <h2 style="margin:0; font-size:24px;">New Investment Submission</h2>
      <p style="color:#dfffe9; margin:0; font-size:14px;">Àdàbà Coconut Farm Estate</p>
    </div>

    <!-- Body -->
    <div style="padding:20px;">
      
      <!-- Investor Section -->
      <div style="background:#e6fff2; padding:20px; border-radius:8px; margin-bottom:18px;">
        <h3 style="margin:0 0 10px; color:#007f3b; font-size:18px;">Investor Details</h3>
        <p style="margin:4px 0;"><strong>Name:</strong> ${name}</p>
        <p style="margin:4px 0;"><strong>Email:</strong> ${email}</p>
        <p style="margin:4px 0;"><strong>Phone:</strong> ${phone}</p>
        <p style="margin:4px 0;"><strong>Address:</strong> ${address}</p>
        <p style="margin:4px 0;"><strong>Gender:</strong> ${gender}</p>
        ${message ? `<p style="margin:4px 0;"><strong>Message:</strong> ${message}</p>` : ""}
      </div>

      <!-- Referral Information -->
      <div style="background:#f0f8ff; padding:20px; border-radius:8px; margin-bottom:18px;">
        <h3 style="margin:0 0 10px; color:#007f3b; font-size:18px;">Referral Information</h3>
        <p style="margin:4px 0;"><strong>How did you know about us:</strong> ${referralSource || 'Not specified'}</p>
        ${sourceName ? `<p style="margin:4px 0;"><strong>Source Name:</strong> ${sourceName}</p>` : ""}
        ${sourceContact ? `<p style="margin:4px 0;"><strong>Source Contact:</strong> ${sourceContact}</p>` : ""}
        ${sourceEmail ? `<p style="margin:4px 0;"><strong>Source Email:</strong> ${sourceEmail}</p>` : ""}
      </div>

      <!-- Payment Section -->
      <div style="background:#f4fff8; padding:20px; border-radius:8px;">
        <h3 style="margin-top:0; color:#007f3b;">Payment Information</h3>
        <ul style="margin:8px 0; padding-left:20px; color:#333;">
          <li><strong>Account Number:</strong> 2007301592</li>
          <li><strong>Bank:</strong> FCMB</li>
          <li><strong>Account Name:</strong> KAZFIELD INTEGRATED SERVICE LTD</li>
        </ul>

        ${
          receiptFile
            ? `
          <div style="margin-top: 15px; background:white; padding:12px; border-left:4px solid #007f3b; border-radius:6px;">
            <h4 style="margin:0; color:#007f3b;">Receipt Preview</h4>
            <img src="cid:receipt_preview" style="max-width:100%; border-radius:6px; margin-top:8px;" />
            <p style="font-size:12px; color:#555; margin-top:6px;">
              📎 You can download the image attached below.
            </p>
          </div>`
            : "<p style='margin-top:10px;'>❌ No receipt uploaded</p>"
        }
      </div>

      <!-- Brochure Notice -->
      <div style="margin-top: 18px; background:#fff3cd; padding:14px; border-radius:6px; border-left:4px solid #ffcc00;">
        <p style="margin:0; color:#665200; font-size:14px;">
          📄 We've attached our official Àdàbà Farm brochure for full details on investment returns.
        </p>
      </div>

      <div style="margin-top: 24px; font-size:13px; color:#777; text-align:center; border-top:1px solid #eee; padding-top:14px;">
        Sent on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
      </div>

    </div>
  </div>
  `;
}

function clientEmailTemplate({ name, email, phone, address, gender, message, receiptFile, referralSource, sourceName, sourceContact, sourceEmail }) {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 620px; margin:0 auto; background:#ffffff; border-radius:10px; overflow:hidden;">
    
    <div style="background:#007f3b; color:white; padding:18px; text-align:center;">
      <h2 style="margin:0;">Thank You for Your Investment!</h2>
      <p style="color:#dfffe9; margin:0; font-size:14px;">Àdàbà Coconut Farm Estate</p>
    </div>

    <div style="padding:20px;">
      
      <p style="font-size:15px; color:#333;">
        Hello <strong>${name}</strong>,<br/>
        We have successfully received your investment details.
      </p>

      <div style="background:#e6fff2; padding:18px; border-radius:8px;">
        <h3 style="margin:0 0 10px; color:#007f3b;">Your Details</h3>
        <p style="margin:4px 0;"><strong>Email:</strong> ${email}</p>
        <p style="margin:4px 0;"><strong>Phone:</strong> ${phone}</p>
        <p style="margin:4px 0;"><strong>Address:</strong> ${address}</p>
        <p style="margin:4px 0;"><strong>Gender:</strong> ${gender}</p>
        ${message ? `<p style="margin:4px 0;"><strong>Message:</strong> ${message}</p>` : ""}
      </div>

      <!-- Referral Information -->
      <div style="background:#f0f8ff; padding:18px; border-radius:8px; margin-top:18px;">
        <h3 style="margin:0 0 10px; color:#007f3b;">Referral Information</h3>
        <p style="margin:4px 0;"><strong>How did you know about us:</strong> ${referralSource || 'Not specified'}</p>
        ${sourceName ? `<p style="margin:4px 0;"><strong>Source Name:</strong> ${sourceName}</p>` : ""}
        ${sourceContact ? `<p style="margin:4px 0;"><strong>Source Contact:</strong> ${sourceContact}</p>` : ""}
        ${sourceEmail ? `<p style="margin:4px 0;"><strong>Source Email:</strong> ${sourceEmail}</p>` : ""}
      </div>

      ${
        receiptFile
          ? `
      <div style="margin-top: 10px; background:#e8f8ff; padding:10px; border-radius:6px; border-left:3px solid #28a745;">
        <p style="color:#155724; margin:0; font-size:14px;"><strong>✅ Receipt received</strong> & forwarded to our team.</p>
      </div>`
          : ""
      }

      <div style="background:#f4fff8; padding:18px; border-radius:8px; margin-top:18px;">
        <h3 style="color:#007f3b; margin:0 0 8px;">Next Steps</h3>
        <ol style="margin-left:20px; color:#333;">
          <li>Your payment confirmation is being reviewed.</li>
          <li>You'll receive onboarding updates soon.</li>
          <li>Quarterly updates on your coconut farm yield.</li>
        </ol>
      </div>

      <div style="margin-top: 16px; background:#fff3cd; padding:14px; border-radius:6px; border-left:4px solid #ffcc00;">
        <p style="margin:0; color:#665200; font-size:14px;">
          📄 We've attached our official brochure for you to explore returns & benefits.
        </p>
      </div>

      <div style="margin-top: 24px; font-size:13px; color:#777; text-align:center; border-top:1px solid #eee; padding-top:14px;">
        Automated confirmation • Do not reply.
      </div>

    </div>
  </div>
  `;
}

// ---------------- Nodemailer Transporter Factory ----------------
async function createTransporter() {
  assertEnv("EMAIL_USER");
  assertEnv("EMAIL_PASS");

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    EMAIL_USER,
    EMAIL_PASS,
    SMTP_TLS_REJECT_UNAUTHORIZED,
  } = process.env;

  // Use the safer internal host for cPanel
  const primaryHost = SMTP_HOST || "mail.kazfieldisl.com";

  const transporter = nodemailer.createTransport({
    host: primaryHost,
    port: parseInt(SMTP_PORT, 10) || 465,
    secure: SMTP_SECURE === "true", // true for 465, false for 587
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: SMTP_TLS_REJECT_UNAUTHORIZED !== "false",
    },
  });

  // Try verifying before returning, else fallback to localhost relay
  try {
    await transporter.verify();
    console.log(`✅ SMTP Verified Successfully via ${primaryHost}`);
    return transporter;
  } catch (err) {
    console.warn(`⚠️ Primary SMTP failed (${primaryHost}): ${err.message}`);
    console.warn("➡️ Falling back to localhost relay (port 25, no auth)...");

    const fallback = nodemailer.createTransport({
      host: "localhost",
      port: 25,
      secure: false,
      tls: { rejectUnauthorized: false },
    });

    await fallback.verify();
    console.log("✅ Localhost mail relay verified.");
    return fallback;
  }
}

// ---------------- Sub-router for /adabafarmresort ----------------
const router = express.Router();

// ✅ GET /adabafarmresort/
router.get("/", (req, res) => {
  res.send("<h3>✅ Adaba Farm Resort API is active and reachable.</h3>");
});

// ✅ POST /adabafarmresort/api/send-email
router.post("/api/send-email", upload.single("receiptFile"), async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      gender,
      message,
      referralSource,
      sourceName,
      sourceContact,
      sourceEmail,
    } = req.body;
    const receiptFile = req.file;

    // ---------- Validation guards ----------
    if (!name || !email || !phone || !address || !gender)
      return res.status(400).json({ error: "Missing required fields." });

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      return res.status(400).json({ error: "Invalid email address." });

    if (receiptFile && receiptFile.size > 5_000_000)
      return res.status(400).json({ error: "Receipt file too large (max 5 MB)." });

    const transporter = await createTransporter();
    const COMPANY_EMAIL = process.env.COMPANY_EMAIL || process.env.EMAIL_USER;

    // ---------- Build HTML from your templates ----------
    const companyHtml = companyEmailTemplate({
      name,
      email,
      phone,
      address,
      gender,
      message,
      receiptFile,
      referralSource,
      sourceName,
      sourceContact,
      sourceEmail,
    });

    const clientHtml = clientEmailTemplate({
      name,
      email,
      phone,
      address,
      gender,
      message,
      receiptFile,
      referralSource,
      sourceName,
      sourceContact,
      sourceEmail,
    });

    // ---------- Attachments ----------
    const attachmentsForCompany = [];
    if (receiptFile) {
      attachmentsForCompany.push({
        filename: receiptFile.originalname,
        content: receiptFile.buffer,
        contentType: receiptFile.mimetype,
        cid: "receipt_preview", // used in the company template's <img src="cid:receipt_preview">
      });
    }

    // ---------- Send to company ----------
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: COMPANY_EMAIL,
      subject: `New Investment Submission from ${name}`,
      html: companyHtml,
      attachments: attachmentsForCompany,
    });

    // ---------- Confirmation to client ----------
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank You – Adaba Farm Estate Investment Confirmation",
      html: clientHtml,
      // If you want to also send the receipt back to client, uncomment below:
      // attachments: receiptFile ? [{
      //   filename: receiptFile.originalname,
      //   content: receiptFile.buffer,
      //   contentType: receiptFile.mimetype,
      // }] : [],
    });

    res.json({ message: "✅ Emails sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending emails:", error);
    res.status(500).json({
      error: "Failed to process your request.",
      reason: error.message,
      suggestion:
        "If this persists, use host=localhost and port=25 (no auth). Check that Exim mail relay is enabled in cPanel.",
    });
  }
});

// Mount the router under /adabafarmresort
app.use("/adabafarmresort", router);

// ---------------- Health + Root ----------------
app.get("/", (req, res) => {
  res.json({
    message: "🌴 Adaba Farm Resort Backend Running",
    endpoints: [
      "/adabafarmresort/",
      "/adabafarmresort/api/send-email",
      "/health",
    ],
  });
});

app.get("/health", (req, res) =>
  res.json({ status: "OK", timestamp: new Date().toISOString() })
);

// ---------------- Global Error Handler ----------------
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  if (err instanceof multer.MulterError)
    return res.status(400).json({ error: "File upload too large." });
  res.status(500).json({ error: "Internal Server Error." });
});

// ---------------- Start Server ----------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 https://kazfieldisl.com/adabafarmresort/api/send-email`);
  console.log("📧 Email service ready");
});
