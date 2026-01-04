const express = require('express');
const subscriptionController = require('../controllers/subscription.controller');
const subscriptionValidator = require('../validators/subscription.validator');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/subscription', upload.single('passportPhoto'), subscriptionValidator, subscriptionController.submitSubscriptionForm);

module.exports = router;
