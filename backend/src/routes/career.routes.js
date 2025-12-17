const express = require('express');
const careerController = require('../controllers/career.controller');
const careerValidator = require('../validators/career.validator');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/career', upload.single('cv'), careerValidator, careerController.submitCareerApplication);

module.exports = router;
