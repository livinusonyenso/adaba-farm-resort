# Backend Email Configuration

## Required Environment Variables

Create a `.env` file in your `backend/` directory with the following configuration:

```env
# Email Configuration (SMTP)
EMAIL_USER=admin@earnestora.com
EMAIL_PASS=Chika1997.@123
COMPANY_EMAIL=admin@earnestora.com

# SMTP Configuration
SMTP_HOST=earnestora.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_TLS_REJECT_UNAUTHORIZED=false

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

## Setup Instructions

1. **Navigate to your backend directory:**
   ```bash
   cd backend/
   ```

2. **Create the .env file:**
   ```bash
   # On Windows
   copy env.example .env
   
   # On Mac/Linux
   cp env.example .env
   ```

3. **Edit the .env file** with the configuration above

4. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

5. **Start the backend server:**
   ```bash
   npm start
   # or
   node server.js
   ```

## Email Configuration Details

- **SMTP Host**: `earnestora.com`
- **Port**: `465` (SSL/TLS)
- **Security**: SSL enabled (`SMTP_SECURE=true`)
- **Authentication**: Username/Password
- **From Address**: `admin@earnestora.com`
- **Company Email**: `admin@earnestora.com` (where submissions are sent)

## Testing the Configuration

1. Start your backend server
2. Check the console for "✅ SMTP Verified" message
3. Submit a test form from your frontend
4. Check both the sender and recipient email addresses

## Troubleshooting

If you encounter SMTP errors:

1. **Verify credentials** are correct
2. **Check firewall settings** for port 465
3. **Ensure SSL/TLS** is properly configured on your email server
4. **Test SMTP settings** using an email client first

## Security Notes

- The `.env` file is gitignored for security
- Never commit email passwords to version control
- Consider using environment-specific configurations for production
