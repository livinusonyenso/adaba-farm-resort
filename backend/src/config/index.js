require('dotenv').config();

const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3001,
  
  // Sina-specific SMTP configuration (for contact & career forms)
  SINA_SMTP: {
    HOST: process.env.SINA_SMTP_HOST || 'mail.sinaconsultingservices.co.uk',
    PORT: parseInt(process.env.SINA_SMTP_PORT) || 465,
    USER: process.env.SINA_SMTP_USER || 'admin@sinaconsultingservices.co.uk',
    PASS: process.env.SINA_SMTP_PASS,
    SECURE: (process.env.SINA_SMTP_PORT || 465) == 465,
    TLS_REJECT_UNAUTHORIZED: process.env.SINA_SMTP_TLS_REJECT_UNAUTHORIZED !== 'false',
  },
  
  // Main SMTP configuration (for other endpoints like /api/send-email)
  SMTP: {
    HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
    PORT: parseInt(process.env.SMTP_PORT) || 587,
    USER: process.env.SMTP_USER || process.env.EMAIL_USER,
    PASS: process.env.SMTP_PASS || process.env.EMAIL_PASS,
    SECURE: process.env.SMTP_PORT == 465,
    TLS_REJECT_UNAUTHORIZED: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== 'false',
  },
  
  EMAIL: {
    OWNER: process.env.OWNER_EMAIL || 'admin@sinaconsultingservices.co.uk',
    FROM_CONTACT: `"Sina Consulting Website" <${process.env.SINA_SMTP_USER || 'admin@sinaconsultingservices.co.uk'}>`,
    FROM_CAREER: `"Sina Consulting Careers" <${process.env.SINA_SMTP_USER || 'admin@sinaconsultingservices.co.uk'}>`,
    FROM_SUBSCRIPTION: `"Àdàbà Farm and Resort" <${process.env.SINA_SMTP_USER || 'admin@sinaconsultingservices.co.uk'}>`,
    FROM_SERVICE: `"Sina Consulting Services" <${process.env.SINA_SMTP_USER || 'admin@sinaconsultingservices.co.uk'}>`,
  },
  UPLOAD: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ],
    DIR: 'uploads/'
  },
  
  // Config validation helper
  validate() {
    const warnings = [];
    const errors = [];
    
    // Validate Sina SMTP (required for contact & career endpoints)
    if (!this.SINA_SMTP.USER) {
      errors.push('SINA_SMTP_USER is not set (required for Sina contact/career forms)');
    }
    if (!this.SINA_SMTP.PASS) {
      errors.push('SINA_SMTP_PASS is not set (required for Sina contact/career forms)');
    }
    
    // Validate Main SMTP (for other endpoints)
    if (!this.SMTP.USER) {
      warnings.push('SMTP_USER (or EMAIL_USER) is not set');
    }
    if (!this.SMTP.PASS) {
      warnings.push('SMTP_PASS (or EMAIL_PASS) is not set');
    }
    
    if (!this.EMAIL.OWNER) {
      warnings.push('OWNER_EMAIL is not set, using default');
    }
    
    if (errors.length > 0) {
      console.error('❌ Configuration Errors:');
      errors.forEach(err => console.error(`   - ${err}`));
    }
    
    if (warnings.length > 0) {
      console.warn('⚠️ Configuration Warnings:');
      warnings.forEach(warn => console.warn(`   - ${warn}`));
    }
    
    return { valid: errors.length === 0, errors, warnings };
  },
  
  // Log sanitized config (without sensitive data)
  logConfig() {
    console.log('📋 Configuration Loaded:');
    console.log(`   NODE_ENV: ${this.NODE_ENV}`);
    console.log(`   PORT: ${this.PORT}`);
    console.log('\n   📧 Sina SMTP (for contact/career):');
    console.log(`      Host: ${this.SINA_SMTP.HOST}`);
    console.log(`      Port: ${this.SINA_SMTP.PORT}`);
    console.log(`      Secure: ${this.SINA_SMTP.SECURE}`);
    console.log(`      User: ${this.SINA_SMTP.USER ? this.SINA_SMTP.USER.substring(0, 5) + '***' : 'NOT SET'}`);
    console.log(`      Pass: ${this.SINA_SMTP.PASS ? '***' : 'NOT SET'}`);
    console.log('\n   📧 Main SMTP (for other endpoints):');
    console.log(`      Host: ${this.SMTP.HOST}`);
    console.log(`      Port: ${this.SMTP.PORT}`);
    console.log(`      Secure: ${this.SMTP.SECURE}`);
    console.log(`      User: ${this.SMTP.USER ? this.SMTP.USER.substring(0, 3) + '***' : 'NOT SET'}`);
    console.log(`      Pass: ${this.SMTP.PASS ? '***' : 'NOT SET'}`);
    console.log(`\n   📬 Email Settings:`);
    console.log(`      Owner: ${this.EMAIL.OWNER}`);
  }
};

module.exports = config;
