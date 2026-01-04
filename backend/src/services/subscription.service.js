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

    const ownerMailOptions = {
      from: config.EMAIL.FROM_SUBSCRIPTION || config.EMAIL.FROM_SERVICE,
      to: config.EMAIL.OWNER,
      subject: `New Farm Subscription: ${fullName}`,
      html: ownerHtml,
      attachments: passportPhoto ? [{
        filename: passportPhoto.originalname,
        path: passportPhoto.path,
        contentType: passportPhoto.mimetype
      }] : []
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
