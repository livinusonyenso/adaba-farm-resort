const contactTemplate = (data) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <tr>
            <td style="background: linear-gradient(135deg, #1a365d 0%, #2d5a87 100%); padding: 30px 40px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">
                    New Contact Form Submission
                </h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 40px;">
                <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                    You have received a new inquiry from your website contact form.
                </p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 8px; margin-bottom: 25px;">
                    <tr>
                        <td style="padding: 25px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                                        <strong style="color: #1a365d; font-size: 14px;">Full Name:</strong>
                                        <p style="margin: 5px 0 0; color: #4a5568; font-size: 15px;">${data.firstName} ${data.lastName}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                                        <strong style="color: #1a365d; font-size: 14px;">Contact Number:</strong>
                                        <p style="margin: 5px 0 0; color: #4a5568; font-size: 15px;">${data.contactNumber}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                                        <strong style="color: #1a365d; font-size: 14px;">Business Email:</strong>
                                        <p style="margin: 5px 0 0; color: #4a5568; font-size: 15px;">
                                            <a href="mailto:${data.businessEmail}" style="color: #2d5a87; text-decoration: none;">${data.businessEmail}</a>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                                        <strong style="color: #1a365d; font-size: 14px;">Organization:</strong>
                                        <p style="margin: 5px 0 0; color: #4a5568; font-size: 15px;">${data.organizationName}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0;">
                                        <strong style="color: #1a365d; font-size: 14px;">Role:</strong>
                                        <p style="margin: 5px 0 0; color: #4a5568; font-size: 15px;">${data.role}</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="text-align: center;">
                            <a href="mailto:${data.businessEmail}" style="display: inline-block; background-color: #1a365d; color: #ffffff; padding: 14px 30px; text-decoration: none; border-radius: 25px; font-weight: 600; font-size: 14px;">
                                Reply to ${data.firstName}
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td style="background-color: #f8fafc; padding: 25px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
                <p style="color: #718096; font-size: 12px; margin: 0;">
                    This email was sent from the contact form at<br>
                    <strong>Sina Consulting Services</strong>
                </p>
                <p style="color: #a0aec0; font-size: 11px; margin: 10px 0 0;">
                    Submitted on: ${new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' })}
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
};

module.exports = contactTemplate;
