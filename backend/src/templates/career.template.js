const config = require('../config');

const careerOwnerTemplate = (data, cvFile) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Career Application</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <tr>
            <td style="background: linear-gradient(135deg, #1a365d 0%, #2d5a87 100%); padding: 30px 40px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">
                    🎯 New Career Application
                </h1>
                <p style="color: #a0d2db; margin: 10px 0 0; font-size: 14px;">
                    Someone wants to join your team!
                </p>
            </td>
        </tr>
        <tr>
            <td style="padding: 40px;">
                <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                    A new candidate has submitted their application through the career page.
                </p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 8px; margin-bottom: 25px;">
                    <tr>
                        <td style="padding: 25px;">
                            <h2 style="color: #1a365d; font-size: 18px; margin: 0 0 20px; padding-bottom: 15px; border-bottom: 2px solid #2d5a87;">
                                Applicant Details
                            </h2>
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                                        <strong style="color: #1a365d; font-size: 14px;">Full Name:</strong>
                                        <p style="margin: 5px 0 0; color: #4a5568; font-size: 15px;">${data.fullName}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                                        <strong style="color: #1a365d; font-size: 14px;">Email Address:</strong>
                                        <p style="margin: 5px 0 0; color: #4a5568; font-size: 15px;">
                                            <a href="mailto:${data.emailAddress}" style="color: #2d5a87; text-decoration: none;">${data.emailAddress}</a>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                                        <strong style="color: #1a365d; font-size: 14px;">Contact Number:</strong>
                                        <p style="margin: 5px 0 0; color: #4a5568; font-size: 15px;">${data.contactNumber}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0;">
                                        <strong style="color: #1a365d; font-size: 14px;">Location:</strong>
                                        <p style="margin: 5px 0 0; color: #4a5568; font-size: 15px;">${data.location}</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#eef6ff;border-radius:8px;border-left:4px solid #2d5a87;margin-bottom:25px;">
                  <tr>
                    <td style="padding:20px;">
                      <p style="color:#1a365d;font-size:14px;margin:0 0 10px;">
                        📎 <strong>CV Attached</strong>
                      </p>
                      ${cvFile ? `
                        <p style="margin:0 0 12px;font-size:13px;color:#4a5568;">
                          File: <strong>${cvFile.originalname}</strong>
                        </p>
                      ` : `
                        <p style="margin:0;font-size:13px;color:#718096;">
                          No CV uploaded.
                        </p>
                      `}
                    </td>
                  </tr>
                </table>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="text-align: center;">
                            <a href="mailto:${data.emailAddress}" style="display: inline-block; background-color: #1a365d; color: #ffffff; padding: 14px 30px; text-decoration: none; border-radius: 25px; font-weight: 600; font-size: 14px;">
                                Contact ${data.fullName.split(' ')[0]}
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td style="background-color: #f8fafc; padding: 25px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
                <p style="color: #718096; font-size: 12px; margin: 0;">
                    This application was submitted through the career page at<br>
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

const careerApplicantTemplate = (name) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Application Received</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <tr>
            <td style="background: linear-gradient(135deg, #1a365d 0%, #2d5a87 100%); padding: 30px 40px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">
                    Thank You for Your Application!
                </h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 40px;">
                <p style="color: #4a5568; font-size: 16px; line-height: 1.8; margin: 0 0 20px;">
                    Dear ${name},
                </p>
                <p style="color: #4a5568; font-size: 16px; line-height: 1.8; margin: 0 0 20px;">
                    Thank you for your interest in joining <strong>Sina Consulting Services</strong>. We have received your application and CV successfully.
                </p>
                <p style="color: #4a5568; font-size: 16px; line-height: 1.8; margin: 0 0 20px;">
                    Our team will review your application carefully. If your profile matches our requirements, we will be in touch with you shortly.
                </p>
                <p style="color: #4a5568; font-size: 16px; line-height: 1.8; margin: 0;">
                    Best regards,<br>
                    <strong>The Sina Consulting Services Team</strong>
                </p>
            </td>
        </tr>
        <tr>
            <td style="background-color: #f8fafc; padding: 25px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
                <p style="color: #718096; font-size: 12px; margin: 0;">
                    © ${new Date().getFullYear()} Sina Consulting Services. All rights reserved.
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
};

module.exports = { careerOwnerTemplate, careerApplicantTemplate };
