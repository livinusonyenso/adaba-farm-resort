require('dotenv').config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3001,
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
    FROM_CONTACT: `"Sina Consulting Website" <${process.env.SMTP_USER || process.env.EMAIL_USER}>`,
    FROM_CAREER: `"Sina Consulting Careers" <${process.env.SMTP_USER || process.env.EMAIL_USER}>`,
    FROM_SERVICE: `"Sina Consulting Services" <${process.env.SMTP_USER || process.env.EMAIL_USER}>`,
  },
  UPLOAD: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ],
    DIR: 'uploads/'
  }
};
