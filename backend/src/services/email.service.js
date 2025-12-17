const nodemailer = require('nodemailer');
const config = require('../config');

class EmailService {
  constructor() {
    this.transporter = null;
  }

  async createTransporter() {
    if (this.transporter) return this.transporter;

    if (!config.SMTP.USER || !config.SMTP.PASS) {
      console.warn('⚠️ SMTP credentials not found. Email service may not work.');
    }

    this.transporter = nodemailer.createTransport({
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
      await this.transporter.verify();
      console.log(`✅ SMTP Verified Successfully via ${config.SMTP.HOST}`);
    } catch (err) {
      console.error('❌ SMTP Verification failed:', err.message);
      // In production, we might want to throw or handle this differently
      // For now, we log it.
    }

    return this.transporter;
  }

  async sendMail(options) {
    const transporter = await this.createTransporter();
    return transporter.sendMail(options);
  }
}

module.exports = new EmailService();
