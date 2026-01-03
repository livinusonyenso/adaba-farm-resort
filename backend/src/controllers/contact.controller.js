const { validationResult } = require('express-validator');
const contactService = require('../services/contact.service');

exports.submitContactForm = async (req, res, next) => {
  try {
    console.log('📝 Contact form submission received');
    console.log(`   From: ${req.body.firstName} ${req.body.lastName}`);
    console.log(`   Email: ${req.body.businessEmail}`);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.warn('⚠️ Validation failed:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    console.log('✅ Validation passed, processing contact form...');
    const processResult = await contactService.processHelper(req.body);
    console.log('✅ Contact form processed successfully');

    res.status(200).json({
      success: true,
      message: 'Thank you for your inquiry! We will get back to you shortly.'
    });
  } catch (error) {
    console.error('❌ Error in contact controller:');
    console.error(`   Message: ${error.message}`);
    console.error(`   Stack: ${error.stack}`);
    next(error);
  }
};
