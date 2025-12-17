const emailService = require('./email.service');
const { careerOwnerTemplate, careerApplicantTemplate } = require('../templates/career.template');
const config = require('../config');
const path = require('path');

class CareerService {
  async processApplication(data, file) {
    const { fullName, emailAddress, contactNumber, location } = data;

    // Prepare email for owner
    const ownerHtml = careerOwnerTemplate({
        fullName,
        emailAddress,
        contactNumber,
        location
    }, file);

    const ownerMailOptions = {
        from: config.EMAIL.FROM_CAREER,
        to: config.EMAIL.OWNER,
        subject: `New Career Application: ${fullName}`,
        html: ownerHtml,
        attachments: file ? [{
            filename: file.originalname,
            path: file.path,
            contentType: file.mimetype
        }] : []
    };

    // Prepare confirmation email for applicant
    const applicantHtml = careerApplicantTemplate(fullName.split(' ')[0]);

    const applicantMailOptions = {
        from: config.EMAIL.FROM_SERVICE,
        to: emailAddress,
        subject: 'Application Received - Sina Consulting Services',
        html: applicantHtml
    };

    // Send emails in parallel
    await Promise.all([
        emailService.sendMail(ownerMailOptions),
        emailService.sendMail(applicantMailOptions)
    ]);

    return { 
        success: true, 
        message: 'Application submitted successfully' 
    };
  }
}

module.exports = new CareerService();
