const express = require('express');
const contactRoutes = require('./contact.routes');
const careerRoutes = require('./career.routes');
const subscriptionRoutes = require('./subscription.routes');

const router = express.Router();

router.use('/sina', contactRoutes);
router.use('/sina', careerRoutes);
router.use('/sina', subscriptionRoutes);

module.exports = router;
