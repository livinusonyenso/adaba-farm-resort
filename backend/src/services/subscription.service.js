const emailService = require('./email.service');
const { subscriptionOwnerTemplate, subscriptionApplicantTemplate } = require('../templates/subscription.template');
const config = require('../config');

class SubscriptionService {
  async processSubscription(data, passportPhoto) {
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

    // Format full name
    const fullName = `${title || ''} ${surname || ''} ${middleName || ''} ${otherNames || ''}`.trim();

    // Prepare email for owner
    const ownerHtml = subscriptionOwnerTemplate(data, passportPhoto);

    const attachments = [];

    // Add passport photo if provided
    if (passportPhoto) {
      attachments.push({
        filename: passportPhoto.originalname || 'passport.jpg',
        content: passportPhoto.buffer, // Using buffer since we're using memoryStorage
        contentType: passportPhoto.mimetype,
        cid: passportPhoto.originalname // Content ID for embedding in email
      });
    }

    // Add signature if provided (convert base64 to buffer)
    if (data.signature) {
      const signatureBase64 = data.signature.replace(/^data:image\/\w+;base64,/, '');
      const signatureBuffer = Buffer.from(signatureBase64, 'base64');
      attachments.push({
        filename: 'signature.png',
        content: signatureBuffer,
        contentType: 'image/png',
        cid: 'signature_image'
      });
    }

    const ownerMailOptions = {
      from: config.EMAIL.FROM_SUBSCRIPTION || config.EMAIL.FROM_SERVICE,
      to: config.EMAIL.OWNER,
      subject: `New Farm Subscription: ${fullName}`,
      html: ownerHtml,
      attachments
    };

    // Prepare confirmation email for subscriber
    const applicantHtml = subscriptionApplicantTemplate({
      name: fullName,
      email,
      noOfAcres,
      paymentPlan
    });

    const applicantMailOptions = {
      from: config.EMAIL.FROM_SERVICE,
      to: email,
      subject: 'Subscription Received - Àdàbà Farm and Resort',
      html: applicantHtml
    };

    // Send emails in parallel
    await Promise.all([
      emailService.sendMail(ownerMailOptions),
      emailService.sendMail(applicantMailOptions)
    ]);

    return {
      success: true,
      message: 'Subscription submitted successfully'
    };
  }
}

module.exports = new SubscriptionService();
