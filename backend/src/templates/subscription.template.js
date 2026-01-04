exports.subscriptionOwnerTemplate = (data, passportPhoto) => {
  const {
    title, surname, middleName, otherNames, nin, maritalStatus,
    dob, sex, spouseSurname, spouseFirstName, nationality, otherNationality,
    occupation, employerName, residentialAddress, cityTown, lga, state,
    postalCode, countryOfResidence, otherCountry, language, email,
    phoneNumber1, phoneNumber2, nokSurname, nokFirstName, nokAddress,
    nokCityTown, nokLga, nokPhoneNumber1, nokPhoneNumber2, noOfAcres,
    paymentPlan, signatureDate, referredBy, referralDate, referralPhone,
    referralCid, modeOfPayment, accountName, accountNumber, bank
  } = data;

  const fullName = `${title || ''} ${surname || ''} ${middleName || ''} ${otherNames || ''}`.trim();
  const formatDate = (dateObj) => {
    if (!dateObj) return 'Not provided';
    return `${dateObj.day || ''}/${dateObj.month || ''}/${dateObj.year || ''}`;
  };

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 800px; margin: 0 auto; padding: 20px; }
      .header { background: linear-gradient(135deg, #2d5016 0%, #4a7c23 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
      .header h1 { margin: 0; font-size: 28px; }
      .header p { margin: 5px 0 0; font-size: 14px; opacity: 0.9; }
      .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
      .section { margin-bottom: 25px; }
      .section-title { background: #2d5016; color: white; padding: 10px 15px; margin: 0 -30px 15px -30px; font-size: 16px; font-weight: 600; }
      .field-row { display: flex; gap: 20px; margin-bottom: 10px; }
      .field { flex: 1; }
      .field-label { font-weight: 600; color: #2d5016; font-size: 13px; margin-bottom: 3px; }
      .field-value { color: #333; font-size: 14px; }
      .passport-section { text-align: center; padding: 15px; background: #f8faf5; border-radius: 8px; }
      .footer { background: #c41e3a; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>🥥 New Farm Subscription</h1>
        <p>Àdàbà Farm and Resort - First Hybrid Coconut Farm</p>
        <p>Site Location: Owode LGA, Ogun State</p>
      </div>

      <div class="content">
        ${passportPhoto ? `
        <div class="passport-section">
          <h3 style="margin-top: 0; color: #2d5016;">Passport Photograph</h3>
          <img src="cid:${passportPhoto.originalname}" style="max-width: 200px; border: 2px solid #2d5016; border-radius: 8px;" alt="Passport Photo" />
        </div>
        ` : ''}

        <div class="section">
          <h2 class="section-title">Subscriber's Information</h2>
          <div class="field-row">
            <div class="field">
              <div class="field-label">Full Name</div>
              <div class="field-value">${fullName}</div>
            </div>
            <div class="field">
              <div class="field-label">NIN</div>
              <div class="field-value">${nin || 'Not provided'}</div>
            </div>
          </div>
          <div class="field-row">
            <div class="field">
              <div class="field-label">Date of Birth</div>
              <div class="field-value">${formatDate(dob)}</div>
            </div>
            <div class="field">
              <div class="field-label">Sex</div>
              <div class="field-value">${sex || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">Marital Status</div>
              <div class="field-value">${maritalStatus || 'Not provided'}</div>
            </div>
          </div>
          ${spouseSurname || spouseFirstName ? `
          <div class="field-row">
            <div class="field">
              <div class="field-label">Spouse Name</div>
              <div class="field-value">${spouseSurname || ''} ${spouseFirstName || ''}</div>
            </div>
          </div>
          ` : ''}
          <div class="field-row">
            <div class="field">
              <div class="field-label">Nationality</div>
              <div class="field-value">${nationality === 'Others' ? otherNationality : nationality}</div>
            </div>
            <div class="field">
              <div class="field-label">Occupation</div>
              <div class="field-value">${occupation || 'Not provided'}</div>
            </div>
          </div>
          <div class="field-row">
            <div class="field">
              <div class="field-label">Employer</div>
              <div class="field-value">${employerName || 'Not provided'}</div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">Contact Information</h2>
          <div class="field-row">
            <div class="field">
              <div class="field-label">Email</div>
              <div class="field-value">${email}</div>
            </div>
            <div class="field">
              <div class="field-label">Phone Numbers</div>
              <div class="field-value">${phoneNumber1}${phoneNumber2 ? ', ' + phoneNumber2 : ''}</div>
            </div>
          </div>
          <div class="field-row">
            <div class="field">
              <div class="field-label">Residential Address</div>
              <div class="field-value">${residentialAddress || 'Not provided'}</div>
            </div>
          </div>
          <div class="field-row">
            <div class="field">
              <div class="field-label">City/Town</div>
              <div class="field-value">${cityTown || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">L.G.A</div>
              <div class="field-value">${lga || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">State</div>
              <div class="field-value">${state || 'Not provided'}</div>
            </div>
          </div>
          <div class="field-row">
            <div class="field">
              <div class="field-label">Postal Code</div>
              <div class="field-value">${postalCode || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">Country of Residence</div>
              <div class="field-value">${countryOfResidence === 'Others' ? otherCountry : countryOfResidence}</div>
            </div>
            <div class="field">
              <div class="field-label">Language</div>
              <div class="field-value">${language || 'Not provided'}</div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">Next of Kin</h2>
          <div class="field-row">
            <div class="field">
              <div class="field-label">Name</div>
              <div class="field-value">${nokSurname || ''} ${nokFirstName || ''}</div>
            </div>
            <div class="field">
              <div class="field-label">Phone Numbers</div>
              <div class="field-value">${nokPhoneNumber1 || ''}${nokPhoneNumber2 ? ', ' + nokPhoneNumber2 : ''}</div>
            </div>
          </div>
          <div class="field-row">
            <div class="field">
              <div class="field-label">Address</div>
              <div class="field-value">${nokAddress || 'Not provided'}</div>
            </div>
          </div>
          <div class="field-row">
            <div class="field">
              <div class="field-label">City/Town</div>
              <div class="field-value">${nokCityTown || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">L.G.A</div>
              <div class="field-value">${nokLga || 'Not provided'}</div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">Investment Details</h2>
          <div class="field-row">
            <div class="field">
              <div class="field-label">Number of Acres</div>
              <div class="field-value" style="font-size: 18px; font-weight: 600; color: #2d5016;">${noOfAcres || 'Not specified'}</div>
            </div>
            <div class="field">
              <div class="field-label">Payment Plan</div>
              <div class="field-value" style="font-size: 18px; font-weight: 600; color: #2d5016;">${paymentPlan || 'Not specified'}</div>
            </div>
          </div>
          ${modeOfPayment ? `
          <div class="field-row">
            <div class="field">
              <div class="field-label">Mode of Payment at Maturity</div>
              <div class="field-value">${modeOfPayment}</div>
            </div>
          </div>
          ` : ''}
          ${accountName || accountNumber || bank ? `
          <div class="field-row">
            <div class="field">
              <div class="field-label">Account Name</div>
              <div class="field-value">${accountName || 'Not provided'}</div>
            </div>
          </div>
          <div class="field-row">
            <div class="field">
              <div class="field-label">Account Number</div>
              <div class="field-value">${accountNumber || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">Bank</div>
              <div class="field-value">${bank || 'Not provided'}</div>
            </div>
          </div>
          ` : ''}
        </div>

        ${referredBy ? `
        <div class="section">
          <h2 class="section-title">Referral Information</h2>
          <div class="field-row">
            <div class="field">
              <div class="field-label">Referred By</div>
              <div class="field-value">${referredBy}</div>
            </div>
            <div class="field">
              <div class="field-label">Referral Date</div>
              <div class="field-value">${formatDate(referralDate)}</div>
            </div>
          </div>
          ${referralPhone || referralCid ? `
          <div class="field-row">
            <div class="field">
              <div class="field-label">Referral Phone</div>
              <div class="field-value">${referralPhone || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">Referral CID</div>
              <div class="field-value">${referralCid || 'Not provided'}</div>
            </div>
          </div>
          ` : ''}
        </div>
        ` : ''}

        <div style="margin-top: 30px; padding: 15px; background: #fff3cd; border-left: 4px solid #ffcc00; border-radius: 4px;">
          <p style="margin: 0; color: #665200; font-size: 14px;">
            <strong>Note:</strong> N200,000 is for documentation and N500,000 is for land preparation, seedling, and cultivation per acre.
          </p>
        </div>

        <div style="margin-top: 20px; font-size: 12px; color: #777; text-align: center; padding-top: 15px; border-top: 1px solid #e0e0e0;">
          Submitted on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
        </div>
      </div>

      <div class="footer">
        <p style="margin: 0 0 5px;">Office Address: 4, Oluwole Agbede Street, Off Idowu Dabiri Road, Behind Blenco Supermarket, Sangotedo Lagos.</p>
        <p style="margin: 0;">Tel: 09077324522, 08024112949. Mail: info.kazfield@gmail.com</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

exports.subscriptionApplicantTemplate = ({ name, email, noOfAcres, paymentPlan }) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: linear-gradient(135deg, #2d5016 0%, #4a7c23 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
      .header h1 { margin: 0; font-size: 26px; }
      .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
      .highlight-box { background: #e6fff2; padding: 20px; border-radius: 8px; margin: 20px 0; }
      .info-box { background: #f8faf5; padding: 15px; border-radius: 6px; border-left: 4px solid #2d5016; margin: 15px 0; }
      .footer { background: #c41e3a; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; }
      .btn { display: inline-block; padding: 12px 30px; background: #2d5016; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>🥥 Subscription Confirmed!</h1>
        <p style="margin: 5px 0 0; opacity: 0.9;">Àdàbà Farm and Resort</p>
      </div>

      <div class="content">
        <p style="font-size: 16px;">Hello <strong>${name}</strong>,</p>

        <p>Thank you for subscribing to <strong>Àdàbà Farm and Resort</strong> - Nigeria's First Hybrid Coconut Farm!</p>

        <div class="highlight-box">
          <h3 style="margin-top: 0; color: #2d5016;">✅ Your Subscription Details</h3>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Number of Acres:</strong> ${noOfAcres || 'Not specified'}</p>
          <p><strong>Payment Plan:</strong> ${paymentPlan || 'Not specified'}</p>
        </div>

        <div class="info-box">
          <h3 style="margin-top: 0; color: #2d5016;">📋 What Happens Next?</h3>
          <ol style="margin-left: 20px; color: #333;">
            <li>Our team will review your subscription details</li>
            <li>You will receive payment confirmation within 24-48 hours</li>
            <li>We'll send you the farm allocation details</li>
            <li>Regular updates on your coconut farm progress</li>
          </ol>
        </div>

        <div class="info-box" style="border-left-color: #f7941d;">
          <h3 style="margin-top: 0; color: #2d5016;">💰 Payment Information</h3>
          <p><strong>STERLING BANK:</strong> 0500876289</p>
          <p><strong>FCMB:</strong> 5626752011</p>
          <p><strong>FCMB (Dollar Account):</strong> 2007301592</p>
          <p><strong>Account Name:</strong> KAZFIELD INTEGRATED SERVICES</p>
        </div>

        <div style="background: #fff3cd; padding: 15px; border-radius: 6px; border-left: 4px solid #ffcc00; margin: 20px 0;">
          <p style="margin: 0; color: #665200; font-size: 14px;">
            <strong>Important:</strong> N200,000 is for documentation and N500,000 is for land preparation, seedling, and cultivation per acre.
          </p>
        </div>

        <p style="margin-top: 25px;">If you have any questions, please don't hesitate to contact us.</p>

        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #666; font-size: 14px;">Thank you for investing in your future!</p>
        </div>
      </div>

      <div class="footer">
        <p style="margin: 0 0 5px;">Office Address: 4, Oluwole Agbede Street, Off Idowu Dabiri Road, Behind Blenco Supermarket, Sangotedo Lagos.</p>
        <p style="margin: 0;">Tel: 09077324522, 08024112949. Mail: info.kazfield@gmail.com</p>
      </div>
    </div>
  </body>
  </html>
  `;
};
