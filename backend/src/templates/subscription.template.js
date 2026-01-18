/**
 * Subscription Email Templates
 * Responsive HTML email templates for admin and subscriber notifications
 */

exports.subscriptionOwnerTemplate = (data, passportPhoto) => {
  const {
    title, surname, middleName, otherNames, nin, maritalStatus,
    dob, sex, spouseSurname, spouseFirstName, nationality, otherNationality,
    occupation, employerName, residentialAddress, cityTown, lga, state,
    postalCode, countryOfResidence, otherCountry, language, email,
    phoneNumber1, phoneNumber2, nokSurname, nokFirstName, nokAddress,
    nokCityTown, nokLga, nokPhoneNumber1, nokPhoneNumber2, noOfAcres,
    paymentPlan, signatureDate, finalDate, referredBy, referralDateFull, referralPhone,
    referralCid, modeOfPayment, accountName, accountNumber, bank, signature
  } = data;

  const fullName = `${title || ''} ${surname || ''} ${middleName || ''} ${otherNames || ''}`.trim();

  // Format date - handles both string dates and object dates
  const formatDate = (dateValue) => {
    if (!dateValue) return 'Not provided';
    if (typeof dateValue === 'string') {
      // Handle YYYY-MM-DD format
      const parts = dateValue.split('-');
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
      return dateValue;
    }
    if (typeof dateValue === 'object' && dateValue.full) {
      return formatDate(dateValue.full);
    }
    return 'Not provided';
  };

  const submissionDate = new Date();
  const formattedSubmissionDate = submissionDate.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const formattedSubmissionTime = submissionDate.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>New Farm Subscription - ${fullName}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    /* Reset styles */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }

    /* Base styles */
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333333;
      background-color: #f4f7f0;
      margin: 0;
      padding: 0;
      width: 100%;
    }

    /* Container */
    .email-wrapper {
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      background-color: #ffffff;
    }

    /* Header */
    .header {
      background: linear-gradient(135deg, #2d5016 0%, #4a7c23 100%);
      color: #ffffff;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      font-size: 24px;
      font-weight: 700;
      margin: 0 0 8px 0;
      letter-spacing: 0.5px;
    }
    .header p {
      font-size: 14px;
      margin: 4px 0;
      opacity: 0.95;
    }

    /* Quick Summary Banner */
    .summary-banner {
      background: linear-gradient(90deg, #f7941d 0%, #ffc107 100%);
      padding: 20px;
      text-align: center;
    }
    .summary-banner h2 {
      color: #ffffff;
      font-size: 18px;
      margin: 0 0 15px 0;
      text-shadow: 0 1px 2px rgba(0,0,0,0.2);
    }
    .summary-stats {
      display: inline-block;
    }
    .stat-item {
      display: inline-block;
      background: rgba(255,255,255,0.95);
      padding: 12px 25px;
      margin: 5px 10px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .stat-label {
      font-size: 11px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: block;
    }
    .stat-value {
      font-size: 20px;
      font-weight: 700;
      color: #2d5016;
      display: block;
      margin-top: 4px;
    }

    /* Content */
    .content {
      padding: 30px 25px;
    }

    /* Section */
    .section {
      margin-bottom: 25px;
      border: 1px solid #e8e8e8;
      border-radius: 10px;
      overflow: hidden;
    }
    .section-header {
      background: linear-gradient(90deg, #2d5016 0%, #3d6b1f 100%);
      color: #ffffff;
      padding: 12px 20px;
      font-size: 15px;
      font-weight: 600;
      letter-spacing: 0.3px;
    }
    .section-body {
      padding: 20px;
      background: #fafcf8;
    }

    /* Field Grid - Table-based for email compatibility */
    .field-table {
      width: 100%;
      border-collapse: collapse;
    }
    .field-table td {
      padding: 8px 12px;
      vertical-align: top;
      border-bottom: 1px solid #eee;
    }
    .field-table tr:last-child td {
      border-bottom: none;
    }
    .field-label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 600;
      width: 35%;
      background: #f5f8f2;
    }
    .field-value {
      font-size: 14px;
      color: #333;
      font-weight: 500;
    }
    .field-value.highlight {
      color: #2d5016;
      font-weight: 700;
      font-size: 16px;
    }

    /* Images Section */
    .images-section {
      background: #ffffff;
      border: 2px dashed #2d5016;
      border-radius: 12px;
      padding: 25px;
      margin: 25px 0;
      text-align: center;
    }
    .images-section h3 {
      color: #2d5016;
      font-size: 16px;
      margin: 0 0 20px 0;
    }
    .image-container {
      display: inline-block;
      margin: 10px 15px;
      vertical-align: top;
    }
    .image-label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 10px;
      display: block;
    }
    .passport-img {
      max-width: 150px;
      max-height: 180px;
      border: 3px solid #2d5016;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .signature-img {
      max-width: 250px;
      max-height: 100px;
      border: 2px solid #ddd;
      border-radius: 6px;
      background: #fff;
      padding: 8px;
    }

    /* Alert Box */
    .alert-box {
      padding: 15px 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .alert-warning {
      background: #fff8e6;
      border-left: 4px solid #f7941d;
    }
    .alert-info {
      background: #e8f4fd;
      border-left: 4px solid #2196f3;
    }
    .alert-box p {
      margin: 0;
      font-size: 14px;
      color: #555;
    }

    /* Footer */
    .footer {
      background: #c41e3a;
      color: #ffffff;
      padding: 25px 20px;
      text-align: center;
    }
    .footer p {
      font-size: 12px;
      margin: 5px 0;
      opacity: 0.95;
    }
    .footer a {
      color: #ffffff;
      text-decoration: underline;
    }

    /* Timestamp */
    .timestamp {
      text-align: center;
      padding: 15px;
      background: #f8f8f8;
      border-top: 1px solid #e0e0e0;
      font-size: 12px;
      color: #888;
    }

    /* Mobile Responsive */
    @media screen and (max-width: 600px) {
      .email-wrapper {
        width: 100% !important;
      }
      .header {
        padding: 25px 15px !important;
      }
      .header h1 {
        font-size: 20px !important;
      }
      .content {
        padding: 20px 15px !important;
      }
      .stat-item {
        display: block !important;
        margin: 8px 0 !important;
      }
      .field-label {
        width: 40% !important;
        font-size: 11px !important;
      }
      .field-value {
        font-size: 13px !important;
      }
      .image-container {
        display: block !important;
        margin: 15px 0 !important;
      }
      .passport-img {
        max-width: 120px !important;
      }
      .signature-img {
        max-width: 200px !important;
      }
    }
  </style>
</head>
<body>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7f0;">
    <tr>
      <td align="center" style="padding: 30px 10px;">

        <!-- Main Email Container -->
        <table role="presentation" class="email-wrapper" width="700" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td class="header">
              <h1>🥥 New Farm Subscription</h1>
              <p style="font-size: 16px; font-weight: 600;">Àdàbà Farm and Resort</p>
              <p>First Hybrid Coconut Farm • Owode LGA, Ogun State</p>
            </td>
          </tr>

          <!-- Quick Summary Banner -->
          <tr>
            <td class="summary-banner">
              <h2>📋 Subscription Summary</h2>
              <table role="presentation" align="center" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="stat-item">
                    <span class="stat-label">Subscriber</span>
                    <span class="stat-value">${fullName || 'N/A'}</span>
                  </td>
                  <td class="stat-item">
                    <span class="stat-label">Acres</span>
                    <span class="stat-value">${noOfAcres || 'N/A'}</span>
                  </td>
                  <td class="stat-item">
                    <span class="stat-label">Payment Plan</span>
                    <span class="stat-value">${paymentPlan || 'N/A'}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="content">

              <!-- Images Section -->
              ${passportPhoto || signature ? `
              <div class="images-section">
                <h3>📷 Uploaded Documents</h3>
                <table role="presentation" align="center" cellpadding="0" cellspacing="0">
                  <tr>
                    ${passportPhoto ? `
                    <td class="image-container">
                      <span class="image-label">Passport Photo</span>
                      <img src="cid:passport_photo" alt="Passport Photo" class="passport-img" />
                    </td>
                    ` : ''}
                    ${signature ? `
                    <td class="image-container">
                      <span class="image-label">Digital Signature</span>
                      <img src="cid:signature_image" alt="Signature" class="signature-img" />
                    </td>
                    ` : ''}
                  </tr>
                </table>
              </div>
              ` : ''}

              <!-- Subscriber's Information -->
              <div class="section">
                <div class="section-header">👤 Subscriber's Information</div>
                <div class="section-body">
                  <table class="field-table" role="presentation">
                    <tr>
                      <td class="field-label">Full Name</td>
                      <td class="field-value highlight">${fullName || 'Not provided'}</td>
                    </tr>
                    <tr>
                      <td class="field-label">NIN</td>
                      <td class="field-value">${nin || 'Not provided'}</td>
                    </tr>
                    <tr>
                      <td class="field-label">Date of Birth</td>
                      <td class="field-value">${formatDate(dob)}</td>
                    </tr>
                    <tr>
                      <td class="field-label">Sex</td>
                      <td class="field-value">${sex || 'Not provided'}</td>
                    </tr>
                    <tr>
                      <td class="field-label">Marital Status</td>
                      <td class="field-value">${maritalStatus || 'Not provided'}</td>
                    </tr>
                    ${spouseSurname || spouseFirstName ? `
                    <tr>
                      <td class="field-label">Spouse Name</td>
                      <td class="field-value">${spouseSurname || ''} ${spouseFirstName || ''}</td>
                    </tr>
                    ` : ''}
                    <tr>
                      <td class="field-label">Nationality</td>
                      <td class="field-value">${nationality === 'Others' ? otherNationality : (nationality || 'Not provided')}</td>
                    </tr>
                    <tr>
                      <td class="field-label">Occupation</td>
                      <td class="field-value">${occupation || 'Not provided'}</td>
                    </tr>
                    <tr>
                      <td class="field-label">Employer</td>
                      <td class="field-value">${employerName || 'Not provided'}</td>
                    </tr>
                  </table>
                </div>
              </div>

              <!-- Contact Information -->
              <div class="section">
                <div class="section-header">📞 Contact Information</div>
                <div class="section-body">
                  <table class="field-table" role="presentation">
                    <tr>
                      <td class="field-label">Email</td>
                      <td class="field-value highlight">${email || 'Not provided'}</td>
                    </tr>
                    <tr>
                      <td class="field-label">Phone Number(s)</td>
                      <td class="field-value">${phoneNumber1 || ''}${phoneNumber2 ? ', ' + phoneNumber2 : ''}</td>
                    </tr>
                    <tr>
                      <td class="field-label">Address</td>
                      <td class="field-value">${residentialAddress || 'Not provided'}</td>
                    </tr>
                    <tr>
                      <td class="field-label">City/Town</td>
                      <td class="field-value">${cityTown || 'Not provided'}</td>
                    </tr>
                    <tr>
                      <td class="field-label">L.G.A</td>
                      <td class="field-value">${lga || 'Not provided'}</td>
                    </tr>
                    <tr>
                      <td class="field-label">State</td>
                      <td class="field-value">${state || 'Not provided'}</td>
                    </tr>
                    <tr>
                      <td class="field-label">Postal Code</td>
                      <td class="field-value">${postalCode || 'Not provided'}</td>
                    </tr>
                    <tr>
                      <td class="field-label">Country</td>
                      <td class="field-value">${countryOfResidence === 'Others' ? otherCountry : (countryOfResidence || 'Not provided')}</td>
                    </tr>
                    <tr>
                      <td class="field-label">Language</td>
                      <td class="field-value">${language || 'Not provided'}</td>
                    </tr>
                  </table>
                </div>
              </div>

              <!-- Next of Kin -->
              <div class="section">
                <div class="section-header">👨‍👩‍👧 Next of Kin</div>
                <div class="section-body">
                  <table class="field-table" role="presentation">
                    <tr>
                      <td class="field-label">Name</td>
                      <td class="field-value">${nokSurname || ''} ${nokFirstName || ''}</td>
                    </tr>
                    <tr>
                      <td class="field-label">Phone Number(s)</td>
                      <td class="field-value">${nokPhoneNumber1 || ''}${nokPhoneNumber2 ? ', ' + nokPhoneNumber2 : ''}</td>
                    </tr>
                    <tr>
                      <td class="field-label">Address</td>
                      <td class="field-value">${nokAddress || 'Not provided'}</td>
                    </tr>
                    <tr>
                      <td class="field-label">City/Town</td>
                      <td class="field-value">${nokCityTown || 'Not provided'}</td>
                    </tr>
                    <tr>
                      <td class="field-label">L.G.A</td>
                      <td class="field-value">${nokLga || 'Not provided'}</td>
                    </tr>
                  </table>
                </div>
              </div>

              <!-- Investment Details -->
              <div class="section">
                <div class="section-header" style="background: linear-gradient(90deg, #f7941d 0%, #ffa726 100%);">💰 Investment Details</div>
                <div class="section-body" style="background: #fffbf0;">
                  <table class="field-table" role="presentation">
                    <tr>
                      <td class="field-label">Number of Acres</td>
                      <td class="field-value highlight" style="font-size: 22px; color: #2d5016;">${noOfAcres || 'Not specified'}</td>
                    </tr>
                    <tr>
                      <td class="field-label">Payment Plan</td>
                      <td class="field-value highlight" style="font-size: 18px; color: #f7941d;">${paymentPlan || 'Not specified'}</td>
                    </tr>
                    <tr>
                      <td class="field-label">Signature Date</td>
                      <td class="field-value">${formatDate(signatureDate)}</td>
                    </tr>
                    <tr>
                      <td class="field-label">Final Date</td>
                      <td class="field-value">${formatDate(finalDate)}</td>
                    </tr>
                    ${modeOfPayment ? `
                    <tr>
                      <td class="field-label">Mode of Payment at Maturity</td>
                      <td class="field-value">${modeOfPayment}</td>
                    </tr>
                    ` : ''}
                  </table>

                  ${accountName || accountNumber || bank ? `
                  <div style="margin-top: 15px; padding-top: 15px; border-top: 1px dashed #ddd;">
                    <table class="field-table" role="presentation">
                      <tr>
                        <td class="field-label">Account Name</td>
                        <td class="field-value">${accountName || 'Not provided'}</td>
                      </tr>
                      <tr>
                        <td class="field-label">Account Number</td>
                        <td class="field-value">${accountNumber || 'Not provided'}</td>
                      </tr>
                      <tr>
                        <td class="field-label">Bank</td>
                        <td class="field-value">${bank || 'Not provided'}</td>
                      </tr>
                    </table>
                  </div>
                  ` : ''}
                </div>
              </div>

              ${referredBy ? `
              <!-- Referral Information -->
              <div class="section">
                <div class="section-header" style="background: linear-gradient(90deg, #9c27b0 0%, #ba68c8 100%);">🤝 Referral Information</div>
                <div class="section-body" style="background: #faf5fc;">
                  <table class="field-table" role="presentation">
                    <tr>
                      <td class="field-label">Referred By</td>
                      <td class="field-value highlight">${referredBy}</td>
                    </tr>
                    <tr>
                      <td class="field-label">Referral Date</td>
                      <td class="field-value">${formatDate(referralDateFull)}</td>
                    </tr>
                    ${referralPhone ? `
                    <tr>
                      <td class="field-label">Referral Phone</td>
                      <td class="field-value">${referralPhone}</td>
                    </tr>
                    ` : ''}
                    ${referralCid ? `
                    <tr>
                      <td class="field-label">Referral CID</td>
                      <td class="field-value">${referralCid}</td>
                    </tr>
                    ` : ''}
                  </table>
                </div>
              </div>
              ` : ''}

              <!-- Important Note -->
              <div class="alert-box alert-warning">
                <p><strong>💡 Pricing Note:</strong> N200,000 is for documentation and N500,000 is for land preparation, seedling, and cultivation per acre.</p>
              </div>

            </td>
          </tr>

          <!-- Timestamp -->
          <tr>
            <td class="timestamp">
              <p>📅 Submitted on <strong>${formattedSubmissionDate}</strong> at <strong>${formattedSubmissionTime}</strong></p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer">
              <p style="font-size: 14px; font-weight: 600; margin-bottom: 10px;">KAZFIELD INTEGRATED SERVICES LTD</p>
              <p>📍 4, Oluwole Agbede Street, Off Idowu Dabiri Road, Behind Blenco Supermarket, Sangotedo Lagos</p>
              <p>📞 09077324522, 08024112949 | ✉️ info.kazfield@gmail.com</p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`;
};

exports.subscriptionApplicantTemplate = ({ name, email, phone, noOfAcres, paymentPlan, signatureDate, address, nationality, nokName, nokPhone }) => {
  const submissionDate = new Date();
  const formattedDate = submissionDate.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Format signature date if provided
  const formatDate = (dateValue) => {
    if (!dateValue) return null;
    if (typeof dateValue === 'string') {
      const parts = dateValue.split('-');
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
      return dateValue;
    }
    return null;
  };

  const formattedSignatureDate = formatDate(signatureDate);

  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>Subscription Confirmed - Àdàbà Farm and Resort</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333333;
      background-color: #f4f7f0;
      margin: 0;
      padding: 0;
    }

    .email-wrapper {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }

    .header {
      background: linear-gradient(135deg, #2d5016 0%, #4a7c23 100%);
      color: #ffffff;
      padding: 35px 25px;
      text-align: center;
    }
    .header h1 {
      font-size: 26px;
      margin: 0 0 8px 0;
    }
    .header p {
      font-size: 14px;
      opacity: 0.9;
      margin: 4px 0;
    }

    .content {
      padding: 30px 25px;
    }

    .greeting {
      font-size: 18px;
      color: #333;
      margin-bottom: 20px;
    }
    .greeting strong {
      color: #2d5016;
    }

    .success-banner {
      background: linear-gradient(90deg, #4caf50 0%, #66bb6a 100%);
      color: #ffffff;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
      margin: 20px 0;
    }
    .success-banner h2 {
      margin: 0 0 8px 0;
      font-size: 20px;
    }
    .success-banner p {
      margin: 0;
      font-size: 14px;
      opacity: 0.95;
    }

    .details-card {
      background: #f8faf5;
      border: 1px solid #e0e8d8;
      border-radius: 10px;
      padding: 25px;
      margin: 20px 0;
    }
    .details-card h3 {
      color: #2d5016;
      font-size: 16px;
      margin: 0 0 15px 0;
      padding-bottom: 10px;
      border-bottom: 2px solid #2d5016;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #e8e8e8;
    }
    .detail-row:last-child {
      border-bottom: none;
    }
    .detail-label {
      color: #666;
      font-size: 14px;
    }
    .detail-value {
      color: #333;
      font-weight: 600;
      font-size: 14px;
    }
    .detail-value.highlight {
      color: #2d5016;
      font-size: 16px;
    }

    .info-box {
      background: #ffffff;
      border-radius: 10px;
      padding: 20px;
      margin: 20px 0;
      border-left: 4px solid #2d5016;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    .info-box h3 {
      color: #2d5016;
      font-size: 15px;
      margin: 0 0 12px 0;
    }
    .info-box ol {
      margin: 0;
      padding-left: 20px;
      color: #555;
    }
    .info-box ol li {
      margin: 8px 0;
      font-size: 14px;
    }

    .bank-section {
      background: linear-gradient(135deg, #fff8e6 0%, #fff3cd 100%);
      border: 1px solid #f7941d;
      border-radius: 10px;
      padding: 25px;
      margin: 25px 0;
    }
    .bank-section h3 {
      color: #b47100;
      font-size: 16px;
      margin: 0 0 15px 0;
      text-align: center;
    }
    .bank-card {
      background: #ffffff;
      border-radius: 8px;
      padding: 15px;
      margin: 10px 0;
      text-align: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.08);
    }
    .bank-name {
      font-size: 13px;
      color: #666;
      margin-bottom: 5px;
    }
    .bank-number {
      font-size: 22px;
      font-weight: 700;
      color: #2d5016;
      letter-spacing: 1px;
    }
    .account-name {
      font-size: 12px;
      color: #888;
      margin-top: 5px;
    }

    .alert-box {
      background: #fff8e6;
      border-left: 4px solid #f7941d;
      padding: 15px 20px;
      border-radius: 6px;
      margin: 20px 0;
    }
    .alert-box p {
      margin: 0;
      font-size: 14px;
      color: #665200;
    }

    .cta-section {
      text-align: center;
      padding: 20px 0;
    }
    .cta-section p {
      color: #666;
      font-size: 14px;
    }

    .footer {
      background: #c41e3a;
      color: #ffffff;
      padding: 25px 20px;
      text-align: center;
    }
    .footer p {
      font-size: 12px;
      margin: 5px 0;
      opacity: 0.95;
    }

    @media screen and (max-width: 480px) {
      .header { padding: 25px 15px !important; }
      .header h1 { font-size: 22px !important; }
      .content { padding: 20px 15px !important; }
      .bank-number { font-size: 18px !important; }
    }
  </style>
</head>
<body>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7f0;">
    <tr>
      <td align="center" style="padding: 30px 10px;">

        <table role="presentation" class="email-wrapper" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td class="header">
              <h1>🥥 Subscription Confirmed!</h1>
              <p style="font-size: 16px; font-weight: 600;">Àdàbà Farm and Resort</p>
              <p>First Hybrid Coconut Farm • Owode LGA, Ogun State</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="content">

              <p class="greeting">Hello <strong>${name}</strong>,</p>

              <p style="font-size: 15px; color: #555; margin-bottom: 20px;">
                Thank you for subscribing to <strong>Àdàbà Farm and Resort</strong> - Nigeria's First Hybrid Coconut Farm! We have successfully received your subscription application.
              </p>

              <!-- Success Banner -->
              <div class="success-banner">
                <h2>✅ Application Received</h2>
                <p>Your subscription has been submitted for processing</p>
              </div>

              <!-- Subscription Details -->
              <div class="details-card">
                <h3>📋 Your Subscription Details</h3>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td class="detail-label" style="padding: 10px 0; border-bottom: 1px solid #e8e8e8;">Email</td>
                    <td class="detail-value" style="padding: 10px 0; border-bottom: 1px solid #e8e8e8; text-align: right;">${email}</td>
                  </tr>
                  <tr>
                    <td class="detail-label" style="padding: 10px 0; border-bottom: 1px solid #e8e8e8;">Phone</td>
                    <td class="detail-value" style="padding: 10px 0; border-bottom: 1px solid #e8e8e8; text-align: right;">${phone || 'N/A'}</td>
                  </tr>
                  ${address ? `
                  <tr>
                    <td class="detail-label" style="padding: 10px 0; border-bottom: 1px solid #e8e8e8;">Address</td>
                    <td class="detail-value" style="padding: 10px 0; border-bottom: 1px solid #e8e8e8; text-align: right;">${address}</td>
                  </tr>
                  ` : ''}
                  ${nationality ? `
                  <tr>
                    <td class="detail-label" style="padding: 10px 0; border-bottom: 1px solid #e8e8e8;">Nationality</td>
                    <td class="detail-value" style="padding: 10px 0; border-bottom: 1px solid #e8e8e8; text-align: right;">${nationality}</td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td class="detail-label" style="padding: 10px 0; border-bottom: 1px solid #e8e8e8;">Number of Acres</td>
                    <td class="detail-value highlight" style="padding: 10px 0; border-bottom: 1px solid #e8e8e8; text-align: right; color: #2d5016; font-size: 18px;">${noOfAcres || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td class="detail-label" style="padding: 10px 0; border-bottom: 1px solid #e8e8e8;">Payment Plan</td>
                    <td class="detail-value highlight" style="padding: 10px 0; border-bottom: 1px solid #e8e8e8; text-align: right; color: #f7941d;">${paymentPlan || 'N/A'}</td>
                  </tr>
                  ${formattedSignatureDate ? `
                  <tr>
                    <td class="detail-label" style="padding: 10px 0; border-bottom: 1px solid #e8e8e8;">Signature Date</td>
                    <td class="detail-value" style="padding: 10px 0; border-bottom: 1px solid #e8e8e8; text-align: right;">${formattedSignatureDate}</td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td class="detail-label" style="padding: 10px 0;">Submission Date</td>
                    <td class="detail-value" style="padding: 10px 0; text-align: right;">${formattedDate}</td>
                  </tr>
                </table>
              </div>

              <!-- Next of Kin Info -->
              ${nokName ? `
              <div class="details-card" style="background: #f5f8fc; border-color: #d0e0f0;">
                <h3>👨‍👩‍👧 Next of Kin on Record</h3>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td class="detail-label" style="padding: 10px 0; border-bottom: 1px solid #e8e8e8;">Name</td>
                    <td class="detail-value" style="padding: 10px 0; border-bottom: 1px solid #e8e8e8; text-align: right;">${nokName}</td>
                  </tr>
                  ${nokPhone ? `
                  <tr>
                    <td class="detail-label" style="padding: 10px 0;">Phone</td>
                    <td class="detail-value" style="padding: 10px 0; text-align: right;">${nokPhone}</td>
                  </tr>
                  ` : ''}
                </table>
              </div>
              ` : ''}

              <!-- Next Steps -->
              <div class="info-box">
                <h3>📌 What Happens Next?</h3>
                <ol>
                  <li>Our team will review your subscription details</li>
                  <li>You will receive payment confirmation within 24-48 hours</li>
                  <li>We'll send you the farm allocation details</li>
                  <li>Expect regular updates on your coconut farm progress</li>
                </ol>
              </div>

              <!-- Bank Details -->
              <div class="bank-section">
                <h3>💳 Payment Account Details</h3>

                <div class="bank-card">
                  <div class="bank-name">STERLING BANK</div>
                  <div class="bank-number">0500876289</div>
                  <div class="account-name">KAZFIELD INTEGRATED SERVICES</div>
                </div>

                <div class="bank-card">
                  <div class="bank-name">FCMB</div>
                  <div class="bank-number">5626752011</div>
                  <div class="account-name">KAZFIELD INTEGRATED SERVICES</div>
                </div>

                <div class="bank-card">
                  <div class="bank-name">FCMB (Dollar Account)</div>
                  <div class="bank-number">2007301592</div>
                  <div class="account-name">KAZFIELD INTEGRATED SERVICES</div>
                </div>
              </div>

              <!-- Important Note -->
              <div class="alert-box">
                <p><strong>💡 Important:</strong> N200,000 is for documentation and N500,000 is for land preparation, seedling, and cultivation per acre.</p>
              </div>

              <!-- CTA Section -->
              <div class="cta-section">
                <p>Questions? Contact us at <strong>09077324522</strong> or <strong>08024112949</strong></p>
                <p style="margin-top: 15px; font-size: 16px; color: #2d5016;"><strong>Thank you for investing in your future! 🌴</strong></p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer">
              <p style="font-size: 14px; font-weight: 600; margin-bottom: 10px;">KAZFIELD INTEGRATED SERVICES LTD</p>
              <p>📍 4, Oluwole Agbede Street, Off Idowu Dabiri Road</p>
              <p>Behind Blenco Supermarket, Sangotedo Lagos</p>
              <p style="margin-top: 10px;">📞 09077324522, 08024112949</p>
              <p>✉️ info.kazfield@gmail.com</p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`;
};
