const express = require('express');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter);

// CORS configuration
const corsOptions = {
  origin: [
    'https://taskmaster-todoapp-1.onrender.com',
    'http://localhost:3000',
    'http://localhost:3001',
    process.env.FRONTEND_URL
  ].filter(Boolean), // Remove any undefined values
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Email configuration
function createTransporter() {
  if (!process.env.SMTP_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Missing SMTP configuration variables!');
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== 'false',
    },
  });

  return transporter;
}

async function verifySMTP(transporter) {
  try {
    await transporter.verify();
    console.log('✅ SMTP Verified');
  } catch (error) {
    console.error('SMTP Verification Failed ❌', error);
    throw error;
  }
}

// Email templates
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

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Adaba Farm Resort API is running!', 
    status: 'active',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/health',
      sendEmail: '/api/send-email'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Email submission endpoint
app.post('/api/send-email', upload.single('receiptFile'), async (req, res) => {
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
      sourceEmail
    } = req.body;

    const receiptFile = req.file;

    // Validate required fields
    if (!name || !email || !phone || !address || !gender) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Optional: validate email format
    if (!email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Validate file size limit (5MB)
    if (receiptFile && receiptFile.size > 5_000_000) {
      return res.status(400).json({ error: 'Receipt file too large (max 5MB)' });
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
      receiptFile: receiptFile ? receiptFile.originalname : null,
      receiptFileName: receiptFile ? receiptFile.originalname.replace(/[^\w\s.-]/g, '').replace(/\s+/g, '_').toLowerCase() : null,
      referralSource,
      sourceName,
      sourceContact,
      sourceEmail,
    };

    // Convert file to attachments (preview + download)
    const attachments = [];

    if (receiptFile) {
      const cleanName = receiptFile.originalname
        .replace(/[^\w\s.-]/g, '')
        .replace(/\s+/g, '_')
        .toLowerCase();

      // Attachment for download
      attachments.push({
        filename: cleanName,
        content: receiptFile.buffer,
        contentType: receiptFile.mimetype,
        disposition: 'attachment',
      });

      // Inline CID preview for image types
      if (receiptFile.mimetype.startsWith('image/')) {
        attachments.push({
          filename: cleanName,
          content: receiptFile.buffer,
          cid: 'receipt_preview', // MUST MATCH TEMPLATE
          contentType: receiptFile.mimetype,
        });
      }
    }

    // Send to company
    try {
      console.log('📧 Sending company email with attachments:', attachments.length > 0 ? `${attachments.length} file(s)` : 'no files');
      
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.COMPANY_EMAIL || process.env.EMAIL_USER,
        subject: `New Investment Submission from ${name}`,
        html: companyEmailTemplate(emailData),
        attachments,
      });
      console.log('✅ Company email sent successfully with attachments');
    } catch (error) {
      console.error('❌ Failed to send company email:', error);
      throw error;
    }

    // Rate limiting delay for Mailtrap
    console.log('⏳ Waiting 5 seconds for rate limiting...');
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
          subject: 'Investment Submission Confirmation - Adaba Farm Estate',
          html: clientEmailTemplate(emailData),
        });
        console.log('✅ Client email sent successfully');
        clientEmailSent = true;
      } catch (error) {
        retryCount++;
        console.error(`❌ Failed to send client email (attempt ${retryCount}):`, error);
        
        if (retryCount < maxRetries) {
          console.log(`⏳ Retrying in 3 seconds... (${retryCount}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, 3000));
        } else {
          console.log('⚠️ Company email was sent, but client email failed after retries');
        }
      }
    }

    res.json({ message: 'Emails sent successfully!' });

  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large' });
    }
  }
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📧 Email service ready`);
  console.log(`🌐 CORS enabled for: https://taskmaster-todoapp-1.onrender.com and localhost`);
});

module.exports = app;
