const { validationResult } = require('express-validator');
const contactService = require('../services/contact.service');

exports.submitContactForm = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const processResult = await contactService.processHelper(req.body);

    res.status(200).json({
      success: true,
      message: 'Thank you for your inquiry! We will get back to you shortly.'
    });
  } catch (error) {
    next(error);
  }
};
