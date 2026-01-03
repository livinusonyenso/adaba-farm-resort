const nodemailer = require('nodemailer');
const config = require('../config');

class EmailService {
  constructor() {
    this.transporter = null;
  }

  async createTransporter() {
    if (this.transporter) return this.transporter;

    console.log('📧 Initializing Sina Email Transporter...');
    console.log(`   Host: ${config.SINA_SMTP.HOST}`);
    console.log(`   Port: ${config.SINA_SMTP.PORT}`);
    console.log(`   Secure: ${config.SINA_SMTP.SECURE}`);
    console.log(`   User: ${config.SINA_SMTP.USER ? config.SINA_SMTP.USER.substring(0, 5) + '***' : 'NOT SET'}`);

    if (!config.SINA_SMTP.USER || !config.SINA_SMTP.PASS) {
      console.warn('⚠️ Sina SMTP credentials not found. Email service may not work.');
      console.warn('   Please set SINA_SMTP_USER and SINA_SMTP_PASS in .env');
    }

    // Try primary SMTP configuration (Sina-specific)
    const primaryTransporter = nodemailer.createTransport({
      host: config.SINA_SMTP.HOST,
      port: config.SINA_SMTP.PORT,
      secure: config.SINA_SMTP.SECURE,
      auth: {
        user: config.SINA_SMTP.USER,
        pass: config.SINA_SMTP.PASS,
      },
      tls: {
        rejectUnauthorized: config.SINA_SMTP.TLS_REJECT_UNAUTHORIZED,
      },
    });

    try {
      await primaryTransporter.verify();
      console.log(`✅ Sina SMTP Verified Successfully via ${config.SINA_SMTP.HOST}`);
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
