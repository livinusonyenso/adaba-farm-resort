const { body } = require('express-validator');

const subscriptionValidator = [
  body('surname')
    .trim()
    .notEmpty().withMessage('Surname is required')
    .isLength({ min: 2, max: 50 }).withMessage('Surname must be between 2 and 50 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),

  body('phoneNumber1')
    .trim()
    .notEmpty().withMessage('At least one phone number is required')
    .matches(/^[\d\s\-+()]{7,20}$/).withMessage('Please enter a valid phone number'),

  body('nin')
    .optional()
    .trim()
    .isLength({ min: 11, max: 11 }).withMessage('NIN must be exactly 11 digits')
    .matches(/^\d{11}$/).withMessage('NIN must contain only numbers'),

  body('noOfAcres')
    .notEmpty().withMessage('Number of acres is required')
    .isInt({ min: 1 }).withMessage('Number of acres must be at least 1'),

  body('paymentPlan')
    .notEmpty().withMessage('Payment plan is required')
    .isIn(['Outright', '3 Months', '6 Months']).withMessage('Invalid payment plan selected'),

  body('sex')
    .optional()
    .isIn(['Male', 'Female']).withMessage('Sex must be either Male or Female'),

  body('maritalStatus')
    .optional()
    .isIn(['Single', 'Married']).withMessage('Marital status must be either Single or Married'),

  body('nationality')
    .optional()
    .trim(),

  body('state')
    .optional()
    .trim(),

  // Next of Kin validations
  body('nokSurname')
    .optional()
    .trim(),

  body('nokFirstName')
    .optional()
    .trim(),

  body('nokPhoneNumber1')
    .optional()
    .trim()
    .matches(/^[\d\s\-+()]{7,20}$/).withMessage('Please enter a valid phone number for next of kin')
];

module.exports = subscriptionValidator;
