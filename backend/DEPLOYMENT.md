# Deployment Instructions - Sina API Fix

## What Was Fixed

Both `/adabafarmresort/api/sina/contact` and `/adabafarmresort/api/sina/career` endpoints were failing because:

1. **No localhost mail relay fallback** - The shared `email.service.js` didn't have a fallback mechanism like the main `/api/send-email` endpoint
2. **Insufficient error logging** - Hard to diagnose what was failing in production
3. **No config validation** - Missing environment variables went undetected at startup

## Files Changed

1. `src/services/email.service.js` - Added localhost fallback + enhanced logging
2. `src/controllers/contact.controller.js` - Added detailed request/error logging
3. `src/controllers/career.controller.js` - Added detailed request/error logging
4. `src/config/index.js` - Added validation and logging methods
5. `server.js` - Added startup configuration validation

## Deployment Steps

### Step 1: Upload Changed Files to Production

Upload these files to your production server:

```
backend/src/services/email.service.js
backend/src/controllers/contact.controller.js
backend/src/controllers/career.controller.js
backend/src/config/index.js
backend/server.js
backend/test-contact-api.js (optional, for testing)
```

### Step 2: Restart Your Backend Service

Depending on your hosting setup:

**For PM2:**
```bash
pm2 restart adaba-farm-backend
pm2 logs --lines 50
```

**For systemd:**
```bash
sudo systemctl restart adaba-farm-backend
sudo journalctl -u adaba-farm-backend -n 50 -f
```

**For cPanel Node.js:**
- Go to Setup Node.js App in cPanel
- Click "Restart" button
- Check application logs

### Step 3: Check Server Logs

Look for these indicators of successful startup:

```
🔧 Validating Sina API Configuration...
📋 Configuration Loaded:
   NODE_ENV: production
   PORT: 3001
   SMTP_HOST: mail.kazfieldisl.com
   SMTP_PORT: 465
   SMTP_SECURE: true
   SMTP_USER: ada***
   SMTP_PASS: ***
   OWNER_EMAIL: sina@kazfieldisl.com
📍 Mounting Sina routes at: /adabafarmresort/api/sina/*
🚀 Server running on port 3001
```

### Step 4: Test the Endpoints

**Test Contact Form:**
```bash
curl -X POST https://kazfieldisl.com/adabafarmresort/api/sina/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "contactNumber": "08012345678",
    "businessEmail": "test@example.com",
    "organizationName": "Test Org",
    "role": "Tester"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Thank you for your inquiry! We will get back to you shortly."
}
```

**Test Career Form:**
```bash
curl -X POST https://kazfieldisl.com/adabafarmresort/api/sina/career \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "emailAddress": "test@example.com",
    "contactNumber": "08012345678",
    "location": "Lagos, Nigeria"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Your application has been submitted successfully! Check your email for confirmation."
}
```

### Step 5: Monitor Server Logs During Test

Watch for these log messages indicating proper function:

**Contact Form:**
```
📝 Contact form submission received
   From: Test User
   Email: test@example.com
✅ Validation passed, processing contact form...
📤 Sending email to: sina@kazfieldisl.com
   Subject: New Contact Inquiry from Test User
✅ Email sent successfully! MessageId: <...>
✅ Contact form processed successfully
```

**Career Form:**
```
💼 Career application received
   From: Test User
   Email: test@example.com
   CV Uploaded: No
✅ Validation passed, processing career application...
📤 Sending email to: sina@kazfieldisl.com
   Subject: New Career Application: Test User
✅ Email sent successfully! MessageId: <...>
✅ Career application processed successfully
```

## Troubleshooting

### If Authentication Fails

The service will automatically fall back to localhost mail relay:

```
❌ Primary SMTP Verification failed: Invalid login
➡️ Attempting fallback to localhost relay (port 25, no auth)...
✅ Localhost mail relay verified and will be used.
```

This is normal in cPanel environments.

### If Emails Aren't Received

1. Check server logs for email sending confirmation
2. Check spam folder at `sina@kazfieldisl.com`
3. Verify `OWNER_EMAIL` environment variable is correct
4. Check cPanel mail queue for stuck messages

### If Validation Fails

Server will log:
```
⚠️ Validation failed: [array of errors]
```

Check the request payload matches the required fields.

## Production Environment Variables ✅

Your production environment is already properly configured:

- ✅ `EMAIL_USER`: adabafarmresort@kazfieldisl.com
- ✅ `EMAIL_PASS`: *5@_k($T)&.E
- ✅ `SMTP_HOST`: mail.kazfieldisl.com
- ✅ `SMTP_PORT`: 465
- ✅ `SMTP_SECURE`: true
- ✅ `OWNER_EMAIL`: sina@kazfieldisl.com

No environment variable changes needed!

## Summary

The fix adds the same proven fallback mechanism and logging that your working `/adabafarmresort/api/send-email` endpoint uses. After deployment, both Sina API endpoints should work reliably with comprehensive logging for easy debugging.
