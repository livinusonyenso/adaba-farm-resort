const express = require('express');
const contactController = require('../controllers/contact.controller');
const contactValidator = require('../validators/contact.validator');

const router = express.Router();

router.post('/contact', contactValidator, contactController.submitContactForm);

module.exports = router;
