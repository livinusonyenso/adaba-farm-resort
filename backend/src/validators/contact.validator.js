const { body } = require('express-validator');

const contactValidator = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/).withMessage('First name can only contain letters, spaces, hyphens and apostrophes'),

  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/).withMessage('Last name can only contain letters, spaces, hyphens and apostrophes'),

  body('contactNumber')
    .trim()
    .notEmpty().withMessage('Contact number is required')
    .matches(/^[\d\s\-+()]{7,20}$/).withMessage('Please enter a valid phone number'),

  body('businessEmail')
    .trim()
    .notEmpty().withMessage('Business email is required')
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),

  body('organizationName')
    .trim()
    .notEmpty().withMessage('Organization name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Organization name must be between 2 and 100 characters'),

  body('role')
    .trim()
    .notEmpty().withMessage('Role is required')
    .isLength({ min: 2, max: 100 }).withMessage('Role must be between 2 and 100 characters')
];

module.exports = contactValidator;
