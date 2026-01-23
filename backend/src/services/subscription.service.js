const emailService = require('./email.service');
const { subscriptionOwnerTemplate, subscriptionApplicantTemplate } = require('../templates/subscription.template');
const config = require('../config');

class SubscriptionService {
  async processSubscription(data, passportPhoto) {
    // Extract all form fields
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

    // Format full name
    const fullName = `${title || ''} ${surname || ''} ${middleName || ''} ${otherNames || ''}`.trim();

    // Format spouse name
    const spouseName = `${spouseSurname || ''} ${spouseFirstName || ''}`.trim();

    // Format next of kin name
    const nokFullName = `${nokSurname || ''} ${nokFirstName || ''}`.trim();

    // Determine nationality display
    const nationalityDisplay = nationality === 'Others' ? otherNationality : nationality;

    // Determine country display
    const countryDisplay = countryOfResidence === 'Others' ? otherCountry : countryOfResidence;

    // Log subscription details for debugging
    console.log('📋 Processing subscription for:', fullName);
    console.log('   Email:', email);
    console.log('   Phone:', phoneNumber1, phoneNumber2 ? `/ ${phoneNumber2}` : '');
    console.log('   NIN:', nin);
    console.log('   DOB:', dob);
    console.log('   Sex:', sex);
    console.log('   Marital Status:', maritalStatus);
    console.log('   Spouse:', spouseName || 'N/A');
    console.log('   Nationality:', nationalityDisplay);
    console.log('   Occupation:', occupation);
    console.log('   Employer:', employerName);
    console.log('   Address:', residentialAddress, cityTown, lga, state, postalCode);
    console.log('   Country:', countryDisplay);
    console.log('   Language:', language);
    console.log('   Next of Kin:', nokFullName);
    console.log('   NOK Phone:', nokPhoneNumber1, nokPhoneNumber2 ? `/ ${nokPhoneNumber2}` : '');
    console.log('   NOK Address:', nokAddress, nokCityTown, nokLga);
    console.log('   Acres:', noOfAcres);
    console.log('   Payment Plan:', paymentPlan);
    console.log('   Signature Date:', signatureDate);
    console.log('   Final Date:', finalDate);
    console.log('   Mode of Payment:', modeOfPayment);
    console.log('   Bank Details:', accountName, accountNumber, bank);
    console.log('   Referral:', referredBy, referralDateFull, referralPhone, referralCid);
    console.log('   Has Signature:', !!signature);
    console.log('   Has Passport Photo:', !!passportPhoto);

    // Prepare email for admin with all data
    const ownerHtml = subscriptionOwnerTemplate(data, passportPhoto);

    const attachments = [];

    // Add passport photo if provided - both embedded (cid) and as downloadable attachment
    if (passportPhoto) {
      // Embedded version for display in email
      attachments.push({
        filename: `passport_${surname || 'photo'}_${Date.now()}.${passportPhoto.mimetype.split('/')[1] || 'jpg'}`,
        content: passportPhoto.buffer,
        contentType: passportPhoto.mimetype,
        cid: 'passport_photo' // For embedding in email body
      });
    }

    // Add signature if provided (convert base64 to buffer)
    if (signature) {
      const signatureBase64 = signature.replace(/^data:image\/\w+;base64,/, '');
      const signatureBuffer = Buffer.from(signatureBase64, 'base64');
      attachments.push({
        filename: `signature_${surname || 'subscriber'}_${Date.now()}.png`,
        content: signatureBuffer,
        contentType: 'image/png',
        cid: 'signature_image' // For embedding in email body
      });
    }

    // Subscription admin email - receives all subscription notifications
    const subscriptionAdminEmail = config.EMAIL.SUBSCRIPTION_ADMIN || 'adabafarmresortsubscription@kazfieldisl.com';

    console.log('📧 Subscription admin email recipient:', subscriptionAdminEmail);

    const ownerMailOptions = {
      from: config.EMAIL.FROM_SUBSCRIPTION || config.EMAIL.FROM_SERVICE,
      to: subscriptionAdminEmail,
      subject: `🥥 New Farm Subscription: ${fullName} - ${noOfAcres} Acre(s) - ${paymentPlan}`,
      html: ownerHtml,
      attachments
    };

    // Prepare confirmation email for subscriber with comprehensive details
    const applicantHtml = subscriptionApplicantTemplate({
      name: fullName,
      email,
      phone: phoneNumber1,
      noOfAcres,
      paymentPlan,
      signatureDate,
      address: `${residentialAddress || ''}, ${cityTown || ''}, ${state || ''}`.replace(/^, |, $/g, ''),
      nationality: nationalityDisplay,
      nokName: nokFullName,
      nokPhone: nokPhoneNumber1
    });

    const applicantMailOptions = {
      from: config.EMAIL.FROM_SERVICE,
      to: email,
      subject: `Subscription Confirmed - Àdàbà Farm and Resort (${noOfAcres} Acre${noOfAcres > 1 ? 's' : ''})`,
      html: applicantHtml
    };

    // Send emails in parallel
    console.log('📧 Sending emails...');
    await Promise.all([
      emailService.sendMail(ownerMailOptions),
      emailService.sendMail(applicantMailOptions)
    ]);
    console.log('✅ Emails sent successfully');

    return {
      success: true,
      message: 'Subscription submitted successfully',
      data: {
        subscriber: fullName,
        email,
        acres: noOfAcres,
        paymentPlan
      }
    };
  }
}

module.exports = new SubscriptionService();
