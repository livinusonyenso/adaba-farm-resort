# Email Setup Instructions

This project now includes email functionality that sends confirmation emails to both the client and company when the investment form is submitted.

## Features

- **Client Email**: Sends an acknowledgment email to the client confirming their investment submission
- **Company Email**: Sends detailed submission information to the company
- **Form Validation**: Ensures all required fields are filled before submission
- **Status Feedback**: Shows success/error messages to the user
- **Loading States**: Displays loading spinner during submission

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
COMPANY_EMAIL=company@adabafarmresort.com
```

### 2. Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password as `EMAIL_PASS` in your `.env.local`

### 3. Alternative Email Services

You can use other email services by modifying the transporter configuration in `app/api/send-email/route.ts`:

```typescript
// For Outlook/Hotmail
const transporter = nodemailer.createTransporter({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// For custom SMTP
const transporter = nodemailer.createTransporter({
  host: 'your-smtp-host',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

## How It Works

### 1. Form Submission
- User fills out the investment form
- Form validates required fields (name, email, phone, address, gender)
- Form data is sent to `/api/send-email` endpoint

### 2. Email Processing
- API route receives form data
- Creates two HTML email templates:
  - **Client Email**: Acknowledgment with investment details and next steps
  - **Company Email**: Complete submission details for internal processing
- Sends both emails using nodemailer

### 3. User Feedback
- Success message displayed if emails sent successfully
- Error message displayed if something goes wrong
- Form resets on successful submission

## Email Templates

### Client Email Features
- Professional acknowledgment message
- Complete investment details summary
- Payment instructions with account details
- Next steps for the investment process
- Automated timestamp

### Company Email Features
- Complete investor information
- Payment account details
- Optional message from client
- Submission timestamp
- Professional formatting for easy reading

## Testing

1. Start your development server: `npm run dev` or `yarn dev`
2. Navigate to the contact/investment form page
3. Fill out the form with test data
4. Submit the form
5. Check both your email and the company email for the messages

## Troubleshooting

### Common Issues

1. **"Failed to send emails" error**:
   - Check your environment variables are correct
   - Verify Gmail app password is valid
   - Ensure 2FA is enabled on Gmail

2. **Emails not received**:
   - Check spam/junk folders
   - Verify email addresses are correct
   - Check Gmail security settings

3. **Form not submitting**:
   - Check browser console for errors
   - Verify API route is accessible
   - Check network connectivity

### Debug Mode

Add console logging to debug issues:

```typescript
// In app/api/send-email/route.ts
console.log('Email config:', {
  user: process.env.EMAIL_USER,
  hasPass: !!process.env.EMAIL_PASS,
  companyEmail: process.env.COMPANY_EMAIL
});
```

## Security Notes

- Never commit `.env.local` to version control
- Use app passwords instead of main account passwords
- Consider using environment-specific email accounts for production
- Implement rate limiting for production use

## Customization

### Email Templates
Modify the HTML templates in `app/api/send-email/route.ts` to match your brand:
- Update colors and styling
- Add your logo
- Modify the content and messaging
- Add additional fields as needed

### Form Fields
Add new form fields by:
1. Updating the form state in `ContactPage.tsx`
2. Adding the field to the form UI
3. Including it in the API request
4. Adding it to both email templates

## Production Deployment

1. Set environment variables in your hosting platform
2. Test email functionality in production
3. Consider using a dedicated email service (SendGrid, Mailgun, etc.)
4. Implement proper error handling and logging
5. Add rate limiting to prevent abuse
