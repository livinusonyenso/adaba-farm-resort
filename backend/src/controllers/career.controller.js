const { validationResult } = require('express-validator');
const careerService = require('../services/career.service');

exports.submitCareerApplication = async (req, res, next) => {
  try {
    console.log('💼 Career application received');
    console.log(`   From: ${req.body.fullName}`);
    console.log(`   Email: ${req.body.emailAddress}`);
    console.log(`   CV Uploaded: ${req.file ? 'Yes (' + req.file.originalname + ')' : 'No'}`);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.warn('⚠️ Career validation failed:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    console.log('✅ Validation passed, processing career application...');
    // req.file contains the uploaded file info if any
    const processResult = await careerService.processApplication(req.body, req.file);
    console.log('✅ Career application processed successfully');

    res.status(200).json({
      success: true,
      message: 'Your application has been submitted successfully! Check your email for confirmation.'
    });
  } catch (error) {
    console.error('❌ Error in career controller:');
    console.error(`   Message: ${error.message}`);
    console.error(`   Stack: ${error.stack}`);
    next(error);
  }
};
