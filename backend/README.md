# Adaba Farm Resort - Backend API

Express.js backend server for handling email submissions and form processing.

## Features

- Email processing with Nodemailer
- File upload handling (receipt images)
- Rate limiting for API protection
- CORS configuration for frontend integration
- Security headers with Helmet.js
- Retry mechanism for email delivery

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp env.example .env
   # Edit .env with your SMTP settings
   ```

3. **Start the server:**
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

## API Endpoints

### Health Check
```
GET /health
```
Returns server status and timestamp.

### Email Submission
```
POST /api/send-email
```
Handles investment form submissions with file uploads.

**Form Data Fields:**
- `name` (required): Investor's full name
- `email` (required): Email address
- `phone` (required): Phone number
- `address` (required): Address
- `gender` (required): Gender
- `message` (optional): Additional message
- `receiptFile` (optional): Payment receipt image
- `referralSource` (optional): How they heard about us
- `sourceName` (optional): Referral source name
- `sourceContact` (optional): Referral source contact
- `sourceEmail` (optional): Referral source email

**Response:**
```json
{
  "message": "Emails sent successfully!"
}
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `EMAIL_USER` | SMTP username | Yes |
| `EMAIL_PASS` | SMTP password | Yes |
| `COMPANY_EMAIL` | Company email for notifications | Yes |
| `SMTP_HOST` | SMTP server hostname | Yes |
| `SMTP_PORT` | SMTP server port | Yes |
| `SMTP_SECURE` | Use SSL/TLS | No |
| `SMTP_TLS_REJECT_UNAUTHORIZED` | Reject unauthorized certificates | No |
| `PORT` | Server port | No (default: 3001) |
| `NODE_ENV` | Environment mode | No |
| `FRONTEND_URL` | Frontend URL for CORS | Yes |

## Security Features

- **Rate Limiting:** 10 requests per 15 minutes per IP
- **File Upload Limits:** 5MB maximum, images only
- **CORS Protection:** Only allows requests from configured frontend URL
- **Security Headers:** Helmet.js provides additional security
- **Input Validation:** Required field validation and email format checking

## Email Templates

The server includes two email templates:

1. **Company Email:** Sent to the business with investor details and receipt
2. **Client Email:** Confirmation email sent to the investor

Both templates are HTML-formatted with inline styles for maximum email client compatibility.

## Error Handling

- Graceful error handling with appropriate HTTP status codes
- Detailed error logging for debugging
- Client-friendly error messages
- Retry mechanism for email delivery failures

## Deployment

This backend is designed to be deployed on platforms like:
- Heroku
- Railway
- DigitalOcean App Platform
- VPS/Cloud servers

See the main `DEPLOYMENT.md` file for detailed deployment instructions.

## Development

### Running in Development Mode
```bash
npm run dev
```
Uses nodemon for automatic server restarts on file changes.

### Testing the API
```bash
# Health check
curl http://localhost:3001/health

# Test email submission
curl -X POST http://localhost:3001/api/send-email \
  -F "name=Test User" \
  -F "email=test@example.com" \
  -F "phone=1234567890" \
  -F "address=Test Address" \
  -F "gender=Male"
```

## Dependencies

- **express:** Web framework
- **cors:** Cross-origin resource sharing
- **multer:** File upload handling
- **nodemailer:** Email sending
- **dotenv:** Environment variable management
- **helmet:** Security headers
- **express-rate-limit:** Rate limiting

## License

MIT License - See main project for details.
