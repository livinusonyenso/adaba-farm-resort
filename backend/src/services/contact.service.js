const emailService = require('./email.service');
const contactTemplate = require('../templates/contact.template');
const config = require('../config');

class ContactService {
  async processHelper(data) {
    const htmlContent = contactTemplate(data);

    const mailOptions = {
        from: config.EMAIL.FROM_CONTACT,
        to: config.EMAIL.OWNER,
        subject: `New Contact Inquiry from ${data.firstName} ${data.lastName}`,
        html: htmlContent
    };

    await emailService.sendMail(mailOptions);
    return { success: true, message: 'Contact inquiry sent successfully' };
  }
}

module.exports = new ContactService();
