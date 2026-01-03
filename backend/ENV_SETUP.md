# Environment Variables Setup

## Required Environment Variables for Production

Add these NEW variables to your production environment:

### Sina SMTP Configuration (NEW - Required)
These variables configure the email service for `/api/sina/contact` and `/api/sina/career` endpoints:

```
SINA_SMTP_HOST=mail.sinaconsultingservices.co.uk
SINA_SMTP_PORT=465
SINA_SMTP_USER=admin@sinaconsultingservices.co.uk
SINA_SMTP_PASS=<password_for_admin@sinaconsultingservices.co.uk>
```

### Existing Variables (Keep as is)
These variables are already configured and should remain unchanged:

```
COMPANY_EMAIL=adabafarmresort@kazfieldisl.com
EMAIL_PASS=*5@_k($T)&.E
EMAIL_USER=adabafarmresort@kazfieldisl.com
FRONTEND_URL=https://adaba-farm-resort.onrender.com/
NODE_ENV=production
OWNER_EMAIL=admin@sinaconsultingservices.co.uk
SMTP_HOST=mail.kazfieldisl.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_TLS_REJECT_UNAUTHORIZED=false
```

## Summary of Email Configurations

### Sina Endpoints (Contact & Career Forms)
- **Endpoints**: `/adabafarmresort/api/sina/contact`, `/adabafarmresort/api/sina/career`
- **Sender Email**: admin@sinaconsultingservices.co.uk
- **SMTP Server**: mail.sinaconsultingservices.co.uk:465
- **Recipient**: admin@sinaconsultingservices.co.uk (from OWNER_EMAIL)

### Main Endpoint (Investment Form)
- **Endpoint**: `/adabafarmresort/api/send-email`
- **Sender Email**: adabafarmresort@kazfieldisl.com
- **SMTP Server**: mail.kazfieldisl.com:465
- **Recipient**: adabafarmresort@kazfieldisl.com (from COMPANY_EMAIL)

## How to Add to Production

### If using cPanel or Environment Manager:
1. Go to your hosting control panel
2. Find "Environment Variables" or "Configuration"
3. Add the 4 new SINA_SMTP_* variables shown above
4. Save changes
5. Restart your backend application

### If using .env file:
1. Edit your production `.env` file
2. Add the 4 new SINA_SMTP_* variables
3. Save the file
4. Restart your backend service

## Verification

After adding the variables and restarting, check your server logs for:

```
📋 Configuration Loaded:
   
   📧 Sina SMTP (for contact/career):
      Host: mail.sinaconsultingservices.co.uk
      Port: 465
      Secure: true
      User: admin***
      Pass: ***
```

This confirms the Sina SMTP configuration is loaded correctly.
