const nodemailer = require('nodemailer');
const config = require('../config');

class EmailService {
  constructor() {
    this.transporter = null;
  }

  async createTransporter() {
    if (this.transporter) return this.transporter;

    console.log('📧 Initializing Adaba Farm Email Transporter...');
    console.log(`   Host: ${config.SMTP.HOST}`);
    console.log(`   Port: ${config.SMTP.PORT}`);
    console.log(`   Secure: ${config.SMTP.SECURE}`);
    console.log(`   User: ${config.SMTP.USER ? config.SMTP.USER.substring(0, 5) + '***' : 'NOT SET'}`);

    if (!config.SMTP.USER || !config.SMTP.PASS) {
      console.warn('⚠️ SMTP credentials not found. Email service may not work.');
      console.warn('   Please set EMAIL_USER and EMAIL_PASS in .env');
    }

    // Try primary SMTP configuration (Adaba Farm SMTP)
    const primaryTransporter = nodemailer.createTransport({
      host: config.SMTP.HOST,
      port: config.SMTP.PORT,
      secure: config.SMTP.SECURE,
      auth: {
        user: config.SMTP.USER,
        pass: config.SMTP.PASS,
      },
      tls: {
        rejectUnauthorized: config.SMTP.TLS_REJECT_UNAUTHORIZED,
      },
    });

    try {
      await primaryTransporter.verify();
      console.log(`✅ SMTP Verified Successfully via ${config.SMTP.HOST}`);
      this.transporter = primaryTransporter;
      return this.transporter;
    } catch (err) {
      console.error('❌ Primary SMTP Verification failed:', err.message);
      console.warn('➡️ Attempting fallback to localhost relay (port 25, no auth)...');

      // Fallback to localhost mail relay (common in cPanel/production environments)
      try {
        const fallbackTransporter = nodemailer.createTransport({
          host: 'localhost',
          port: 25,
          secure: false,
          tls: { rejectUnauthorized: false },
        });

        await fallbackTransporter.verify();
        console.log('✅ Localhost mail relay verified and will be used.');
        this.transporter = fallbackTransporter;
        return this.transporter;
      } catch (fallbackErr) {
        console.error('❌ Localhost relay also failed:', fallbackErr.message);
        console.error('⚠️ EMAIL SERVICE IS NOT FUNCTIONAL - Check SMTP configuration!');
        // Return the primary transporter anyway - let it fail when sending
        this.transporter = primaryTransporter;
        return this.transporter;
      }
    }
  }

  async sendMail(options) {
    // Skip actual email sending in localhost development
    if (process.env.NODE_ENV === 'development' || !process.env.EMAIL_USER || process.env.EMAIL_USER.includes('your-gmail')) {
      console.log('🧪 [DEV MODE] Simulating email send (not actually sent):');
      console.log(`   📤 To: ${options.to}`);
      console.log(`   📧 Subject: ${options.subject}`);
      console.log(`   ✅ Email would be sent in production`);
      return { messageId: 'dev-mode-mock-id', accepted: [options.to] };
    }

    const transporter = await this.createTransporter();

    try {
      console.log(`📤 Sending email to: ${options.to}`);
      console.log(`   Subject: ${options.subject}`);
      const info = await transporter.sendMail(options);
      console.log(`✅ Email sent successfully! MessageId: ${info.messageId}`);
      return info;
    } catch (error) {
      console.error('❌ Failed to send email:');
      console.error(`   To: ${options.to}`);
      console.error(`   Subject: ${options.subject}`);
      console.error(`   Error: ${error.message}`);
      if (error.code) console.error(`   Code: ${error.code}`);
      if (error.response) console.error(`   Response: ${error.response}`);
      throw error; // Re-throw to be caught by controller
    }
  }
}

module.exports = new EmailService();
