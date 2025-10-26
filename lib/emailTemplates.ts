export function companyEmailTemplate({ name, email, phone, address, gender, message, receiptFile }: any) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
        New Investment Submission
      </h2>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #007bff; margin-top: 0;">Investor Details</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Gender:</strong> ${gender}</p>
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
      </div>

      <div style="background-color: #e7f3ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #007bff; margin-top: 0;">Payment Information</h3>
        <p><strong>Account Number:</strong> 2007301592</p>
        <p><strong>Bank:</strong> FCMB</p>
        <p><strong>Account Name:</strong> KAZFIELD INTEGRATED SERVICE LTD</p>
        ${receiptFile ? `
          <div style="background-color: #d1ecf1; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #17a2b8;">
            <h4 style="color: #0c5460; margin-top: 0;">📎 Payment Receipt Attached</h4>
            <p style="color: #0c5460; margin-bottom: 5px;"><strong>File:</strong> ${receiptFile}</p>
            <p style="color: #0c5460; margin-bottom: 0; font-size: 14px;">
              <em>💡 Look for the attachment in your email client. You can download or preview it directly from the email.</em>
            </p>
          </div>
        ` : "<p><strong>Receipt:</strong> ❌ No receipt uploaded</p>"}
      </div>

      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px;">
        <p>This email was sent from your investment form on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}.</p>
      </div>
    </div>
  `;
}

export function clientEmailTemplate({ name, email, phone, address, gender, message, receiptFile }: any) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #007bff; margin-bottom: 10px;">Thank You for Your Investment!</h1>
        <p style="color: #666; font-size: 18px;">We have received your investment submission</p>
      </div>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #007bff; margin-top: 0;">Your Investment Details</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Gender:</strong> ${gender}</p>
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
        ${receiptFile ? `
          <div style="background-color: #d4edda; padding: 10px; border-radius: 6px; margin: 10px 0; border-left: 3px solid #28a745;">
            <p style="color: #155724; margin: 0;"><strong>✅ Receipt:</strong> Payment receipt received and forwarded to our team</p>
          </div>
        ` : ""}
      </div>

      <div style="background-color: #e7f3ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #007bff; margin-top: 0;">Next Steps</h3>
        <p>1. Please make your payment to the account details below:</p>
        <ul style="margin: 10px 0; padding-left: 20px;">
          <li><strong>Account Number:</strong> 2007301592</li>
          <li><strong>Bank:</strong> FCMB</li>
          <li><strong>Account Name:</strong> KAZFIELD INTEGRATED SERVICE LTD</li>
        </ul>
        <p>2. Upload your payment receipt using the form</p>
        <p>3. Our team will review your submission and contact you within 24-48 hours</p>
      </div>

      <div style="background-color: #d4edda; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
        <h4 style="color: #155724; margin-top: 0;">Important Note</h4>
        <p style="color: #155724; margin-bottom: 0;">Please keep this email as confirmation of your investment submission. If you have any questions, feel free to contact us.</p>
      </div>

      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px; text-align: center;">
        <p>This is an automated confirmation email. Please do not reply to this email.</p>
        <p>Submitted on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  `;
}
