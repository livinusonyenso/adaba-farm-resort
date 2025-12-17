const { body } = require('express-validator');

const careerValidator = [
  body('fullName')
    .trim()
    .notEmpty().withMessage('Full name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Full name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s'-]+$/).withMessage('Full name can only contain letters, spaces, hyphens and apostrophes'),

  body('emailAddress')
    .trim()
    .notEmpty().withMessage('Email address is required')
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),

  body('contactNumber')
    .trim()
    .notEmpty().withMessage('Contact number is required')
    .matches(/^[\d\s\-+()]{7,20}$/).withMessage('Please enter a valid phone number'),

  body('location')
    .trim()
    .notEmpty().withMessage('Location is required')
    .isLength({ min: 2, max: 100 }).withMessage('Location must be between 2 and 100 characters')
];

module.exports = careerValidator;
