# Adaba Farm Resort - Deployment Guide

This project has been restructured with proper separation of concerns for hosting on Namecheap shared hosting.

## Project Structure

```
adaba-farm-resort/
├── frontend/          # Next.js static site (for Namecheap hosting)
├── backend/           # Express.js server (for separate hosting)
└── DEPLOYMENT.md      # This file
```

## Frontend (Next.js Static Site)

The frontend is now configured for static export and can be hosted on Namecheap shared hosting.

### Build and Deploy Frontend

1. **Build the static site:**
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Upload to Namecheap:**
   - Upload the contents of the `out` folder to your Namecheap public_html directory
   - The `out` folder contains all static files ready for hosting

3. **Environment Variables:**
   - Create a `.env.local` file in the frontend directory
   - Set `NEXT_PUBLIC_BACKEND_URL` to your backend server URL

## Backend (Express.js Server)

The backend handles all server-side functionality including email processing.

### Deploy Backend

You can host the backend on:
- **Heroku** (recommended for beginners)
- **Railway**
- **DigitalOcean App Platform**
- **VPS/Cloud Server**

### Backend Deployment Steps

1. **Prepare the backend:**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables:**
   - Copy `env.example` to `.env`
   - Configure your SMTP settings
   - Set the frontend URL for CORS

3. **Deploy to your chosen platform:**
   - Follow platform-specific deployment instructions
   - Ensure the backend URL is accessible

### Backend Environment Variables

```env
# Email Configuration (SMTP)
EMAIL_USER=your-email@yourdomain.com
EMAIL_PASS=your-email-password
COMPANY_EMAIL=company@adabafarmresort.com

# SMTP Configuration
SMTP_HOST=smtp.yourdomain.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_TLS_REJECT_UNAUTHORIZED=true

# Server Configuration
PORT=3001
NODE_ENV=production

# CORS Configuration
FRONTEND_URL=https://your-frontend-domain.com
```

## Complete Deployment Process

### Step 1: Deploy Backend First

1. Choose a hosting platform for your Express.js backend
2. Deploy the backend and note the URL
3. Test the backend health endpoint: `https://your-backend-url.com/health`

### Step 2: Configure Frontend

1. Update the frontend environment variable:
   ```env
   NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com
   ```

2. Build the frontend:
   ```bash
   npm run build
   ```

### Step 3: Deploy Frontend to Namecheap

1. Upload the `out` folder contents to your Namecheap public_html
2. Test the website functionality

## Testing

### Backend Testing
```bash
# Health check
curl https://your-backend-url.com/health

# Test email endpoint (replace with your backend URL)
curl -X POST https://your-backend-url.com/api/send-email \
  -F "name=Test User" \
  -F "email=test@example.com" \
  -F "phone=1234567890" \
  -F "address=Test Address" \
  -F "gender=Male"
```

### Frontend Testing
1. Visit your Namecheap-hosted site
2. Test the contact/investment forms
3. Verify emails are sent successfully

## SMTP Configuration

### Gmail Setup
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
```

### Outlook Setup
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
```

### Custom SMTP
```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=your-email@yourdomain.com
EMAIL_PASS=your-password
```

## Security Notes

- The backend includes rate limiting (10 requests per 15 minutes per IP)
- CORS is configured to only allow requests from your frontend domain
- File uploads are limited to 5MB and image files only
- Helmet.js provides additional security headers

## Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Ensure `FRONTEND_URL` in backend matches your actual frontend domain
   - Check that the frontend is making requests to the correct backend URL

2. **Email Not Sending:**
   - Verify SMTP credentials
   - Check if your hosting provider blocks SMTP ports
   - Test with a different email service

3. **File Upload Issues:**
   - Ensure file size is under 5MB
   - Check that file is an image (JPEG, PNG, etc.)

4. **Build Errors:**
   - Run `npm install` in both frontend and backend directories
   - Check Node.js version compatibility

## Support

For deployment issues, check:
1. Backend logs for error messages
2. Browser console for frontend errors
3. Network tab for API call failures
4. SMTP service status

## File Structure After Deployment

```
Namecheap public_html/
├── index.html
├── _next/
├── static/
└── ... (other static files)

Backend Server/
├── server.js
├── package.json
├── node_modules/
└── .env
```
