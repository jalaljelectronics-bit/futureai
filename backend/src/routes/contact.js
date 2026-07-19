const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const validate = require('../middleware/validate');
const contactSchema = require('../schemas/contactSchema');

router.post('/', validate(contactSchema), contactController.submitContactForm);

module.exports = router;