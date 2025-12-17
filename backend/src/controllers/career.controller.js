const { validationResult } = require('express-validator');
const careerService = require('../services/career.service');

exports.submitCareerApplication = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // req.file contains the uploaded file info if any
    const processResult = await careerService.processApplication(req.body, req.file);

    res.status(200).json({
      success: true,
      message: 'Your application has been submitted successfully! Check your email for confirmation.'
    });
  } catch (error) {
    next(error);
  }
};
