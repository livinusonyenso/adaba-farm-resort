const { validationResult } = require('express-validator');
const subscriptionService = require('../services/subscription.service');

exports.submitSubscriptionForm = async (req, res, next) => {
  try {
    console.log('📋 Subscription form submission received');
    console.log(`   From: ${req.body.surname} ${req.body.otherNames}`);
    console.log(`   Email: ${req.body.email}`);
    console.log(`   Passport Photo: ${req.file ? 'Yes (' + req.file.originalname + ')' : 'No'}`);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.warn('⚠️ Subscription validation failed:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    console.log('✅ Validation passed, processing subscription form...');
    // req.file contains the uploaded passport photo if any
    const processResult = await subscriptionService.processSubscription(req.body, req.file);
    console.log('✅ Subscription form processed successfully');

    res.status(200).json({
      success: true,
      message: 'Your subscription has been submitted successfully! Check your email for confirmation.'
    });
  } catch (error) {
    console.error('❌ Error in subscription controller:');
    console.error(`   Message: ${error.message}`);
    console.error(`   Stack: ${error.stack}`);
    next(error);
  }
};
